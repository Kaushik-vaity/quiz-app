import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchQuizForUser } from "./../../utils/QuizService";
import AnswerOptions from "./../../utils/AnswerOptions";

const Quiz = () => {
	const [quizQuestions, setQuizQuestions] = useState([
		{ id: "", correctAnswers: "", question: "", questionType: "" }
	]);
	const [selectedAnswers, setSelectedAnswers] = useState([{ id: "", answer: "" }]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [totalScores, setTotalScores] = useState(0);
	const location = useLocation();
	const navigate = useNavigate();
	const { selectedSubject, selectedNumQuestions } = location.state;

	const fetchQuizData = useCallback(async () => {
		if (selectedNumQuestions && selectedSubject) {
			try {
				const questions = await fetchQuizForUser(selectedNumQuestions, selectedSubject);
				setQuizQuestions(questions || []);
			} catch (error) {
				console.error("Error fetching quiz questions:", error);
			}
		}
	}, [selectedNumQuestions, selectedSubject]);

	useEffect(() => {
		fetchQuizData();
	}, [fetchQuizData]);

	const handleAnswerChange = (questionId, answer) => {
		setSelectedAnswers((prevAnswers) => {
			const existingAnswerIndex = prevAnswers.findIndex((answerObj) => answerObj.id === questionId);
			const selectedAnswer = Array.isArray(answer) ? answer.map((a) => a.charAt(0)) : answer.charAt(0);

			if (existingAnswerIndex !== -1) {
				const updatedAnswers = [...prevAnswers];
				updatedAnswers[existingAnswerIndex] = { id: questionId, answer: selectedAnswer };
				return updatedAnswers;
			} else {
				const newAnswer = { id: questionId, answer: selectedAnswer };
				return [...prevAnswers, newAnswer];
			}
		});
	};

	const isChecked = (questionId, choice) => {
		const selectedAnswer = selectedAnswers.find((answer) => answer.id === questionId);
		if (!selectedAnswer) {
			return false;
		}
		if (Array.isArray(selectedAnswer.answer)) {
			return selectedAnswer.answer.includes(choice.charAt(0));
		}
		return selectedAnswer.answer === choice.charAt(0);
	};

	const handleSubmit = () => {
		let scores = 0;
		quizQuestions.forEach((question) => {
			const selectedAnswer = selectedAnswers.find((answer) => answer.id === question.id);
			if (selectedAnswer) {
				const selectedOptions = Array.isArray(selectedAnswer.answer)
					? selectedAnswer.answer.map((option) => option.charAt(0))
					: [selectedAnswer.answer.charAt(0)];
				const correctOptions = Array.isArray(question.correctAnswers)
					? question.correctAnswers.map((option) => option.charAt(0))
					: [question.correctAnswers.charAt(0)];
				const isCorrect =
					selectedOptions.length === correctOptions.length &&
					selectedOptions.every((option) => correctOptions.includes(option));
				if (isCorrect) {
					scores++;
				}
			}
		});
		setTotalScores(scores);
		setSelectedAnswers([]);
		setCurrentQuestionIndex(0);
		navigate("/quiz-result", { state: { quizQuestions, totalScores: scores } });
	};

	const handleNextQuestion = () => {
		if (currentQuestionIndex < quizQuestions.length - 1) {
			setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
		} else {
			handleSubmit();
		}
	};

	const handlePreviousQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
		}
	};

	return (
		<div className="p-5">
			<h3 className="mb-4" style={{ color: "#091057" }}>
				Question {quizQuestions.length > 0 ? currentQuestionIndex + 1 : 0} of {quizQuestions.length}
			</h3>
			<h4 style={{ color: "#024CAA" }}>Your Score: {totalScores}</h4>

			<h4 className="mb-4">
				<pre style={{ color: "#091057" }}>{quizQuestions[currentQuestionIndex]?.question}</pre>
			</h4>

			<AnswerOptions
				question={quizQuestions[currentQuestionIndex]}
				isChecked={isChecked}
				handleAnswerChange={handleAnswerChange}
			/>

			<div className="mt-4">
				<button
					className="btn btn-sm btn-outline-primary me-2"
					onClick={handlePreviousQuestion}
					disabled={currentQuestionIndex === 0}
				>
					Previous Question
				</button>
				<button
					className={`btn btn-sm btn-outline-info ${
						currentQuestionIndex === quizQuestions.length - 1 && "btn btn-sm btn-outline-warning"
					}`}
					onClick={handleNextQuestion}
					disabled={
						!selectedAnswers.find(
							(answer) =>
								answer.id === quizQuestions[currentQuestionIndex]?.id || answer.answer.length > 0
						)
					}
				>
					{currentQuestionIndex === quizQuestions.length - 1 ? "Submit Quiz" : "Next Question"}
				</button>
			</div>
		</div>
	);
};

export default Quiz;

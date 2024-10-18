import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getQuestionById, updateQuestion } from "./../../utils/QuizService";

const UpdateQuestion = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState("");
    const [choices, setChoices] = useState([""]);
    const [correctAnswers, setCorrectAnswers] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const fetchQuestion = useCallback(async () => {
        try {
            const questionToUpdate = await getQuestionById(id);
            if (questionToUpdate) {
                setQuestion(questionToUpdate.question);
                setChoices(questionToUpdate.choices);
                setCorrectAnswers(questionToUpdate.correctAnswers);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchQuestion();
    }, [fetchQuestion]);

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleChoiceChange = (index, e) => {
        const updatedChoices = [...choices];
        updatedChoices[index] = e.target.value;
        setChoices(updatedChoices);
    };

    const handleCorrectAnswerChange = (e) => {
        setCorrectAnswers(e.target.value);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedQuestion = {
                question,
                choices,
                correctAnswers: correctAnswers
                    .toString()
                    .split(",")
                    .map((answer) => answer.trim()),
            };
            await updateQuestion(id, updatedQuestion);
            navigate("/all-quizzes");
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container">
            <h4 className="mt-5" style={{ color: "#091057" }}>
                Update Quiz Question
            </h4>
            <div className="col-8">
                <form onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label className="text-info">Question:</label>
                        <textarea
                            className="form-control"
                            rows={4}
                            value={question}
                            onChange={handleQuestionChange}
                            style={{ borderColor: "#024CAA", backgroundColor: "#DBD3D3" }}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label className="text-info">Choices:</label>
                        {choices.map((choice, index) => (
                            <input
                                key={index}
                                type="text"
                                className="form-control mb-4"
                                value={choice}
                                onChange={(e) => handleChoiceChange(index, e)}
                                style={{ borderColor: "#024CAA", backgroundColor: "#DBD3D3" }}
                            />
                        ))}
                    </div>

                    <div className="form-group">
                        <label className="text-info">Correct Answer(s):</label>
                        <input
                            type="text"
                            className="form-control mb-4"
                            value={correctAnswers}
                            onChange={handleCorrectAnswerChange}
                            style={{ borderColor: "#024CAA", backgroundColor: "#DBD3D3" }}
                        />
                    </div>

                    <div className="btn-group">
                        <button type="submit" className="btn btn-outline-warning">
                            Update Question
                        </button>
                        <Link to={"/all-quizzes"} className="btn btn-outline-primary ml-2">
                            Back to all questions
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateQuestion;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createQuestion, getSubjects } from "./../../utils/QuizService";

const AddQuestion = () => {
  const [question, setQuestion] = useState("");
  const [questionType, setQuestionType] = useState("single");
  const [choices, setChoices] = useState([""]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [subject, setSubject] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [subjectOptions, setSubjectOptions] = useState([""]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const subjectsData = await getSubjects();
      setSubjectOptions(subjectsData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddChoice = () => {
    const newChoice = `Choice ${choices.length + 1}`;
    setChoices([...choices, newChoice]);
  };

  const handleRemoveChoice = (index) => {
    setChoices(choices.filter((_, i) => i !== index));
  };

  const handleChoiceChange = (index, value) => {
    setChoices(choices.map((choice, i) => (i === index ? value : choice)));
  };

  const handleCorrectAnswerChange = (index, value) => {
    setCorrectAnswers(correctAnswers.map((answer, i) => (i === index ? value : answer)));
  };

  const handleAddCorrectAnswer = () => {
    setCorrectAnswers([...correctAnswers, ""]);
  };

  const handleRemoveCorrectAnswer = (index) => {
    setCorrectAnswers(correctAnswers.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = {
        question,
        questionType,
        choices,
        correctAnswers,
        subject,
      };
      await createQuestion(result);

      // Reset form
      setQuestion("");
      setQuestionType("single");
      setChoices([""]);
      setCorrectAnswers([]);
      setSubject("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddSubject = () => {
    if (newSubject.trim() !== "") {
      setSubject(newSubject.trim());
      setSubjectOptions([...subjectOptions, newSubject.trim()]);
      setNewSubject("");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <div className="card shadow" style={{ borderColor: "#024CAA" }}>
            <div className="card-header" style={{ backgroundColor: "#024CAA", color: "#DBD3D3" }}>
              <h5 className="card-title">Add New Questions</h5>
            </div>
            <div className="card-body" style={{ backgroundColor: "#DBD3D3" }}>
              <form onSubmit={handleSubmit} className="p-2">
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label text-info">
                    Select a Subject
                  </label>
                  <select
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="form-control"
                  >
                    <option value="">Select subject</option>
                    <option value="New">Add New</option>
                    {subjectOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {subject === "New" && (
                  <div className="mb-3">
                    <label htmlFor="new-subject" className="form-label text-info">
                      Add New Subject
                    </label>
                    <input
                      type="text"
                      id="new-subject"
                      value={newSubject}
                      onChange={(event) => setNewSubject(event.target.value)}
                      className="form-control"
                    />
                    <button
                      type="button"
                      onClick={handleAddSubject}
                      className="btn btn-outline-primary mt-2"
                    >
                      Add Subject
                    </button>
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="question-text" className="form-label text-info">
                    Question
                  </label>
                  <textarea
                    className="form-control"
                    rows={4}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="question-type" className="form-label text-info">
                    Question type
                  </label>
                  <select
                    id="question-type"
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value)}
                    className="form-control"
                  >
                    <option value="single">Single Answer</option>
                    <option value="multiple">Multiple Answer</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="choices" className="form-label text-primary">
                    Choices
                  </label>
                  {choices.map((choice, index) => (
                    <div key={index} className="input-group mb-3">
                      <input
                        type="text"
                        value={choice}
                        onChange={(e) => handleChoiceChange(index, e.target.value)}
                        className="form-control"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveChoice(index)}
                        className="btn btn-outline-danger"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={handleAddChoice} className="btn btn-outline-primary">
                    Add Choice
                  </button>
                </div>

                <div className="mb-3">
                  <label htmlFor="correct-answer" className="form-label text-success">
                    Correct Answer
                  </label>
                  {questionType === "single" ? (
                    <input
                      type="text"
                      value={correctAnswers[0]}
                      onChange={(e) => handleCorrectAnswerChange(0, e.target.value)}
                      className="form-control"
                    />
                  ) : (
                    <>
                      {correctAnswers.map((answer, index) => (
                        <div key={index} className="d-flex mb-2">
                          <input
                            type="text"
                            value={answer}
                            onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                            className="form-control me-2"
                          />
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleRemoveCorrectAnswer(index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button type="button" onClick={handleAddCorrectAnswer} className="btn btn-outline-info">
                        Add Correct Answer
                      </button>
                    </>
                  )}
                </div>

                <div className="btn-group">
                  <button type="submit" className="btn btn-outline-success mr-2">
                    Save Question
                  </button>
                  <Link to={"/all-quizzes"} className="btn btn-outline-primary ml-2">
                    Back to existing questions
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;

import React from "react";

const AnswerOptions = ({ question, isChecked, handleAnswerChange, handleCheckboxChange }) => {
	if (!question) {
		return (
			<div style={{ color: "#091057" }}>
				No questions available, <br /> you may try again by reducing your requested number of
				questions on this topic.
			</div>
		);
	}

	const { id, questionType, choices } = question;

	if (questionType === "single") {
		return (
			<div>
				{choices.sort().map((choice) => (
					<div key={choice} className="form-check mb-3">
						<input
							className="form-check-input"
							type="radio"
							id={choice}
							name={question.id}
							value={choice}
							checked={isChecked(question.id, choice)}
							onChange={() => handleAnswerChange(id, choice)}
						/>
						<label htmlFor={choice} className="form-check-label ms-2" style={{ color: "#024CAA" }}>
							{choice}
						</label>
					</div>
				))}
			</div>
		);
	} else if (questionType === "multiple") {
		return (
			<div>
				{choices.sort().map((choice) => (
					<div key={choice} className="form-check mb-3">
						<input
							className="form-check-input"
							type="checkbox"
							id={choice}
							name={question.id}
							value={choice}
							checked={isChecked(question.id, choice)}
							onChange={() => handleCheckboxChange(id, choice)}
						/>
						<label htmlFor={choice} className="form-check-label ms-2" style={{ color: "#024CAA" }}>
							{choice}
						</label>
					</div>
				))}
			</div>
		);
	} else {
		return null;
	}
};

export default AnswerOptions;

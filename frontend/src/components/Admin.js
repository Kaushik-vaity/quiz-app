import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
	return (
		<section className="container">
			<h2 className="mt-5" style={{ color: "#091057" }}>Welcome to admin home page</h2>
			<hr />
			<nav className="nav flex-column">
				<Link to={"/create-quiz"} className="nav-link" style={{ color: "#024CAA" }}>
					Create a New Quiz
				</Link>
				<Link to={"/all-quizzes"} className="nav-link" style={{ color: "#024CAA" }}>
					Manage existing Quizzes
				</Link>
			</nav>
		</section>
	);
};

export default Admin;

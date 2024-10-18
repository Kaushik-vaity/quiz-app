import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#091057", color: "#DBD3D3" }}>
      <div className="container-fluid px-5">
        <NavLink className="navbar-brand" to={"/"} style={{ color: "#DBD3D3" }}>
          Online Quiz App
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to={"/admin"} style={{ color: "#DBD3D3" }}>
                Admin
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to={"/quiz-stepper"} style={{ color: "#DBD3D3" }}>
                Take Quiz
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

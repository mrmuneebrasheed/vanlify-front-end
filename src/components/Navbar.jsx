import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo2.png";
import "./Navbar.css";

export default function Navbar() {
    return (
        <div className="nav">
            <span>
                <img className="logo" src={logo} alt="logo" />
            </span>
            <div className="skew">
                <h1 className="title">Vanlify</h1>
            </div>
            <Link to="/users/signup">
                <span className="nav-link">Signup</span>
            </Link>
        </div>
    );
}

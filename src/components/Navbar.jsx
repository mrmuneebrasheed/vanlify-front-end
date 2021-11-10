import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo2.png";
import "./Navbar.css";

export default function Navbar(props) {
    return (
        <div className="nav">
            <span>
                <img className="logo" src={logo} alt="logo" />
            </span>
            {props.loggedIn === true && (
                <div>
                    <Link className="nav-link" to="/locations/add">
                        <span>Add a Location</span>
                    </Link>

                    <Link className="nav-link" to="/locations/explore">
                        Explore
                    </Link>
                </div>
            )}
            <div className="skew">
                <h1 className="title">Vanlify</h1>
            </div>
            <div>
                {props.signup === false && !props.loggedIn && (
                    <Link className="nav-link" to="/users/signup">
                        <span>Sign Up</span>
                    </Link>
                )}
                {props.signup === true && !props.loggedIn && (
                    <Link className="nav-link" to="/">
                        <span>Home</span>
                    </Link>
                )}
                {props.loggedIn === true && (
                    <Link className="nav-link" to="/users/profile">
                        <span>Profile</span>
                    </Link>
                )}
                {props.loggedIn === true && (
                    <Link className="nav-link" to="/">
                        <span>Log Out</span>
                    </Link>
                )}
            </div>
        </div>
    );
}

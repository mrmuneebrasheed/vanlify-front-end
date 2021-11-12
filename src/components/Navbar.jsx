import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo2.png";
import "./Navbar.css";

export default function Navbar(props) {
    const [dropdownShow, setDropdownShow] = useState("none");
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
            <ul className="drop-down" style={{ display: dropdownShow }}>
                <li>
                    {props.loggedIn === true && (
                        <div>
                            <Link
                                className="drop-down-link"
                                to="/locations/add"
                            >
                                <span>Add a Location</span>
                            </Link>

                            <Link
                                className="drop-down-link"
                                to="/locations/explore"
                            >
                                Explore
                            </Link>
                        </div>
                    )}
                </li>
                <li>
                    {props.signup === false && !props.loggedIn && (
                        <Link className="drop-down-link" to="/users/signup">
                            <span>Sign Up</span>
                        </Link>
                    )}
                    {props.signup === true && !props.loggedIn && (
                        <Link className="drop-down-link" to="/">
                            <span>Home</span>
                        </Link>
                    )}
                    {props.loggedIn === true && (
                        <Link className="drop-down-link" to="/users/profile">
                            <span>Profile</span>
                        </Link>
                    )}
                    {props.loggedIn === true && (
                        <Link className="drop-down-link" to="/">
                            <span>Log Out</span>
                        </Link>
                    )}
                </li>
            </ul>
            <svg
                onClick={() =>
                    setDropdownShow((prev) =>
                        prev === "none" ? "block" : "none"
                    )
                }
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="nav-icon"
                viewBox="0 0 16 16"
            >
                <path
                    fill-rule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
            </svg>
        </div>
    );
}

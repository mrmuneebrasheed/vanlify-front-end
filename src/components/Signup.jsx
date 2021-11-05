import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const usernameChange = (e) => {
        setUsername(e.target.value);
    };
    const emailChange = (e) => {
        setEmail(e.target.value);
    };
    const passwordChange = (e) => {
        setPassword(e.target.value);
    };
    const passwordConfirmChange = (e) => {
        setPasswordConfirm(e.target.value);
    };

    const handleSignup = (e) => {
        axios
            .post("/users/signup", {
                username,
                email,
                password,
                passwordConfirm,
            })
            .then((res) => {
                console.log(res);
                navigate("/users/profile");
            })
            .catch((e) => console.log(e));
    };
    return (
        <>
            <Navbar signup={true} />
            <div className="signup-card">
                <h1 className="signup-heading">Signup</h1>
                <form onSubmit={handleSignup} className="signup-form">
                    <input
                        autoComplete="off"
                        onChange={usernameChange}
                        type="text"
                        required
                        name="username"
                        placeholder="Username"
                        value={username}
                    />
                    <input
                        autoComplete="off"
                        onChange={emailChange}
                        type="email"
                        required
                        name="email"
                        placeholder="Email"
                        value={email}
                    />
                    <input
                        autoComplete="off"
                        onChange={passwordChange}
                        type="password"
                        required
                        name="password"
                        placeholder="password"
                        value={password}
                    />
                    <input
                        autoComplete="off"
                        onChange={passwordConfirmChange}
                        type="password"
                        required
                        name="password-confirm"
                        placeholder="Confirm Password"
                        value={passwordConfirm}
                    />

                    <Link to="/users/profile">
                        <button className="submit-button" type="submit">
                            Submit
                        </button>
                    </Link>
                </form>
            </div>
        </>
    );
}

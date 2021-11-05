import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import "./Signup.css";

export default function Signup() {
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
        axios.post("/users/signup", {
            username,
            email,
            password,
            passwordConfirm,
        });
    };
    return (
        <>
            <Navbar signup={true} />
            <div className="signup-card">
                <h1 className="signup-heading">Signup</h1>
                <form onSubmit={handleSignup} className="signup-form">
                    <input
                        onChange={usernameChange}
                        type="text"
                        required
                        name="username"
                        placeholder="Username"
                        value={username}
                    />
                    <input
                        onChange={emailChange}
                        type="email"
                        required
                        name="email"
                        placeholder="Email"
                        value={email}
                    />
                    <input
                        onChange={passwordChange}
                        type="password"
                        required
                        name="password"
                        placeholder="password"
                        value={password}
                    />
                    <input
                        onChange={passwordConfirmChange}
                        type="password"
                        required
                        name="password-confirm"
                        placeholder="Confirm Password"
                        value={passwordConfirm}
                    />

                    <button className="submit-button" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}

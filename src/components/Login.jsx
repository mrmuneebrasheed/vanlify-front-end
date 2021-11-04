import React, { useState } from "react";
import "./Login.css";

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const onChangeUsername = (e) => {
        setEmail(e.target.valute);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.valute);
    };
    const onSubmit = async () => {};
    return (
        <div className="login">
            <h1 className="login-heading">Login</h1>
            <input
                autoComplete="off"
                name="username"
                placeholder="Username"
                onChange={onChangeUsername}
                value={email}
            />
            <input
                autoComplete="off"
                name="password"
                placeholder="Password"
                type="password"
                onChange={onChangePassword}
                value={password}
            />
            <button className="submit-button" onclick={onSubmit}>
                Login
            </button>
        </div>
    );
}

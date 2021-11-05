import React, { useState } from "react";
import axios from "axios";
// import Modal from "react-modal";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    // const [modalMessage, setModalMessage] = useState("");
    // const [showModal, setShowModal] = useState(false);
    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/users/login", {
                username: username,
                password: password,
            })
            .then((res) => {
                console.log(res);
                navigate("/users/profile");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="login">
            <h1 className="login-heading">Login</h1>

            <form onSubmit={onSubmit}>
                <input
                    required
                    autoComplete="off"
                    name="username"
                    placeholder="Username"
                    onChange={onChangeUsername}
                />
                <input
                    required
                    autoComplete="off"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={onChangePassword}
                />
                <button type="submit" className="submit-button">
                    Login
                </button>
            </form>
            <span className="login-signup">
                If you're new then, <Link to="/users/signup">Sign Up </Link>
            </span>
        </div>
    );
}

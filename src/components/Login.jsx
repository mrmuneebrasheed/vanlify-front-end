import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ userID, setUserID }) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const [modalMessage, setModalMessage] = useState(
        "Login credentials not valid"
    );
    const [showModal, setShowModal] = useState(false);
    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        axios
            .post("/users/login", {
                username: username,
                password: password,
            })
            .then((res) => {
                console.log(res);
                setUserID(res.data.userId);
                navigate("/users/profile");
            })
            .catch((err) => {
                console.log(err.response);
                setModalMessage(err.response.data.error);
                setShowModal(true);
            });
    };
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };
    return (
        <div className="login">
            <h1 className="login-heading">Login</h1>
            <Modal
                style={customStyles}
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <h1>{modalMessage}</h1>
                <button onClick={() => setShowModal(false)}>Close</button>
            </Modal>
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

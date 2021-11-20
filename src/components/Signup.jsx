import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

export default function Signup({ userID, setUserID }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("Something went wrong!");

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
        e.preventDefault();
        axios
            .post("/users/signup", {
                username,
                email,
                password,
                passwordConfirm,
            })
            .then((res) => {
                console.log(res);
                localStorage.setItem("userId", res.data.user._id);
                setUserID(res.data.user._id);
                navigate("/home/users/profile");
            })
            .catch((e) => {
                console.log("error", e.response);
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
            // backgroundColor: "transparent",
            borderRadius: "20px",
            overFlowY: "auto",
        },
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

                    <button className="submit-button" type="submit">
                        Submit
                    </button>
                </form>
            </div>
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                style={customStyles}
            >
                <h1>{modalMessage}</h1>
                <button
                    onClick={() => setShowModal(false)}
                    className="submit-button"
                >
                    Close
                </button>
            </Modal>
        </>
    );
}

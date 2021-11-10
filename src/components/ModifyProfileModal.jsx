import React from "react";
import Modal from "react-modal";

export default function ModifyProfileModal({
    customStyles,
    showProfileModal,
    setShowProfileModal,
    username,
    usernameChange,
    email,
    emailChange,
    city,
    cityChange,
    password,
    passwordChange,
    bio,
    bioChange,
    modifyProfile,
}) {
    return (
        <Modal
            style={customStyles}
            isOpen={showProfileModal}
            onRequestClose={() => setShowProfileModal(false)}
        >
            <form onSubmit={modifyProfile} className="signup-form">
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
                    onChange={cityChange}
                    type="text"
                    name="city"
                    id="city"
                    placeholder="City"
                    value={city}
                />
                <textarea
                    onChange={bioChange}
                    name="bio"
                    id=""
                    cols="3"
                    rows="10"
                    placeholder="Bio"
                    value={bio}
                ></textarea>
                <button className="submit-button" type="submit">
                    Submit
                </button>
            </form>
            <button
                onClick={() => setShowProfileModal(false)}
                className="close-button"
            >
                Close
            </button>
        </Modal>
    );
}

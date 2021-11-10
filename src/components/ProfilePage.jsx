import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./UI/LocationCard";
import logo from "../assets/img/userImage.jpg";
import "./ProfilePage.css";
import LocationCard from "./UI/LocationCard";
import axios from "axios";
import Modal from "react-modal";
import ModifyProfileModal from "./ModifyProfileModal";

export default function ProfilePage({ userID, setUserID }) {
    const [userId, setUserId] = useState(
        userID ? userID : localStorage.getItem("userId")
    );
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState("");
    const [image, setImage] = useState("");
    const [myLocations, setMyLocations] = useState([]);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const cityChange = (e) => {
        setCity(e.target.value);
    };
    const bioChange = (e) => {
        setBio(e.target.value);
    };

    const usernameChange = (e) => {
        setUsername(e.target.value);
    };
    const emailChange = (e) => {
        setEmail(e.target.value);
    };
    const passwordChange = (e) => {
        setPassword(e.target.value);
    };
    const imageChange = (e) => {
        setImage(...e.target.files);
    };
    useEffect(() => {
        getUser(userId);
        getUserLocation(userId);
    }, []);
    if (
        localStorage.getItem("userId") === "" ||
        (userID && localStorage.getItem("userId") !== userID)
    ) {
        localStorage.setItem("userId", userID);
        setUserId(localStorage.getItem("userId"));
    }
    const getUser = (id) => {
        axios
            .get(
                `http://localhost:8000/users/${
                    userID ? userID : localStorage.getItem("userId")
                }`
            )
            .then((res) => {
                const { user } = res.data;
                console.log(user);
                setUsername(user.username ? user.username : "Username");
                setEmail(user.email ? user.email : "Email");
                setPassword(user.password ? user.password : "Password");
                setCity(user.city ? user.city : "City");
                setBio(
                    user.bio
                        ? user.bio
                        : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud"
                );
                setAvatar(user.avatar && user.avatar);
            })
            .catch((err) => console.log(err.response));
    };
    const getUserLocation = (id) => {
        axios.get(`http://localhost:8000/locations/all/${id}`).then((res) => {
            setMyLocations(res.data.locations);
        });
    };
    const modifyProfile = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("bio", bio);
        formData.append("city", city);
        axios
            .put(`http://localhost:8000/users/${userId}`, formData)
            .then((res) => {
                console.log(res);
            })
            .catch((e) => console.log("error:", e));
        setShowProfileModal(false);
    };
    const modifyAvatar = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        axios
            .put(`http://localhost:8000/users/avatar/${userId}`, formData)
            .then((res) => console.log(res));
        setShowAvatarModal(false);
    };
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgb(2, 56, 69)",
            borderRadius: "20px",
        },
    };
    return (
        <>
            <Navbar signup={false} loggedIn={true} />
            <div className="profile-section">
                <div className="profile-card">
                    <ModifyProfileModal
                        customStyles={customStyles}
                        showProfileModal={showProfileModal}
                        setShowProfileModal={setShowProfileModal}
                        username={username}
                        usernameChange={usernameChange}
                        email={email}
                        emailChange={emailChange}
                        password={password}
                        passwordChange={passwordChange}
                        bio={bio}
                        bioChange={bioChange}
                        city={city}
                        cityChange={cityChange}
                        modifyProfile={modifyProfile}
                    />
                    <Modal
                        style={customStyles}
                        isOpen={showAvatarModal}
                        onRequestClose={() => setShowAvatarModal(false)}
                    >
                        <form className="signup-form" onSubmit={modifyAvatar}>
                            <label htmlFor="avatar">Avatar</label>
                            <input
                                onChange={imageChange}
                                type="file"
                                name="avatar"
                                id="avatar"
                            />
                            <button type="submit">Submit</button>
                        </form>
                    </Modal>
                    <h1 className="profile-heading">Profile</h1>
                    <div className="avatar">
                        <div>
                            <img
                                src={`http://localhost:8000/${avatar}`}
                                alt="avatar"
                            />
                            <span className="username">{username}</span>
                        </div>

                        <button
                            className="modify-profile"
                            onClick={() => setShowAvatarModal(true)}
                        >
                            Modify Avatar
                        </button>
                        <button
                            onClick={() => setShowProfileModal(true)}
                            className="modify-profile"
                        >
                            Modify Profile
                        </button>
                    </div>
                    <p className="bio">{email}</p>
                    <p className="city">{city ? city : "City"}</p>
                    <p className="bio">{bio}</p>
                </div>
                <div className="my-locations">
                    <h1 className="location-heading">My locations</h1>
                    {myLocations?.map((location) => (
                        <LocationCard
                            key={location._id}
                            id={location._id}
                            title={location.title}
                            description={location.description}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

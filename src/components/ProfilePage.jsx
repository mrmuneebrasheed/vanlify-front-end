import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./UI/LocationCard";
import "./ProfilePage.css";
import LocationCard from "./UI/LocationCard";
import axios from "axios";
import Modal from "react-modal";
import ModifyProfileModal from "./ModifyProfileModal";
import LocationModal from "./LocationModal";

export default function ProfilePage({ userID, setUserID }) {
    const [userId, setUserId] = useState(
        userID ? userID : localStorage.getItem("userId")
    );
    const [user, setUser] = useState({});
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
    const [comment, setComment] = useState("");
    const [refresh, setRefresh] = useState(false);
    // Modal States
    const [currentLocationId, setCurrentLocationId] = useState("");
    const [currentLocation, setCurrentLocation] = useState({});
    const [slideImages, setSlideImages] = useState([]);
    const [showModal, setShowModal] = useState(false);

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
        getUser();
        getUserLocation();
    }, [refresh]);
    if (
        localStorage.getItem("userId") === "" ||
        (userID && localStorage.getItem("userId") !== userID)
    ) {
        localStorage.setItem("userId", userID);
        setUserId(localStorage.getItem("userId"));
    }
    const getUser = () => {
        axios
            .get(
                `http://localhost:8000/users/${
                    userID ? userID : localStorage.getItem("userId")
                }`
            )
            .then((res) => {
                const { user } = res.data;
                console.log(user);
                setUser(user);
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
        axios
            .get(
                `http://localhost:8000/locations/all/${
                    userID ? userID : localStorage.getItem("userId")
                }`
            )
            .then((res) => {
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
            .then(() => setRefresh((prev) => !prev))
            .catch((e) => console.log("error:", e));
        setShowProfileModal(false);
    };
    const modifyAvatar = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        axios
            .put(`http://localhost:8000/users/avatar/${userId}`, formData)
            .then((res) => console.log(res))
            .then(() => setRefresh((prev) => !prev))
            .catch((err) => console.log(err));
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
            margin: "10px auto",
            width: "60%",
            alignItems: "center",
        },
    };
    useEffect(() => {
        axios
            .get(`http://localhost:8000/locations/${currentLocationId}`)
            .then((res) => {
                setCurrentLocation(res.data.location);
                setSlideImages(res.data.location.images);
            })
            .catch((err) => console.log(err));
    }, [currentLocationId, refresh]);
    const setData = (locationId) => {
        setCurrentLocationId(locationId);
        setShowModal(true);
    };
    const commentChangeHandler = (e) => {
        setComment(e.target.value);
    };
    const addComment = () => {
        console.log(comment, user);
        const commentData = { username: user.username, description: comment };
        axios
            .post(
                `http://localhost:8000/locations/${currentLocationId}`,
                commentData
            )
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        setRefresh((prev) => !prev);
        setComment("");
    };
    return (
        <>
            <Navbar loggedIn={true} />
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
                        <form className="avatar-form" onSubmit={modifyAvatar}>
                            <h1 className="avatar-label">Choose an avatar</h1>
                            <label className="avatar-input" htmlFor="avatar">
                                Upload Image
                            </label>
                            <input
                                hidden
                                onChange={imageChange}
                                type="file"
                                name="avatar"
                                id="avatar"
                            />
                            <button className="submit-button" type="submit">
                                Submit
                            </button>
                        </form>
                        <button
                            onClick={() => setShowAvatarModal(false)}
                            className="close-button"
                        >
                            Close
                        </button>
                    </Modal>
                    <h1 className="profile-heading">Profile</h1>
                    <div className="avatar">
                        <div>
                            <img
                                src={`http://localhost:8000${avatar}`}
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
                    <h1 className="location-card-heading">My locations</h1>
                    <span className="locations-number">
                        You have added {myLocations.length} Location/s
                    </span>
                    {myLocations?.map((location) => (
                        <LocationCard
                            setData={() => setData(location._id)}
                            img={location.images[0]}
                            key={location._id}
                            id={location._id}
                            title={location.title}
                            description={location.description}
                        />
                    ))}
                </div>
            </div>
            <LocationModal
                showModal={showModal}
                setShowModal={() => setShowModal(false)}
                currentLocation={currentLocation}
                slideImages={slideImages}
                comment={comment}
                addComment={addComment}
                commentChangeHandler={commentChangeHandler}
            />
        </>
    );
}

import React, { useState } from "react";
import Navbar from "./Navbar";
import "./UI/LocationCard";
import logo from "../assets/img/userImage.jpg";
import "./ProfilePage.css";
import LocationCard from "./UI/LocationCard";

export default function ProfilePage() {
    const [username, setUsername] = useState("");
    const [myLocations, setMyLocations] = useState([
        {
            _id: Math.random(),
            title: "Lahore",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo",
        },
    ]);
    const [city, setCity] = useState("");
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState("");
    const cityChange = (e) => {
        setCity(e.target.value);
    };
    const bioChange = (e) => {
        setBio(e.target.value);
    };
    const avatarChange = (e) => {
        setAvatar(e.target.value);
    };
    return (
        <>
            <Navbar signup={false} loggedIn={true} />
            <div className="profile-section">
                <div className="profile-card">
                    <h1 className="profile-heading">Profile</h1>
                    <div className="avatar">
                        <div>
                            <img
                                src={avatar ? require(avatar) : logo}
                                alt="avatar"
                            />
                            <button>Modify Avatar</button>
                        </div>
                        <span>{username ? username : "username"}</span>
                        <button className="modify-profile">
                            Modify Profile
                        </button>
                    </div>
                    <p className="city">{city ? city : "City"}</p>
                    <p className="bio">
                        {bio
                            ? bio
                            : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud"}
                    </p>
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

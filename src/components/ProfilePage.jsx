import React, { useState } from "react";

export default function ProfilePage() {
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
        <div>
            <div>
                <input
                    onChange={cityChange}
                    type="text"
                    name="city"
                    placeholder="City"
                    value={city}
                />
                <textarea
                    onChange={bioChange}
                    type="text"
                    name="bio"
                    placeholder="Bio"
                    rows="3"
                    value={bio}
                />
                <div>
                    <label htmlFor="avatar">Avatar</label>
                    <input
                        onChange={avatarChange}
                        type="file"
                        name="avatar"
                        id="avatar"
                        value={avatar}
                    />
                </div>
            </div>
            <div></div>
        </div>
    );
}

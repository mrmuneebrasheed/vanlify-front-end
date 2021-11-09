import React from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import Login from "./Login";
import FranceMap from "./FranceMap";

export default function Homepage({ userID, setUserID }) {
    return (
        <div className="homepage">
            <Navbar signup={false} loggedIn={false} />

            <Header userID={userID} setUserID={setUserID}>
                <Login userID={userID} setUserID={setUserID} />
                <FranceMap />
            </Header>
        </div>
    );
}

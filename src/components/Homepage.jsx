import React from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import Login from "./Login";
import FranceMap from "./FranceMap";

export default function Homepage({ userID, setUserID }) {
    return (
        <div className="homepage">
            <Navbar signup={false} loggedIn={false} />
            <div className="heading-div">
                <h1 className="heading">
                    Trouvez les meilleurs spots du France
                </h1>
            </div>
            <Header>
                <Login userID={userID} setUserID={setUserID} />
                <FranceMap />
            </Header>
        </div>
    );
}

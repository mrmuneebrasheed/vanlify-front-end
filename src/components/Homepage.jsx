import React from "react";
import Navbar from "./Navbar";
import Header from "./Header";

export default function Homepage() {
    return (
        <div className="homepage">
            <Navbar signup={false} loggedIn={false} />
            <Header />
        </div>
    );
}

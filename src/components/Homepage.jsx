import React from "react";
import Navbar from "./Navbar";
import Header from "./Header";

export default function Homepage() {
    return (
        <div className="homepage">
            <Navbar />
            <Header />
            <p style={{ color: "white", position: "absolute", bottom: 0 }}>
                Hello
            </p>
        </div>
    );
}

import React from "react";
import FranceMap from "./FranceMap";
import "./Header.css";
import Login from "./Login";

export default function Header() {
    return (
        <div className="header">
            <Login />
            <FranceMap />
        </div>
    );
}

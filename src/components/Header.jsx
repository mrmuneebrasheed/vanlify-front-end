import React from "react";
import "./Header.css";

export default function Header({ userID, setUserID, children }) {
    return <div className="header">{children}</div>;
}

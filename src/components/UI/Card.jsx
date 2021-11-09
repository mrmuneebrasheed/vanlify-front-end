import React from "react";
import "./Card.css";

export default function Card({ children, type }) {
    return <div className="card">{children}</div>;
}

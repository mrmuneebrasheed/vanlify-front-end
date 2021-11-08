import React from "react";
import "./LocationCard.css";

export default function LocationCard({ title, description, id }) {
    return (
        <div className="card">
            <h2>{title}</h2>
            <p>{description}</p>
            <button className="details-button">Details</button>
        </div>
    );
}

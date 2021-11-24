import React from "react";
import "./LocationCard.css";

export default function LocationCard({ title, description, setData, img }) {
    return (
        <div className="location-card">
            <h2>{title}</h2>
            <img className="my-location-image" src={img} alt="nothing" />
            <p>{description}</p>
            <button onClick={setData} className="details-button">
                Details
            </button>
        </div>
    );
}

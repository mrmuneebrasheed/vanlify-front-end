import React from "react";

export default function LocationCard({ location }) {
    return (
        <div className="location-card">
            <h1>{location.title}</h1>
            <img src={location.img} alt={location.title} />
            <p>{location.description}</p>
            <span>Lat: {location.coordinates.lat}</span>
        </div>
    );
}

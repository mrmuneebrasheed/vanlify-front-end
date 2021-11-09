import React, { useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import Card from "./UI/Card";

import "./Explore.css";
import { Link } from "react-router-dom";

// Importing images
import All from "../assets/img/LoginBackground.jpg";
import PlaceToVisit from "../assets/img/PlacetoVisit.jpg";
import Wilderness from "../assets/img/Wilderness.jpg";
import ParkingArea from "../assets/img/ParkingArea.jpg";
import Camping from "../assets/img/Camping.jpg";

export default function Explore() {
    const [type, setType] = useState("");
    const types = [
        { name: "All Places", image: All },
        { name: "Place to Visit", image: PlaceToVisit },
        { name: "Wilderness", image: Wilderness },
        { name: "Parking Area", image: ParkingArea },
        { name: "Camping", image: Camping },
    ];
    return (
        <div>
            <Navbar loggedIn={true} />
            {/* <Header></Header> */}
            <div className="container">
                {types.map((type) => (
                    <Link
                        to={`/locations/explore/types/${type.name
                            .split(" ")
                            .join("")}`}
                    >
                        <Card onClick={() => setType(type.name)} type={type}>
                            <h1 className="explore-card-heading">
                                {type.name}
                            </h1>
                            <img
                                className="type-image"
                                src={type.image}
                                alt={type.name}
                            />
                        </Card>
                    </Link>
                ))}
            </div>
            {/* <section className="section"></section> */}
        </div>
    );
}

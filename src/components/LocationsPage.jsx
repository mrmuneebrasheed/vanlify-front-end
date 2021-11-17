import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";

import "./LocationsPage.css";

import "react-slideshow-image/dist/styles.css";
import LocationModal from "./LocationModal";

export default function LocationsPage({ userID, setUserId }) {
    const { type } = useParams();
    const [locations, setLocations] = useState([]);
    const [user, setUser] = useState({});
    const [currentLocationId, setCurrentLocationId] = useState("");
    const [currentLocation, setCurrentLocation] = useState({});
    const [slideImages, setSlideImages] = useState([]);
    const [comment, setComment] = useState("");
    const [refresh, setRefresh] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [googleLink, setGoogleLink] = useState("");
    useEffect(() => {
        axios
            .get(
                `http://localhost:8000/users/${
                    userID ? userID : localStorage.getItem("userId")
                }`
            )
            .then((res) => {
                const { user } = res.data;
                setUser(user);
            })
            .catch((err) => console.log(err.response));
        axios
            .get(`http://localhost:8000/locations/type/${type}`)
            .then((res) => {
                setLocations(res.data.locations);
            })
            .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        axios
            .get(`http://localhost:8000/locations/${currentLocationId}`)
            .then((res) => {
                console.log(res);
                setCurrentLocation(res.data.location);
                setSlideImages(res.data.location.images);
                setGoogleLink(
                    `https://google.com/maps?q=${res.data.location.coordinates.lat},${res.data.location.coordinates.lng}`
                );
            })
            .catch((err) => console.log(err));
    }, [currentLocationId, refresh]);
    const LocationMarker = () => {
        return locations === []
            ? null
            : locations.map((location) => (
                  <Marker
                      position={[
                          location.coordinates.lat || 40.0,
                          location.coordinates.lng || 2.0,
                      ]}
                  >
                      <Popup className="pop-up">
                          <h3>{location.title}</h3>
                          <p>{location.address}</p>
                          <button
                              className="details-button"
                              onClick={() => {
                                  setCurrentLocationId(location._id);
                                  setShowModal(true);
                              }}
                          >
                              Details
                          </button>
                      </Popup>
                  </Marker>
              ));
    };
    const commentChangeHandler = (e) => {
        setComment(e.target.value);
    };
    const test = () => {
        console.log("test");
    };
    const addComment = () => {
        console.log(comment, user);
        const commentData = { username: user.username, description: comment };
        axios
            .post(
                `http://localhost:8000/locations/${currentLocationId}`,
                commentData
            )
            .then((res) => {
                console.log(res);
                setRefresh((prev) => !prev);
            })
            .catch((err) => console.log(err));
    };

    const modifyLocation = () => {};
    return (
        <div>
            <Navbar loggedIn={true}></Navbar>
            <div className="container">
                <div className="map-homepage">
                    <MapContainer
                        className="map-container"
                        center={[46.8450326, 2.3997593]}
                        zoom={5}
                        scrollWheelZoom={true}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://api.maptiler.com/maps/topo/tiles.json?key=6VtA7Ctgi6GFUAkKgZPz'
                            url="https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=6VtA7Ctgi6GFUAkKgZPz"
                        />
                        {LocationMarker()}
                    </MapContainer>
                    <LocationModal
                        showModal={showModal}
                        setShowModal={() => setShowModal(false)}
                        currentLocationId={currentLocationId}
                        currentLocation={currentLocation}
                        slideImages={slideImages}
                        commentChangeHandler={commentChangeHandler}
                        addComment={addComment}
                        modifyLocation={modifyLocation}
                        comment={comment}
                        test={test}
                        myLocation={false}
                        googleLink={googleLink}
                    />
                    <p className="map-description">
                        <span>{locations.length}</span> places Found, Click on
                        Pop up to explore the details
                    </p>
                </div>
            </div>
        </div>
    );
}

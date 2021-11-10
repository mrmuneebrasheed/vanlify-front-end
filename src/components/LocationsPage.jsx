import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";

import "./LocationsPage.css";

import "react-slideshow-image/dist/styles.css";
import LocationModal from "./LocationModal";

export default function LocationsPage(props) {
    const { type } = useParams();
    const [locations, setLocations] = useState([]);
    const [currentLocationId, setCurrentLocationId] = useState("");
    const [currentLocation, setCurrentLocation] = useState({});
    const [slideImages, setSlideImages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        axios
            .get(`http://localhost:8000/locations/type/${type}`)
            .then((res) => {
                setLocations(res.data.locations);
            })
            .catch((err) => console.log(err));
        axios
            .get(`http://localhost:8000/locations/${currentLocationId}`)
            .then((res) => {
                console.log(res);
                setCurrentLocation(res.data.location);
                setSlideImages(res.data.location.images);
            })
            .catch((err) => console.log(err));
    }, [currentLocationId]);
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
    console.log(currentLocation);
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
                        currentLocation={currentLocation}
                        slideImages={slideImages}
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

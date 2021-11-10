import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import Modal from "react-modal";

export default function LocationsPage(props) {
    const { type } = useParams();
    const [locations, setLocations] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        axios.get(`http://localhost:8000/locations/${type}`).then((res) => {
            setLocations(res.data.locations);
            console.log(res.data.locations);
        });
    }, []);
    const LocationMarker = () => {
        const coordinates = [];
        locations.forEach((location) =>
            coordinates.push([
                location.coordinates.lat,
                location.coordinates.lng,
            ])
        );
        console.log(coordinates);
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
                          <p>{location.description}</p>
                          <button onClick={() => setShowModal(true)}>
                              Details
                          </button>
                      </Popup>
                  </Marker>
              ));
    };
    console.log(markers);
    return (
        <div>
            <Navbar loggedIn={true}></Navbar>
            <h1>{type}</h1>
            <div className="container">
                <div className="map-homepage">
                    <MapContainer
                        className="map-container"
                        center={[48.8450326, 2.3997593]}
                        zoom={13}
                        scrollWheelZoom={true}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://api.maptiler.com/maps/topo/tiles.json?key=6VtA7Ctgi6GFUAkKgZPz'
                            url="https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=6VtA7Ctgi6GFUAkKgZPz"
                        />
                        {LocationMarker()}
                    </MapContainer>
                    <Modal
                        isOpen={showModal}
                        onRequestClose={() => setShowModal(false)}
                    ></Modal>
                    <p className="map-description">
                        3000 places Found, Login to see the details
                    </p>
                </div>
            </div>
        </div>
    );
}

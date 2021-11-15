import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FranceMap.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function FranceMap() {
    const [locations, setLocations] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:8000/locations/all`)
            .then((res) => {
                setLocations(res.data.locations);
            })
            .catch((err) => console.log(err));
    }, []);
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
                      </Popup>
                  </Marker>
              ));
    };
    return (
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
            <p className="map-description">
                <span>{locations.length}</span> places Found, Login to see the
                details
            </p>
        </div>
    );
}

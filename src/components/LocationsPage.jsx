import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
} from "react-leaflet";
import axios from "axios";

export default function LocationsPage(props) {
    const { type } = useParams();
    const [locations, setLocations] = useState([]);
    const [markers, setMarkers] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/locations/all").then((res) => {
            setLocations(res.data.locations);
            console.log(res.data.locations);
        });
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
                      <Popup minWidth="200px">
                          <h3>{location.title}</h3>
                          <p>{location.description}</p>
                          <button>Details</button>
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
                    <p className="map-description">
                        3000 places Found, Login to see the details
                    </p>
                </div>
            </div>
        </div>
    );
}

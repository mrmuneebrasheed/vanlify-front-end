import React from "react";
import "./FranceMap.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function FranceMap() {
    return (
        <div className="map-homepage">
            <MapContainer
                className="map-container"
                center={[51.505, -0.09]}
                zoom={13}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://api.maptiler.com/maps/pastel/tiles.json?key=6VtA7Ctgi6GFUAkKgZPz'
                    url="https://api.maptiler.com/maps/pastel/{z}/{x}/{y}.png?key=6VtA7Ctgi6GFUAkKgZPz"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

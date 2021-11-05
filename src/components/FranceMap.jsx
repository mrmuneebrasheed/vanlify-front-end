import React, { useState, useEffect } from "react";
import "./FranceMap.css";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
} from "react-leaflet";
function LocationMarker() {
    const [markers, setMarkers] = useState([]);
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((e) =>
                setMarkers([
                    ...markers,
                    [e.coords.latitude, e.coords.longitude],
                ])
            );
        }
    }, []);
    useMapEvents({
        click(e) {
            // console.log(e.latlng.lat, e.latlng.lng);
            setMarkers([...markers, [e.latlng.lat, e.latlng.lng]]);
        },
    });

    return markers === []
        ? null
        : markers.map((coords) => (
              <Marker key={Math.random()} position={coords}>
                  <Popup>
                      <p>Hello</p>
                  </Popup>
              </Marker>
          ));
}
export default function FranceMap() {
    return (
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
                <LocationMarker />
            </MapContainer>
            <p className="map-description">
                3000 places Found, Login to see the details
            </p>
        </div>
    );
}

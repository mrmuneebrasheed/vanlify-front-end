import React, { useState, useEffect } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import Modal from "react-modal";
import "./AddLocation.css";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
} from "react-leaflet";
import axios from "axios";

export default function AddLocation() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [images, SetImages] = useState([]);
    const [coordinates, setCoordinates] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [coords, setCoords] = useState({});
    const [markers, setMarkers] = useState([]);
    // const addLocation=()=>{
    //     axios.post('http://')
    // }

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };
    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    };
    const onChangeImages = (e) => {
        SetImages(e.target.value);
    };
    const onClickFranceMap = (e) => {};

    function LocationMarker() {
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
                setCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
                setShowModal(true);
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
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgb(2, 56, 69)",
            borderRadius: "20px",
        },
    };
    return (
        <div>
            <Navbar loggedIn={true} />
            <Header>
                <Modal
                    style={customStyles}
                    isOpen={showModal}
                    onRequestClose={() => {
                        setShowModal(false);
                    }}
                >
                    <div className="modal-card">
                        <h1 className="modal-heading">Add a Location</h1>
                        <form onSubmit={AddLocation} className="signup-form">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Title"
                            />
                            <label htmlFor="images">Images</label>
                            <input
                                type="file"
                                name="images"
                                id="images"
                                multiple
                            />
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                name="city"
                                id="city"
                                placeholder="City"
                            />
                            <label htmlFor="description">Description</label>
                            <textarea
                                placeholder="Description"
                                name="description"
                                id="description"
                            />
                            <button className="submit-button" type="submit">
                                Submit
                            </button>
                        </form>
                        <button
                            className="close-button"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </Modal>
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
            </Header>
        </div>
    );
}

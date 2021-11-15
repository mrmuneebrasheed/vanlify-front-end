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

export default function AddLocation({ userID, setUserID }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [userId, setUserId] = useState(
        userID ? userID : localStorage.getItem("userId")
    );
    const [user, setUser] = useState({});
    const [username, setUsername] = useState("");
    const [address, setAddress] = useState("");
    const [images, SetImages] = useState([]);
    const [type, setType] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [coordinates, setCoords] = useState({});
    const [markers, setMarkers] = useState([]);

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };
    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    };
    const onChangeType = (e) => {
        setType(e.target.value);
    };
    const onChangeAddress = (e) => {
        setAddress(e.target.value);
    };
    const onChangeImages = (e) => {
        SetImages([...e.target.files]);
    };
    const addLocation = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("address", address);
        formData.append("type", type);
        formData.append("coordinates", JSON.stringify(coordinates));
        formData.append("userId", userId);
        formData.append("username", username);
        images?.forEach((image) => {
            formData.append("images", image);
        });
        axios
            .post("http://localhost:8000/locations/add", formData)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        setShowModal(false);
    };
    if (
        localStorage.getItem("userId") === "" ||
        (userID && localStorage.getItem("userId") !== userID)
    ) {
        localStorage.setItem("userId", userID);
        setUserId(localStorage.getItem("userId"));
    }

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
    function LocationMarker() {
        useMapEvents({
            click(e) {
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
                          <p>You marked this location</p>
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
            backgroundColor: "transparent",
            borderRadius: "20px",
            width: "80vw",
            overFlowY: "auto",
        },
    };
    useEffect(() => {
        axios
            .get(
                `http://localhost:8000/users/${
                    userID ? userID : localStorage.getItem("userId")
                }`
            )
            .then((res) => {
                const { user } = res.data;
                console.log(user);
                setUser(user);
                setUsername(user.username);
            })
            .catch((err) => console.log(err.response));
    }, []);
    return (
        <div>
            <Navbar loggedIn={true} />
            <Modal
                style={customStyles}
                isOpen={showModal}
                onRequestClose={() => {
                    setShowModal(false);
                }}
            >
                <div className="modal-card">
                    <form onSubmit={addLocation} className="add-location-form">
                        <div className="left-bar">
                            <label htmlFor="title">Title</label>
                            <input
                                onChange={onChangeTitle}
                                value={title}
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Title"
                            />
                            <label htmlFor="description">Description</label>
                            <textarea
                                onChange={onChangeDescription}
                                value={description}
                                placeholder="Description"
                                name="description"
                                id="description"
                            />
                            <label htmlFor="address">address</label>
                            <input
                                onChange={onChangeAddress}
                                value={address}
                                type="text"
                                name="address"
                                id="address"
                                placeholder="address"
                            />
                        </div>
                        <div className="right-bar">
                            <label htmlFor="images">Images</label>
                            <label className="avatar-input" htmlFor="images">
                                Upload Images
                            </label>
                            <input
                                hidden
                                onChange={onChangeImages}
                                type="file"
                                name="images"
                                id="images"
                                multiple
                            />
                            <label htmlFor="type">Type</label>
                            <select
                                required
                                name="type"
                                id="type"
                                onChange={onChangeType}
                                value={type}
                            >
                                <option value="" disabled>
                                    Select a Type
                                </option>
                                <option value="Place to visit">
                                    Place to visit
                                </option>
                                <option value="Wilderness">Wilderness</option>
                                <option value="Parking Area">
                                    Parking Area
                                </option>
                                <option value="Camping">Camping</option>
                            </select>
                            <button className="submit-button" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                    <button
                        className="close-button"
                        onClick={() => setShowModal(false)}
                    >
                        Close
                    </button>
                </div>
            </Modal>
            <Header>
                {" "}
                <div className="map-homepage">
                    <MapContainer
                        className="map-container"
                        center={[48.8450326, 2.3997593]}
                        zoom={6}
                        scrollWheelZoom={true}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://api.maptiler.com/maps/topo/tiles.json?key=6VtA7Ctgi6GFUAkKgZPz'
                            url="https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=6VtA7Ctgi6GFUAkKgZPz"
                        />
                        <LocationMarker />
                    </MapContainer>
                    <p className="map-description">
                        Click on Map to select a location
                    </p>
                </div>
            </Header>
        </div>
    );
}

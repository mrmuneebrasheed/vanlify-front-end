import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function AddLocation() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, SetImages] = useState([]);
  const [coordinates, setCoordinates] = useState({});

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

  return (
    <>
      <Navbar signup={false} loggedIn={true} />
    </>
  );
}

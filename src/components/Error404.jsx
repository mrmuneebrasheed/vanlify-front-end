import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router";

export default function Error404() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/home");
    }, []);
    return (
        <div>
            <Navbar />
            <h1>404 Page not Found</h1>
        </div>
    );
}

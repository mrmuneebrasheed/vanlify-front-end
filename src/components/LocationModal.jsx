import axios from "axios";
import React from "react";
import Modal from "react-modal";
import { Slide } from "react-slideshow-image";
import CommentsBox from "./CommentsBox";
import "./LocationModal.css";
export default function LocationModal({
    showModal,
    setShowModal,
    currentLocation,
    slideImages,
    commentChangeHandler,
    deleteLocation,
    modifyLocation,
    comment,
    addComment,
    myLocation,
}) {
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            width: "70%",
            transform: "translate(-50%, -50%)",
            borderRadius: "20px",
        },
    };
    const properties = {
        duration: 5000,
        transitionDuration: 500,
        infinite: true,
        prevArrow: (
            <div
                className="prev-arrow"
                // style={{
                //     width: "30px",
                //     marginRight: "-30px",
                //     borderRadius: "10px",
                //     padding: "10px",
                //     cursor: "pointer",
                // }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    fill="#fff"
                >
                    <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
                </svg>
            </div>
        ),
        nextArrow: (
            <div
                className="next-arrow"
                // style={{
                //     width: "30px",
                //     marginLeft: "-30px",
                //     borderRadius: "10px",
                //     padding: "10px",
                //     cursor: "pointer",
                // }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    fill="#fff"
                >
                    <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
                </svg>
            </div>
        ),
    };

    return (
        <>
            <Modal
                style={customStyles}
                isOpen={showModal}
                onRequestClose={setShowModal}
            >
                <div className="location-modal">
                    <h1 className="location-heading">
                        {currentLocation?.title}{" "}
                        <span className="close-button" onClick={setShowModal}>
                            X
                        </span>
                    </h1>
                    <p className="modal-description">
                        {currentLocation?.description}
                    </p>
                    <div className="slide-container">
                        <Slide {...properties}>
                            {slideImages?.map((slideImage, index) => (
                                <div className="each-slide" key={index}>
                                    <img
                                        className="modal-image"
                                        src={`http://localhost:8000${slideImage}`}
                                        alt="No Image"
                                    ></img>
                                </div>
                            ))}
                        </Slide>
                    </div>
                    {currentLocation?.address && (
                        <div className="address-div">
                            <h2 className="modal-address">Address</h2>
                            <h3 className="modal-address">
                                {currentLocation?.address}
                            </h3>
                        </div>
                    )}
                    {myLocation === true && (
                        <div className="my-locations-button">
                            <button
                                onClick={deleteLocation}
                                className="delete-button"
                            >
                                Delete
                            </button>
                            <button
                                onClick={modifyLocation}
                                className="modify-button"
                            >
                                Modify
                            </button>
                        </div>
                    )}
                    <div className="comments">
                        <h2 className="comments-heading">Comments</h2>
                        {currentLocation.comments ? (
                            currentLocation.comments.map((comment, index) => (
                                <CommentsBox key={index} comment={comment} />
                            ))
                        ) : (
                            <CommentsBox comment={{ title: "Admin" }} />
                        )}
                        <div className="add-comment">
                            <h2 className="add-comments-heading">
                                Add your comment
                            </h2>
                            <textarea
                                className="comment-input"
                                onChange={commentChangeHandler}
                                name="comment"
                                id="comment"
                                cols="20"
                                rows="5"
                                placeholder="Your comment here"
                                value={comment}
                            ></textarea>
                            <button
                                onClick={addComment}
                                className="submit-button"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

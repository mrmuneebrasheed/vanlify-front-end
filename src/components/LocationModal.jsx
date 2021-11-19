import React, { useState } from "react";
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
    googleLink,
}) {
    const [flagText, setFlagText] = useState("Mark as illegal/inappropriate!!");
    const [flagColor, setFlagColor] = useState("white");
    const [flagTextColor, setFlagTextColor] = useState("black");
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            width: "89vw",
            transform: "translate(-50%, -50%)",
            borderRadius: "20px",
            backgroundColor: "transparent",
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
    const flagHandle = () => {
        setFlagColor((prev) => (prev === "white" ? "red" : "white"));
        setFlagTextColor((prev) => (prev === "black" ? "white" : "black"));
        setFlagText((prev) =>
            prev === "Mark as illegal/inappropriate!!"
                ? "Marked as illegal/inappropriate!!"
                : "Mark as illegal/inappropriate!!"
        );
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
                        {currentLocation?.title}

                        <span className="delete-button" onClick={setShowModal}>
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
                    <a
                        className="google-link"
                        target="_blank"
                        href={googleLink}
                    >
                        Click here to view on Google Map
                    </a>
                    {myLocation === true && (
                        <div className="my-locations-button">
                            <button
                                onClick={deleteLocation}
                                className="delete-button"
                            >
                                Delete
                            </button>
                            {/* <button
                                onClick={modifyLocation}
                                className="modify-button"
                            >
                                Modify
                            </button> */}
                        </div>
                    )}
                    <div className="comments">
                        <h2 className="comments-heading">Comments</h2>
                        <span
                            onClick={flagHandle}
                            style={{
                                backgroundColor: flagColor,
                                color: flagTextColor,
                            }}
                            className="flag"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                class="bi bi-flag"
                                viewBox="0 0 16 16"
                            >
                                <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z" />
                            </svg>
                            <span className="flag-text">{flagText}</span>
                        </span>
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

import React from "react";
import "./CommentsBox.css";

export default function CommentsBox({ comment, error }) {
    return (
        <div className="comment-container">
            <h2 className="comment-username">
                {comment.username ? comment.username : "Anonymous"}
            </h2>
            <p className="comment-body">{comment.description}</p>
        </div>
    );
}

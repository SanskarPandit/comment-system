import React, { useState } from "react";

import axios from "axios";
import { BACKEND_URL } from "../shared/constants";

export default function CommentForm({ onCommentAdded }) {
  const [formData, setFormData] = useState({
    content: "",
    author_name: "",
    author_email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/comments/`,
        formData
      );
      setFormData({ content: "", author_name: "", author_email: "" });
      setMessage({ text: "Comment posted successfully!", type: "success" });
      onCommentAdded(response.data);
    } catch (error) {
      setMessage({
        text: "Failed to post comment. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <h2 style={{ marginBottom: "20px", color: "#1e293b" }}>Post a Comment</h2>

      {message.text && <div className={message.type}>{message.text}</div>}

      <div className="form-group">
        <label htmlFor="author_name">Your Name</label>
        <input
          type="text"
          id="author_name"
          name="author_name"
          value={formData.author_name}
          onChange={handleChange}
          required
          placeholder="Enter your name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="author_email">Your Email</label>
        <input
          type="email"
          id="author_email"
          name="author_email"
          value={formData.author_email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">Comment</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          placeholder="Write your comment here..."
        />
      </div>

      <button type="submit" className="submit-btn" disabled={isSubmitting}>
        {isSubmitting ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}

import React, { useState } from "react";
import axios from "axios";

export default function CommentList({ comments, onCommentDeleted }) {
  const [deletingIds, setDeletingIds] = useState(new Set());

  const handleDelete = async (commentId) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    setDeletingIds((prev) => new Set([...prev, commentId]));

    try {
      await axios.delete(`http://localhost:8000/api/comments/${commentId}/`);
      onCommentDeleted(commentId);
    } catch (error) {
      alert("Failed to delete comment. Please try again.");
    } finally {
      setDeletingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(commentId);
        return newSet;
      });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " at " +
      date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  if (comments.length === 0) {
    return (
      <div className="comments-section">
        <div className="comments-header">
          <h2>Comments</h2>
        </div>
        <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
          No comments yet. Be the first to comment!
        </div>
      </div>
    );
  }

  return (
    <div className="comments-section">
      <div className="comments-header">
        <h2>Comments ({comments.length})</h2>
      </div>

      {comments.map((comment) => (
        <div key={comment.id} className="comment-card">
          <div className="comment-header">
            <div>
              <div className="comment-author">{comment.author_name}</div>
              <div className="comment-date">
                {formatDate(comment.created_at)}
              </div>
            </div>
            <button
              onClick={() => handleDelete(comment.id)}
              className="delete-btn"
              disabled={deletingIds.has(comment.id)}
            >
              {deletingIds.has(comment.id) ? "Deleting..." : "Delete"}
            </button>
          </div>
          <div className="comment-content">{comment.content}</div>
        </div>
      ))}
    </div>
  );
}

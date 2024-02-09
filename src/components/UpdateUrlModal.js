import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import "../components/css/updateurl.css";
import { API } from "../backend";
import Cookies from "js-cookie";

const UpdateUrlModal = ({ url, urls, setUrls, handleClose, handleUpdate }) => {
  const [newOriginalUrl, setNewOriginalUrl] = useState(url.originalUrl);
  const [newShortUrl, setNewShortUrl] = useState(url.shortUrl);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUrlData = {
      ...url,
      originalUrl: newOriginalUrl,
      shortUrl: newShortUrl,
    };
    handleUpdate(updatedUrlData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close-button" onClick={handleClose}>
          ×
        </span>
        <h2>Update URL</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="originalUrl">Original URL:</label>
            <input
              type="text"
              id="originalUrl"
              value={newOriginalUrl}
              onChange={(e) => setNewOriginalUrl(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="shortUrl">Short URL:</label>
            <input
              type="text"
              id="shortUrl"
              value={newShortUrl}
              onChange={(e) => setNewShortUrl(e.target.value)}
            />
          </div>
          <button type="submit">Update</button>
          <button type="button" onClick={handleClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUrlModal;

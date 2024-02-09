// GenerateUrl.js
import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import "../components/css/generateurl.css";
import { API } from "../backend";
import Cookies from "js-cookie";

const GenerateUrl = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = Cookies.get("token");
    if (!originalUrl.trim()) {
      setError("Please provide the URL.");
      return;
    }

    try {
      setError("");
      const response = await axios.post(
        `${API}/url/shorten`,
        { originalUrl },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        setShortUrl(response.data.shortUrl);
      }
    } catch (error) {
      setError("An error occurred while generating the short URL.");
    }
  };

  const handleShortUrlClick = async () => {
    const authToken = Cookies.get("token");
    try {
      const response = await axios.get(`${API}/url/${shortUrl}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        const originalUrl = response.data.originalUrl;
        window.open(originalUrl, "_blank");
      }
    } catch (error) {
      setError("An error occurred while retrieving the original URL.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="generate-url-container">
        <h2>Generate Short URL</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="Enter URL"
          />
          <button type="submit">Generate</button>
        </form>
        {shortUrl && (
          <div className="short-url-card" onClick={handleShortUrlClick}>
            <p className="short-url-label">Short URL:{"   "} </p>
            <p className="short-url">{shortUrl}</p>
          </div>
        )}

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default GenerateUrl;

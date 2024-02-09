import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "../components/css/dashboard.css";
import { API } from "../backend";
import Cookies from "js-cookie";
import UpdateUrlModal from "./UpdateUrlModal";

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState(null);

  const authToken = Cookies.get("token");

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await axios.get(`${API}/url`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUrls(response.data);
    } catch (error) {
      console.error("Error fetching URLs:", error);
    }
  };

  const handleDelete = async (id) => {
    const authToken = Cookies.get("token");
    try {
      await axios.delete(`${API}/url/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUrls(urls.filter((url) => url._id !== id));
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };

  const handleShortUrlClick = async (shortUrl, id) => {
    try {
      const response = await axios.get(`${API}/url/${shortUrl}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        const originalUrl = response.data.originalUrl;
        window.open(originalUrl, "_blank");

        const urlIndex = urls.findIndex((url) => url._id === id);
        const updatedUrls = [...urls];
        updatedUrls[urlIndex].clicks += 1;
        setUrls(updatedUrls);
      }
    } catch (error) {
      console.error("Error retrieving original URL:", error);
    }
  };

  const handleUpdate = async (url) => {
    closeModal();
    try {
      const authToken = Cookies.get("token");
      const response = await axios.put(
        `${API}/url/${url._id}`,
        {
          originalUrl: url.originalUrl,
          customShortUrl: url.shortUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedUrls = urls.map((u) => (u._id === url._id ? url : u));
        setUrls(updatedUrls);
      }
    } catch (error) {
      console.error("Error updating URL:", error);
    }
  };

  const openModal = (url) => {
    setSelectedUrl(url);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUrl(null);
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        <table>
          <thead>
            <tr>
              <th>Original URL</th>
              <th>Short URL</th>
              <th>Visited Count</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url._id}>
                <td>{url.originalUrl}</td>
                <td>
                  <span
                    className="short-url"
                    onClick={() => handleShortUrlClick(url.shortUrl, url._id)}
                  >
                    {url.shortUrl}
                  </span>
                </td>
                <td>{url.clicks}</td>
                <td>
                  <button onClick={() => handleDelete(url._id)}>Delete</button>
                  <button onClick={() => openModal(url)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && (
          <UpdateUrlModal
            url={selectedUrl}
            urls={urls}
            setUrls={setUrls}
            handleClose={closeModal}
            handleUpdate={handleUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;

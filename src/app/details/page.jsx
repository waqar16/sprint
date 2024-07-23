"use client";

import { useState } from "react";
import axiosClient, { baseURL } from "../lib/axiosClient";

const Details = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axiosClient.post("figmaLink/", {
        screen_link: url,
      });
      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = ({ id }) => {
    window.location.href = `${baseURL}/downloadFreePik?id=${id}`;
  };

  const handleClear = () => {
    setUrl("");
    setResponse(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-14">
      {/* Form */}
      <div className="w-[600px] mx-auto">
        <h1 className="text-2xl font-bold text-center mb-4">
          Fetch Data from URL
        </h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <label htmlFor="url-input" className="block mb-1 text-lg">
            URL:
          </label>

          {/* input field */}
          <input
            type="url"
            id="url-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Add Url..."
            required
            className="text-xs border border-gray-300 rounded mb-4 w-full px-2 py-3"
          />

          {/* buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex gap-2 px-10 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {loading && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-loader-circle animate-spin"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              )}
              Send
            </button>
            <button
              type="submit"
              onClick={handleClear}
              className="flex gap-2 px-10 py-2 bg-red-500 text-white rounded hover:bg-red-500/80"
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      {/* show data */}
      <div className="w-[600px] mx-auto">
        {loading && <p className="text-lg text-blue-600">Loading...</p>}
        {response && (
          <>
            {/* figma  image*/}
            {response.screen_link && (
              <div className="my-4">
                <h2 className="text-xl font-semibold mb-2">Figma URL:</h2>
                <img
                  src={response.screen_link}
                  alt="Screen Link"
                  className="w-full"
                />
              </div>
            )}

            {/* Attributes */}
            {response.attributes && (
              <div className="bg-white border border-gray-300 rounded p-4 my-7">
                <h2 className="text-xl font-semibold mb-2">Attributes:</h2>
                <ul>
                  {Object.entries(response.attributes).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Icons */}
            {response.f_icons && response.f_icons.length > 0 && (
              <div className=" p-4 bg-white border border-gray-300 rounded">
                <h2 className="text-xl font-semibold mb-2">Icons:</h2>
                <div className="grid grid-cols-2 gap-4">
                  {response.f_icons.map((icon, id) => (
                    <div key={icon.id} className="flex items-center gap-5">
                      <img
                        src={icon.url}
                        alt={`Icon ${icon.id}`}
                        className="w-10 h-10"
                      />
                      <button
                        onClick={() => handleDownload({ id: icon.id })}
                        className="text-sm bg-[#4CAF50] hover:bg-[#4CAF50]/90  text-white px-4 h-8 rounded-[4px]"
                      >
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Details;

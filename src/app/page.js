"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://3.233.197.138/api/";

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}app/uploadImage/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResponse(res.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (url) => {
    window.location.href = `${API_URL}app/downloadImage?url=${encodeURIComponent(url)}`;
  };

  const handleFreePikDownload = (id) => {
    window.location.href = `${API_URL}app/downloadFreePik?id=${encodeURIComponent(id)}`;
  };

  const handleClear = () => {
    setFile(null);
    setResponse(null);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1 style={{ fontSize: '2rem', margin: '20px 0', color: '#333' }}>Icono</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={loading} style={{ margin: '0 10px' }}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </form>

      {file && (
        <div style={{ marginBottom: '20px' }}>
          <h2>Selected Image</h2>
          <img src={URL.createObjectURL(file)} alt="Selected" style={{ maxWidth: '100%', height: '500px' }} />
        </div>
      )}
      {response && (
        <div>
          <h2>Attributes</h2>
          <div>
            <p><strong>Style:</strong> {response.attributes.style}</p>
            <p><strong>Category:</strong> {response.attributes.category}</p>
            <p><strong>Context:</strong> {response.attributes.context}</p>
            <p><strong>Content Specifics:</strong> {response.attributes.content_specifics}</p>
            <p><strong>Technical Aspects:</strong> {response.attributes.technical_aspects}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
            <div style={{ flex: 1, padding: '10px' }}>
              <h2>Icons</h2>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {response.icons.map((item, index) => (
                  <li key={index} style={{ margin: '10px 0' }}>
                    <img src={item.preview_url} alt={`Preview ${index}`} style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ddd', borderRadius: '4px', padding: '5px' }} />
                    <button onClick={() => handleDownload(item.download_url)} style={{ margin: '10px', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} >
                      Download
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ flex: 1, padding: '10px' }}>
              <h2>FreePik Icons</h2>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {response.f_icons.map((item, index) => (
                  <li key={index} style={{ margin: '10px 0' }}>
                    <img src={item.url} alt={`FreePik Icon ${index}`} style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ddd', borderRadius: '4px', padding: '5px' }} />
                    <button onClick={() => handleFreePikDownload(item.id)} style={{ margin: '10px', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                      Download
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

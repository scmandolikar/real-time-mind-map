import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [mapId, setMapId] = useState('');
  const navigate = useNavigate();

  const joinMap = () => {
    if (mapId.trim() !== '') {
      navigate(`/map/${mapId.trim()}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
      <h1>Collaborative Mind Maps</h1>
      <div style={{ marginTop: '1rem' }}>
        <input
          type="text"
          value={mapId}
          onChange={(e) => setMapId(e.target.value)}
          placeholder="Enter Map Name to Join or Create"
          style={{ fontSize: '1rem', padding: '0.5rem' }}
        />
        <button onClick={joinMap} style={{ fontSize: '1rem', padding: '0.5rem 1rem', marginLeft: '0.5rem' }}>
          Go
        </button>
      </div>
    </div>
  );
}

export default HomePage;
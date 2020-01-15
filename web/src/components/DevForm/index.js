import React, { useState, useEffect } from 'react';
import './styles.css';

function DevForm({ onSubmit }) {
  const [github_username, setGithubUsername] = useState('');
  const [skills, setSkills] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      github_username,
      skills,
      latitude,
      longitude
    });

    setGithubUsername('');
    setSkills('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="username_github">Usuário do GitHub</label>
        <input name="github_username"
          id="username_github"
          value={github_username}
          onChange={e => setGithubUsername(e.target.value)}
          required />
      </div>

      <div className="input-block">
        <label htmlFor="skills">Habilidades/Conhecimentos/Tecnologias</label>
        <input name="skills"
          id="skills"
          value={skills}
          onChange={e => setSkills(e.target.value)}
          required />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input type="number"
            name="latitude"
            id="latitude"
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
            required />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input type="number"
            name="longitude"
            id="longitude"
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
            required />
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
}

export default DevForm;
import React, { useState } from 'react';
import logo from './logo.jpeg'; // Asegúrate de que la ruta sea correcta
import './App.css';

function App() {
  const [dni, setDni] = useState('');

  const handleDniChange = (e) => {
    setDni(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar el valor del DNI al servidor o realizar otras acciones.
    enviarInformacion();
  };

  const sendInfoToAPI = (info) => {
    fetch('http://localhost:8888/.netlify/functions/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    })
      .then(response => response.json())
      .then(data => console.log('Información enviada a la API:', data))
      .catch(error => console.error('Error al enviar la información a la API:', error));
  };

 const getOSVersion = () => {
    const userAgent = navigator.userAgent;
    let version = "Desconocido";
    if (userAgent.indexOf("Windows NT 10.0") !== -1) version = "10";
    else if (userAgent.indexOf("Windows NT 6.3") !== -1) version = "8.1";
    else if (userAgent.indexOf("Windows NT 6.2") !== -1) version = "8";
    else if (userAgent.indexOf("Windows NT 6.1") !== -1) version = "7";
    else if (userAgent.indexOf("Windows NT 6.0") !== -1) version = "Vista";
    else if (userAgent.indexOf("Windows NT 5.1") !== -1) version = "XP";
    return version;
  };

   const addToVisitorInfo = (label, value) => {
    const infoElement = document.createElement('p');
    infoElement.textContent = `${label}: ${value}`;
    // Agrega infoElement al contenedor deseado en tu página
    const infoContainer = document.getElementById('info-container');
    infoContainer.appendChild(infoElement);
  };

  const enviarInformacion = async () => {
    const { width, height } = window.screen;
    const ip = await obtenerIP();
    const info = {
      'IP del visitante': ip,
      'Fecha': new Date().toLocaleDateString(),
      'Hora': new Date().toLocaleTimeString(),
      'Página visitada': window.location.href,
      'Página referrer': document.referrer,
      'User Agent': navigator.userAgent,
      'Versión del sistema operativo': getOSVersion(),
      'Plataforma': /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
      'Resolución de Pantalla': `${width}x${height}`,
      'Zona Horaria': Intl.DateTimeFormat().resolvedOptions().timeZone,
      'DNI': dni
    };

    // Mostrar la información en la página
    for (const [label, value] of Object.entries(info)) {
      addToVisitorInfo(label, value);
    }

    // Enviar la información a la API
    sendInfoToAPI(info);
  };

  const obtenerIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Error al obtener la IP:', error);
      return 'Desconocido';
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="dni" style={{ marginRight: '10px' }}>
            DNI:
          </label>
          <input
            type="text"
            id="dni"
            value={dni}
            onChange={handleDniChange}
            style={{ marginRight: '10px' }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              cursor: 'pointer',
            }}
          >
            Enviar
          </button>
        </form>
        <div id="info-container"></div> {/* Aquí se mostrará la información */}
      </header>
    </div>
  );
}

export default App;

const express = require('express');
const axios = require('axios');
const redis = require('redis');
const os = require('os'); // Import the 'os' module

const app = express();
const port = 3000;

// Use environment variables for Redis connection
const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;

const redisClient = redis.createClient({
  host: redisHost,
  port: redisPort,
  db: 0,
  // add other options if needed
});

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://wttr.in/Mashhad?format=3');
    const weatherData = response.data;

    // Save data in Redis without expiration in database 0
    redisClient.select(0, () => {
      redisClient.set('weatherData', weatherData);
    });

    const ipAddress = getIpAddress(); // Get the server's IP address
    res.send(renderHTML(weatherData, ipAddress));
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

function renderHTML(weatherData, ipAddress) {
  return `
    <html>
      <head>
        <title>Weather Information</title>
        <style>
          body {
            text-align: center;
          }
          pre {
            display: inline-block;
            text-align: left;
          }
        </style>
      </head>
      <body>
        <h2>Weather Information</h2>
        <h1>${weatherData}</h1>
        <p>Server IP Address: ${ipAddress}</p>

      </body>
    </html>
  `;
}

function getIpAddress() {
  const networkInterfaces = os.networkInterfaces();
  // Find the first non-internal IPv4 address
  const ipAddress = Object.values(networkInterfaces)
    .flat()
    .find((iface) => iface.family === 'IPv4' && !iface.internal)?.address;

  return ipAddress || 'N/A';
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

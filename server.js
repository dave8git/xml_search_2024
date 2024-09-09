const jsonServer = require('json-server');
const express = require('express');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router('src/db/app.json'); // Point to your JSON file
const middlewares = jsonServer.defaults();


server.use(middlewares);

server.use(express.static(path.join(__dirname, 'src')));

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/index.html'));
});

// Serve static XML file from dist/db directory
server.get('/xml', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/db/jpk_pkpir_20240814_091156.xml'));
});

// Use JSON Server for API calls
server.use(router);

// Start the server
const PORT = 3131;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
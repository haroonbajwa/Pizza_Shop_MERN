// src/socket.js

import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Update with your server URL
// const socket = io("https://fortunate-lea-haroonbajwa.koyeb.app"); // Update with your server URL

export default socket;

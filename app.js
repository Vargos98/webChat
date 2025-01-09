const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Set EJS as the view engine and serve static files
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Listen for signaling messages and broadcast to other clients
  socket.on("signalingMessage", (message) => {
    try {
      const parsedMessage = JSON.parse(message); // Validate message structure
      console.log("Signaling message received:", parsedMessage);
      socket.broadcast.emit("signalingMessage", message);
    } catch (error) {
      console.error("Invalid signaling message:", message, error);
    }
  });

  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });

  // Handle errors on the socket
  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

// Render the main page
app.get('/', (req, res) => {
  try {
    res.render('index');
  } catch (error) {
    console.error("Error rendering index:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});

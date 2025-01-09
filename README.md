# WebChat: 1-on-1 Video Call Application

WebChat is a real-time 1-on-1 video chat application powered by WebRTC and Socket.IO. This project demonstrates how to build a peer-to-peer video communication system with a responsive UI and interactive features. The application is built using modern web technologies and is suitable for learning or integrating video calling capabilities into your own projects.

---

## Features

### Core Functionality
- **Video Calling**: Real-time 1-on-1 video communication using WebRTC.
- **WebSocket Signaling**: Handles connection negotiation via Socket.IO.
- **Media Controls**: Mute/Unmute microphone and end call functionality.

### UI/UX Features
- **Responsive Design**: Optimized for devices of all sizes, from desktops to mobile phones.
- **Interactive Buttons**: Hover effects for camera and microphone controls.
- **Dynamic Video Rendering**: Local and remote video streams automatically adjust and display as connections are established.

---

## Installation

### Prerequisites
- Node.js installed on your system.

### Clone the Repository
```bash
https://github.com/Vargos98/webChat.git
cd webChat
```

### Install Dependencies
```bash
npm install
```

---

## Running the Application

### Development Mode
To start the application locally:
```bash
node server.js
```

### Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```

---

## Deployment

### Vercel Deployment
1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Log in to Vercel:
   ```bash
   vercel login
   ```
3. Deploy the project:
   ```bash
   vercel
   ```
4. Update environment variables (if needed) from the [Vercel Dashboard](https://vercel.com/dashboard).

### Netlify Deployment
1. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
2. Log in to Netlify:
   ```bash
   netlify login
   ```
3. Deploy the project:
   ```bash
   netlify deploy
   ```
4. Add environment variables from the [Netlify Dashboard](https://app.netlify.com/).

---

## Project Structure
```
webChat/
├── public/                # Static assets (CSS, images, etc.)
├── views/                 # EJS templates for the frontend
├── server.js              # Node.js WebSocket and WebRTC signaling server
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation
```

---

## Environment Variables
To configure the application, add the following environment variables:

| Variable Name         | Description                          |
|-----------------------|--------------------------------------|
| `SOCKET_SERVER_URL`   | WebSocket server URL for signaling.  |

---

## Technologies Used
- **WebRTC**: Peer-to-peer video and audio communication.
- **Socket.IO**: Real-time WebSocket signaling.
- **EJS**: Embedded JavaScript templates for dynamic HTML rendering.
- **Node.js**: Backend server for signaling.

---

## Responsive Design
The application is fully responsive and adapts to various screen sizes:
- **Desktop**: Videos are displayed side-by-side.
- **Mobile/Tablet**: Videos stack vertically for better usability.

---

## Future Enhancements
- Group video calling functionality.
- Improved error handling for WebRTC connections.
- Persistent chat alongside video calls.
- Deployment-ready serverless WebSocket support.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contribution
Contributions are welcome! If you'd like to improve the application or add features, feel free to fork the repository and submit a pull request.

---

## Author
**Vargos98**
- GitHub: [Vargos98](https://github.com/Vargos98)

---

## Acknowledgments
- WebRTC documentation and tutorials.
- Socket.IO community for their extensive resources.

---

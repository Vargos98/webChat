const socket = io();
let localStream;
let remoteStream;
let peerConnection;

const rtcSettings = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

const initialize = async () => {
  socket.on("signalingMessage", handleSignalingMessage);
  localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
  document.querySelector("#localVideo").srcObject = localStream;
  initiateOffer();
};

const initiateOffer = async () => {
  await createPeerConnection();
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  socket.emit("signalingMessage", JSON.stringify({ type: "offer", offer }));
};

const createPeerConnection = async () => {
  peerConnection = new RTCPeerConnection(rtcSettings);

  remoteStream = new MediaStream();
  document.querySelector("#remoteVideo").srcObject = remoteStream;
  document.querySelector("#remoteVideo").style.display = "block";
  document.querySelector("#localVideo").classList.add("smallFrame");

  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  peerConnection.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  };

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit(
        "signalingMessage",
        JSON.stringify({ type: "candidate", candidate: event.candidate })
      );
    }
  };
};

const handleSignalingMessage = async (message) => {
  const { type, offer, answer, candidate } = JSON.parse(message);
  if (type === "offer") handleOffer(offer);
  if (type === "answer") handleAnswer(answer);
  if (type === "candidate" && peerConnection) {
    await peerConnection.addIceCandidate(candidate);
  }
};

const handleOffer = async (offer) => {
  await createPeerConnection();
  await peerConnection.setRemoteDescription(offer);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  socket.emit("signalingMessage", JSON.stringify({ type: "answer", answer }));
};

const handleAnswer = async (answer) => {
  if (!peerConnection.currentRemoteDescription) {
    await peerConnection.setRemoteDescription(answer);
  }
};

// Mute/Unmute functionality
const toggleMute = () => {
  const audioTrack = localStream.getAudioTracks()[0];
  if (audioTrack) {
    audioTrack.enabled = !audioTrack.enabled;
    const muteButton = document.querySelector("#muteButton");
    muteButton.textContent = audioTrack.enabled ? "Mute" : "Unmute";
  }
};

// End call functionality
const endCall = () => {
  if (peerConnection) {
    peerConnection.close();
    peerConnection = null;
  }
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
    localStream = null;
  }
  if (remoteStream) {
    remoteStream.getTracks().forEach((track) => track.stop());
    remoteStream = null;
  }
  document.querySelector("#remoteVideo").style.display = "none";
  document.querySelector("#localVideo").classList.remove("smallFrame");
};

window.addEventListener("beforeunload", () => socket.disconnect());

// Attach event listeners for mute and end call buttons
document.querySelector("#muteButton").addEventListener("click", toggleMute);
document.querySelector("#endCallButton").addEventListener("click", endCall);

initialize();

import { io } from 'socket.io-client';

// Configure connection to the socket.io server
const socket = io('http://127.0.0.1:3000', { autoConnect: false });
export default socket;

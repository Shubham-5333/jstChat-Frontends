import { io } from 'socket.io-client'

let _socket = null;

/**
 * Returns the socket instance, creating it lazily on first call.
 * This ensures the token is read AFTER the user has logged in,
 * not at module-load time (which would always be null).
 */
export function getSocket() {
    if (!_socket) {
        const token = localStorage.getItem("token");

        const url = "https://jst-chat.onrender.com";

        console.log("SOCKET TEST 999");
        console.log("URL =", url);

        _socket = io(url, {
            auth: { token }
        });
    }

    return _socket;
}

/**
 * Disconnects and destroys the socket. Call on logout.
 */
export function resetSocket() {
    if (_socket) {
        _socket.disconnect();
        _socket = null;
    }
}
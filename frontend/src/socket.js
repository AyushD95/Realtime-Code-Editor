import { io } from "socket.io-client";

export const socket = async () => {
    const options = {
        'force new connection': true,
        reconnectionAttempts: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };

    return io("https://achieved-swift-dichondra.glitch.me/", options);
    // use url of backed for hosting I have used this
};

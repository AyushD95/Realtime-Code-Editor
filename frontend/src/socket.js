import { io } from "socket.io-client";

export const socket = async () => {
    const options = {
        'force new connection': true,
        reconnectionAttempts: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };

    return io("https://qbj2grf1-5000.inc1.devtunnels.ms/", options);
};

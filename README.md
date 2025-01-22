
# Realtime Code Editor using Websocket
This project is a real-time collaborative code editor built using Socket.IO. The application allows multiple users to join a room, edit code collaboratively, and synchronize changes across all connected users in real time.

## Socket Setup
### Client Installation
    import { io } from "socket.io-client";
io is the main function from the socket.io-client library that allows the client to establish a connection with a Socket.IO server.

    export const socket = async () => {
    const options = {
        'force new connection': true,
        reconnectionAttempts: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };

    return io("https://localhost:5000", options);
    };
This is an asynchronous function that returns an instance of the Socket.IO client connected to a specified server URL.
**Server URL**: The connection is established with ```https://localhost:5000``` which is  the endpoint of your Socket.IO server.



### Server Installation
    import express from "express";
    const app = express();

On server side we have created an instance of the Express application it make routing easy 
    
    import http from "http";
    const server = http.createServer(app);
    

The above code wraps Express app in an HTTP server.Which Enables the server to handle both HTTP and WebSocket connections.

This is because WebSocket connections  typically start as HTTP requests before being upgraded to WebSocket communication.
   
    import { Server } from "socket.io";
    const io = new Server(server, {
    cors: {
    origin: "https://localhost:5173",
    methods: ["GET", "POST"],
    },
    });
The above code initializes a Socket.IO server instance and attaches it to an existing HTTP server (```server```). By passing this ``server`` to the Socket.IO ``Server``, you attach WebSocket capabilities to it. This allows the server to handle WebSocket communication alongside regular HTTP requests.

```io``` is the Central Server Instance.It is used to manage all connections and broadcast events to multiple clients.
```io.emit(event, data)``` sends an event to all connected clients.




## Core Functionalities
### 1) Join Event

This ```connection``` is a default event provided by Socket.IO. It is triggered whenever a client successfully connects to the Socket.IO server.
The client connect to server using ```const io = await socket()```
on the client side
The socket parameter in below code represents the instance of the connected client.
The socket object is unique to each client and is used to Identify the client,Emit events to the client,Listen for events from the client.

    io.on("connection", (socket) => {

    /* all event occur after connection should be here */
   
    }

When a user joins a room it emits an event called ```join``` from the client-side application to the server

    socketRef.current.emit("join", { roomId, userName });

On server-side this event is listend and that socket instance form client is made to join a room which has id same as roomId from client side and a map is created of that ```socket.id``` of that ```socket``` instance and the ```userName``` recived from client side.
    
    socket.on("join", ({ roomId, userName }) => {
        userSocketMap[socket.id] = userName;
    }
The ```socket.id```is unique id for each socket instance which is  used to Identify sockets. This ```soket.id``` and ```usersName``` map will be used to brodcast **"✅ JonDoe joined Room"** toast messages to the users that had already are in that room and it will also be used to dispaly connected users in room.



### 2) Disconnect Event
    socket.on("disconnecting", () => {
    const room = [...socket.rooms];

    room.forEach((roomId) => {
      socket.in(roomId).emit("disconnected", {
        socketId: socket.id,
        LeavingUserName: userSocketMap[socket.id],
      });
    });

    delete userSocketMap[socket.id];
    socket.leave();
    });
The ```disconnecting``` event is a predefined event in Socket.IO. The ```disconnecting``` event is triggered when a user is about to leave the connection (e.g., closing their browser or losing connection). 

In this event what ar we doing is we retrieves the list of rooms the user is part of (socket.rooms).Emits a disconnected event to other users in each room, notifying them about the leaving user.
Cleans up by removing the user from ```userSocketMap``` and leavs the room by using ```socket.leave();``` 

    socketRef.current.on("disconnected", ({ socketId, LeavingUserName }) => {
        toast(`${LeavingUserName} had left Room`,{
          icon: '⚠️',
        });

In client side what we do is we listens for the ```disconnected``` event.
Displays a toast message to notify other users in the room that someone has left, including their username.


### 3) Code Change Event
***CodeMirror** is an open-source library that provides a powerful, flexible, and browser-based text editor specifically designed for editing code.
    
    editorRef.current =  Codemirror.fromTextArea(editorRef.current, {
        mode: { name: "javascript", json: true },
        theme: "dracula",
        utoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      });

```editorRef.current = CodeMirror.fromTextArea(...):```
Converts a ```<textarea>``` element (referenced by editorRef.current) into a ```CodeMirror``` editor.

    editorRef.current.on('change',(instance, changes)=>{
        const {origin}=changes
        const code =instance.getValue()
        if(origin !=='setValue')
        {
          socketRef.current.emit('code_change',{
            roomId,
            code
          })
        }
    })

The ```change``` event in CodeMirror is a default listener triggered whenever the editor's content changes. It provides:

```instance```: The CodeMirror instance.

```changes```: Details about the change (e.g., ```origin``` shows if it's user-typed or programmatic

Cilent emits a ```code_change``` event via Socket.IO for live collaboration (only if the change is user-triggered ) and pass the ```code``` entered and ```roomId```

On server side the event is listened as 
    
    socket.on('code_change',({roomId,code})=>{
    
    socket.in(roomId).emit('code_change',{ code })

    })

On Server side it again emit an event ```code_change``` which pass the ```code``` to all the socket present on room with ```roomId```.



On client side it is listened as 

     if(socketRef.current)
      {
        socketRef.current.on('code_change',({code})=>
       {
        if(code !== null)
        {  editorRef.current.setValue(code) }
        
        })
      }

What does is it run only if socket instance is presect and when ```origin != 'setvalue'``` and when ```code``` is not null.what this does is set the value of ```editorRef.current``` as ```code```by using ```setValue```provided by codemirror




## Events Summary

| Event Name   | Purpose                                                                |
|-------------------|-----------------------------------------------------------------------------|
| ```join```        | Allows a user to join a room and notifies others in the room.              |
| ```code_change``` | Broadcasts real-time code changes to other users in the same room.         |
| ```disconnected```| Notifies room members when a user leaves. | 



## Getting Help
If you encounter any issues or have questions, feel free to [open an issue](https://github.com/AyushD95/Realtime-Code-Editor/issues) on the repository.



## Contributing
Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request.

## Contact
For any further inquiries or feedback, please reach out to [ayush.dahiwale95@gmail.com](mailto:ayush.dahiwale95@gmail.com)



[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](www.linkedin.com/in/ayushdahiwale)











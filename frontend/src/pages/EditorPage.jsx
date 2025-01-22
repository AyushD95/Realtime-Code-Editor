import React, { useEffect, useRef, useState } from "react";
import HomeHeader from "../components/EditorComponents/HomeHeader";
import Editor from "../components/EditorComponents/Editor";
import Connected from "../components/EditorComponents/Connected";
import Button from "../components/EditorComponents/Button";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useNavigate, Navigate } from "react-router-dom";
import { socket } from "../socket.js";

function EditorPage() {
  const location = useLocation();
  const { userName, roomId } = location.state || {};
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const codeRef=useRef(null)  // store code fromm editor componenet
  const socketRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await socket();

      socketRef.current.on("connect_error", (err) => handelError(err));
      socketRef.current.on("connect_failed", (err) => handelError(err));

      function handelError(err) {
        console.log("Error: ", err);
        toast.error("Socket connection failed, try agian");
        navigate("/");
      }

      socketRef.current.emit("join", {
        roomId,
        userName,
      });

      socketRef.current.on(
        "joined",
        ({ clients, joinedUserName, socketId }) => {
          if (joinedUserName !== userName) {
            toast.success(`${joinedUserName} had joined`);
          }
            
          setUsers(clients);

          socketRef.current.emit('code_sync',{
            code:codeRef.current,
            socketId,
          })

        }
      );

      socketRef.current.on("disconnected", ({ socketId, LeavingUserName }) => {
        toast(`${LeavingUserName} had left Room`,{
          icon: '⚠️',
        });

        setUsers((pre) => {
          return pre.filter((client) => client.socketId !== socketId);
        });
      });
    };

    init();

    return () => {
      socketRef.current.off("joined");
      socketRef.current.off("disconnected");
      socketRef.current.disconnect();
    };
  }, []);

  

  function leaveRoom() {
    navigate('/');

  }

  async function copyRoomID () {
    
    try{    
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID Copied to Clipboard!");
    }
   
    catch(err){
      toast.error("Failed to copy URL");
      console.log(err)
    }
    
  } 


  if (!location.state) {
    return <Navigate to={"/"} />;
  }

  return (


<div className="bg-websiteBg min-h-screen overflow-hidden flex  flex-col lg:flex-row lg:overflow-hidden lg:w-full lg:h-screen"> 
  <div>
    <Toaster position="top-right" reverseOrder={false} />
  </div>

  <div className=" flex flex-col items-center  lg:w-[23.5vw] lg:py-0 lg:space-y-4"> 
    <div className=" pt-2">
      <HomeHeader returnHome={leaveRoom} />
    </div>

    {/* Render Editor only for mobile */}
    <div className="lg:hidden"> 
      
      <Editor socketRef={socketRef}  roomId={roomId}  
      onCodeChange={(code) => {
          codeRef.current = code;
      }}  
      /> 

    </div>

    <div className=" lg:mt-28 lg:pt-10 lg:pl-0 mr-[3.9px]"> 
      <Connected users={users} />
      <div className="lg:pt-9 lg:mt-40">
        <Button onCopy={copyRoomID} onLeave={leaveRoom} />
      </div>
    </div>
  </div>

  {/* Render Editor only for desktop */}
  <div className=" hidden lg:block lg:w-full"> 
    <Editor socketRef={socketRef} roomId={roomId} 
    onCodeChange={(code) => {
      codeRef.current = code;
    }} 
    /> 
  </div>
</div>
  );
}

export default EditorPage;

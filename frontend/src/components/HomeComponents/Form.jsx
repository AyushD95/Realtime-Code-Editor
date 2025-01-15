import React, { useState } from "react";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const createNewRoom = (e) => {
    e.preventDefault();
    const newRoomId = nanoid(22);

    toast.success("Created New Room!");

    setRoomId(newRoomId);
  };

  const joinRoom = (e) => {
    if (!roomId || !userName) {
      !userName && !roomId
        ? toast.error("Enter Username and Room ID")
        : !userName
        ? toast.error("Enter Username")
        : !roomId
        ? toast.error("Enter Room ID")
        : toast.success("All fields are filled!");

      e.preventDefault();
      return;
    }

    navigate(`/editor/${roomId}`, {
      state: { userName, roomId },
    });
  };



  const handelEnterInput = (e)=>{
    if(e.code==='Enter')
    {
      joinRoom()
    }
  }

  return (
    <div className="bg-black  flex items-center justify-center lg:mt-12 mt-20">
      <div
        className="bg-formBg rounded-3xl lg:rounded-[32px] 
                  font-irish-grover lg:h-[420px] lg:w-96 h-96 
                  w-80  justify-center"
      >
  
          <div className="pt-10">
            <h1 className="ml-8 text-homeText text-xl lg:text-2xl ">
              Enter Room ID
            </h1>
            <div className="flex items-center justify-center ">
              <input
                className="focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:border-blue-500 mt-5 bg-inputBg stroke-websiteBg 
                shadow-black border-1.5 border-websiteBg lg:w-80 lg:h-11 
                w-64 h-9 rounded-3xl lg:px-5 px-3 lg:text-lg"
                type="text"
                onChange={(e) => setRoomId(e.target.value)}
                value={roomId}
                onKeyUp={handelEnterInput}
              />
            </div>
          </div>

          <div className="pt-10">
            <h1 className="ml-8 text-homeText text-xl lg:text-2xl">
              Enter Username
            </h1>
            <div className="flex items-center justify-center ">
              <input
                className="focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:border-blue-500 mt-5 bg-inputBg stroke-websiteBg 
                shadow-black border-1.5 border-websiteBg  lg:w-80 lg:h-11 
                w-64 h-9 rounded-3xl lg:px-5 px-3  lg:text-lg"
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                onKeyUp={handelEnterInput}
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              className="text-xl text-homeText border-1.5 border-websiteBg
              bg-joinBtn lg:h-12 lg:w-28 w-24 h-10 mt-8 lg:mt-9 rounded-3xl 
              cursor-pointer"
              onClick={joinRoom}
            >
              Join
            </button>
          </div>

          <div>
            <h1 className="text-homeText text-sm text-center mt-5 lg:text-lg ">
              Create a{" "}
              <a
                onClick={createNewRoom}
                href=""
                className="text-joinBtn underline"
              >
                new room
              </a>
            </h1>
          </div>
       
      </div>
    </div>
  );
};

export default Form;

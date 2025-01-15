import React, { useEffect, useRef} from "react";
import HomeHeader from "../components/EditorComponents/HomeHeader";
import Editor from "../components/EditorComponents/Editor";
import Connected from "../components/EditorComponents/Connected";
import Button from "../components/EditorComponents/Button";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { Toaster } from 'react-hot-toast';
import  { useNavigate } from 'react-router-dom'
import { socket } from '../socket.js'



function EditorPage ()
{
  
  const socketRef = useRef(null);

  useEffect( () => {

    const init = async()=>{

      socketRef.current =  await socket()
      socketRef.current.emit("new", "hi");

  
    }

    init()
    
  }, []);


  const location = useLocation();
  const { userName, roomId } = location.state || {};
  const users = [
    "Ayush Dahiwale",
    "Kunal Kundra",
    "Danni Daniels",
    "Priya Chopra",
    "Emiliy Wills",
  ];


  const navigate = useNavigate()
  const returnHome =()=>{
     navigate("/")
     return ;
  }



  const copyUrl = () => {
    // const currentUrl = window.location.href;
    navigator.clipboard.writeText(roomId)
      .then(() => {
        toast.success("Room ID Copied!");
        ;
      })
      .catch((err) => {
        toast.error("Failed to copy URL: ", err);
      });
  };
  

 
  


  

  useEffect(() => {
    toast.success(`Welcome ${userName}`);
  }, []);



  return (
    <div className="bg-websiteBg min-h-screen overflow-y-hidden flex flex-col lg:flex-row lg:overflow-hidden lg:w-100vw lg:h-100vh ">
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>

      <div className="flex flex-col items-center lg:w-[23.5vw]  lg:py-0 lg:space-y-4">
        <div className="pt-2">
          <HomeHeader returnHome={returnHome}/>
        </div>
        <div className="lg:hidden lg:h-100%">
          <Editor />
        </div>

        <div className="lg:mt-28 lg:pt-10 lg:pl-0 mr-[3.9px]">
          <Connected users={users} />
          <div className="lg:pt-9 lg:mt-40">
            <Button onCopy={copyUrl} onLeave={returnHome}/>
          </div>
        </div>
      </div>


      <div className=" hidden  sm:block lg:order-none ">
        <Editor />
      </div>
    </div>
  );
};

export default EditorPage;

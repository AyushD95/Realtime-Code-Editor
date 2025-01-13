import React from "react";
import HomeHeader from "../components/EditorComponents/HomeHeader";
import Editor from "../components/EditorComponents/Editor";
import Connected from "../components/EditorComponents/Connected";
import Button from "../components/EditorComponents/Button";

const EditorPage = () => {

  const users = [
    "Ayush Dahiwale",
    "Kunal Kundra",
    "Danni Daniels",
    "Priya Chopra",
    "Emiliy Wills",
  ];

  return (
    <div className="bg-websiteBg min-h-screen overflow-y-hidden flex flex-col lg:flex-row lg:overflow-hidden lg:w-100vw lg:h-100vh ">
      {/* Left Column: HomeHeader, Connected, Button */}
      <div className="flex flex-col items-center lg:w-[23.5vw]  lg:py-0 lg:space-y-4">
        
        <div className="pt-2">
        <HomeHeader />
        </div>
        <div className="lg:hidden lg:h-100%">
        <Editor/>
        </div>


        <div className="lg:mt-28 lg:pt-10 lg:pl-0 mr-[3.9px]">
        <Connected users={users} />
        <div className="lg:pt-9 lg:mt-40">
        <Button />
        </div>
        </div>
      </div>
  
      {/* Right Column: Editor */}
      <div className=" hidden  sm:block lg:order-none ">
      
        <Editor />
      </div>
    </div>
  );
  
};

export default EditorPage;

import React from "react";
import HomeHeader from "../components/EditorComponents/HomeHeader";
import Editor from "../components/EditorComponents/Editor";
import Chat from "../components/EditorComponents/Chat";
import Connected from "../components/EditorComponents/Connected";

const EditorPage = () => {
  return (
    <div className=" bg-websiteBg min-h-screen overflow-y-hidden">
      <HomeHeader/>
      <Editor/>
      <Connected/>
    </div>
  );
};

export default EditorPage;

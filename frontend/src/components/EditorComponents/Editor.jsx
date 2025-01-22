import React, { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

const Editor = ({socketRef,roomId, onCodeChange}) => {
  const editorRef = useRef(null);

  useEffect(() => {
    async function init() {

      editorRef.current =  Codemirror.fromTextArea(editorRef.current, {
        mode: { name: "javascript", json: true },
        theme: "dracula",
        utoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      });

      
      editorRef.current.on('change',(instance, changes)=>{
        console.log(changes)
        const {origin}=changes
        const code =instance.getValue()
        onCodeChange(code)
        if(origin !=='setValue')
        {
          socketRef.current.emit('code_change',{
            roomId,
            code,
          })
        }
      })


     

    }



    init();
  }, []);


  
  useEffect(()=>{

    if(socketRef.current)
    {
      const editor = editorRef.current;
      socketRef.current.on('code_change',({code})=>{
        if(code !== null)
        {
          
          editorRef.current.setValue(code)

          
        }
      })
    }

    //celeaning function
    return()=>{
      socketRef.current.off('code_change')
    }

  },[socketRef.current])


  return <textarea id="realtimeEditor" ref={editorRef}></textarea>;
};

export default Editor;

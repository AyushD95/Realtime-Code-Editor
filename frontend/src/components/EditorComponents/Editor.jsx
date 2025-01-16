import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';

const Editor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const editor = Codemirror.fromTextArea(
        editorRef.current,
        {
          mode: { name: 'javascript', json: true },
          theme: 'dracula',
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,

        }
      );
    }
  }, []);

  return (
    <textarea 
      id="realtimeEditor" 
      ref={editorRef} 
      className="" 
    />
  );
};

export default Editor;




// import React, { useEffect, useRef } from 'react';
// import Codemirror from 'codemirror';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/dracula.css';
// import 'codemirror/mode/javascript/javascript';
// import 'codemirror/addon/edit/closetag';
// import 'codemirror/addon/edit/closebrackets';

// const Editor = () => {
//     useEffect(() => {
//         async function init() {
//            Codemirror.fromTextArea(
//                 document.getElementById('realtimeEditor'),
//                 {
//                     mode: { name: 'javascript', json: true },
//                     theme: 'dracula',
//                     autoCloseTags: true,
//                     autoCloseBrackets: true,
//                     lineNumbers: true,
//                 }
//             );

//         }
//         init();
 

   
       
//     }, []);

//     return (
//       <textarea
        
//         id="realtimeEditor"
//         className=""
//       />
//     );
//     };

// export default Editor;







// import React, { useEffect, useRef } from "react";
// import { useCodeMirror } from "@uiw/react-codemirror";
// import { javascript } from "@codemirror/lang-javascript";
// import { material } from "@uiw/codemirror-theme-material";

// export default function Editor() {
 


//   const extensions = [javascript({ jsx: true })];
//   const editor = useRef(null);

//   const getContainerHeight = () => {
//     return window.innerWidth <= 768 ? "70vh" : "100vh";
//   };

//   const { setContainer } = useCodeMirror({
//     container: editor.current,
//     value: "console.log('hello world!');",
//     theme: material,
//     fontSize: "20px",
//     extensions,
//     width: "100vw", // Force 100vw
//     height: getContainerHeight(),
//     minHeight: "fit-content",
//     maxHeight: "100vh",
//     autoFocus: false,
//     placeholder: "Enter script here",
//     editable: true,
//     readOnly: false,
//   });

//   useEffect(() => {
//     const handleResize = () => {
//       if (editor.current) {
//         setContainer(editor.current);
//       }
//     };

//     if (editor.current) {
//       setContainer(editor.current);
//     }

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

  
//   return (
//     <div style={{ height: "fit-content" }}>
//       <div ref={editor} className="lg:text-base text-[0.8rem]" style={{ width: "100vw" }} />
//     </div>
//   );
// }











































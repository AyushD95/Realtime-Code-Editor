import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import EditorPage from "./pages/editorPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor/:roomId" element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

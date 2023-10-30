
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home.js'
import About from './components/About.js';
import NotesState from './context/notes/NoteState';
import Login from './components/Login.js';
import Signup from './components/Signup';
function App() {
  return (
    <>
    <NotesState>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
            </Routes>
        </BrowserRouter>
    </NotesState>
    </>
  );
}

export default App;

import "./App.css";
// IMPORT para as rotas
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import PageHome from "./pages/PageHome";
import PageAbout from "./pages/PageAbout";
import PageProjects from "./pages/PageProjects";
import PageDetailsProject from "./pages/PageDetailsProject";
import PageAlunos from "./pages/PageAlunos";
import PageDetailsAluno from "./pages/PageDetailsAluno";

import PageError from "./pages/PageError";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Toaster />
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/about" element={<PageAbout />} />
        <Route path="/projects" element={<PageProjects />} />
        <Route path="/projects/:projectID" element={<PageDetailsProject />} />

        <Route path="/alunos" element={<PageAlunos />} />
        <Route path="/aluno/:alunoID" element={<PageDetailsAluno />} />

        <Route path="*" element={<PageError />} />
      </Routes>
    </div>
  );
}

export default App;

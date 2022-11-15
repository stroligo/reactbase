import { Link } from "react-router-dom";
function NavBar() {
  return (
    <section>
      <h4>NavBar</h4>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>
        <Link to="/projects">
          <li>Projects</li>
        </Link>
        <Link to="/projects/:projectID">
          <li>Detail Project</li>
        </Link>
        <Link to="/alunos">
          <li>API - Alunos</li>
        </Link>
      </ul>
    </section>
  );
}

export default NavBar;

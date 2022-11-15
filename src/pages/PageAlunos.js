import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function PageAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [filterAlunos, setFilterAlunos] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [reload, setReload] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    idade: "",
    cidade: "",
    estado: "",
    profissao: "",
    hobby: "",
    signo: "",
  });
  console.log(form);

  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get(
        `https://ironrest.herokuapp.com/enap-teste/`
      );
      setAlunos(response.data);
    }
    fetchUser();
  }, [reload]);

  function handleReload() {
    setReload(!reload);
    toast.success("Pagina Atualizada");
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await axios.post("https://ironrest.herokuapp.com/enap-teste/", form);

    setForm({
      nome: "",
      idade: "",
      cidade: "",
      estado: "",
      profissao: "",
      hobby: "",
      signo: "",
    });

    handleReload();
    setShowForm(false);
    toast.success("Aluno adicionado com sucesso!");
  }

  return (
    <div>
      <section>
        <label>Buscar por nome:</label>
        <input
          type="text"
          onChange={(search) => setFilterAlunos(search.target.value)}
        />
      </section>
      <section>
        <button
          onClick={() => {
            setShowForm(!showForm);
          }}
        >
          Criar novo usuario
        </button>

        {showForm && (
          <forms>
            <label>name</label>
            <input
              type="text"
              name="nome"
              onChange={handleChange}
              value={form.nome}
            />
            <label>idade</label>
            <input
              type="text"
              name="idade"
              onChange={handleChange}
              value={form.idade}
            />
            <label>cidade</label>
            <input
              type="text"
              name="cidade"
              onChange={handleChange}
              value={form.cidade}
            />
            <label>estado</label>
            <input
              type="text"
              name="estado"
              onChange={handleChange}
              value={form.estado}
            />
            <label>profissao</label>
            <input
              type="text"
              name="profissao"
              onChange={handleChange}
              value={form.profissao}
            />
            <label>hobby</label>
            <input
              type="text"
              name="hobby"
              onChange={handleChange}
              value={form.hobby}
            />
            <label>signo</label>
            <input
              type="text"
              name="signo"
              onChange={handleChange}
              value={form.signo}
            />
            <button onClick={handleSubmit}>SALVAR ALUNO</button>
            <button onClick={handleReload}>Recarregar api!!</button>
          </forms>
        )}
      </section>
      <section>
        <h4>Todos os Alunos</h4>
        {alunos
          .filter((aluno) =>
            aluno.nome.toLowerCase().includes(filterAlunos.toLowerCase())
          )
          .map((aluno) => {
            return (
              <div key={aluno.nome}>
                <div>
                  <Link to={`/aluno/${aluno._id}`}>
                    <p>ID: {aluno._id}</p>
                  </Link>
                  <p>Name: {aluno.nome}</p>
                  <p>Idade: {aluno.idade}</p>
                  <p>Cidade: {aluno.cidade}</p>
                  <p>Estado: {aluno.estado}</p>
                  <p>Profissão: {aluno.profissao}</p>
                  <p>Hobby: {aluno.hobby}</p>
                  <p>Signo: {aluno.signo}</p>
                </div>
              </div>
            );
          })}
      </section>
    </div>
  );
}

export default PageAlunos;

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function PageDetailsAluno() {
  const { alunoID } = useParams();
  const navigate = useNavigate();

  const [reload, setReload] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [aluno, setAluno] = useState({});
  const [form, setForm] = useState({
    nome: "",
    idade: "",
    cidade: "",
    estado: "",
    profissao: "",
    hobby: "",
    signo: "",
  });

  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get(
        `https://ironrest.herokuapp.com/enap-teste/${alunoID}`
      );
      setAluno(response.data);
      setForm(response.data);
    }
    fetchUser();
  }, [reload]);

  async function handleDelete(e) {
    await axios.delete(`https://ironrest.herokuapp.com/enap-teste/${alunoID}`);
    navigate("/alunos");
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      //clonar o state para um obj JS
      const clone = { ...form };
      //deletar a chave _id do obj
      delete clone._id;

      await axios.put(
        `https://ironrest.herokuapp.com/enap-teste/${alunoID}`,
        clone
      );
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <section>
        {showForm && (
          <form>
            <div>
              <label>Nome</label>
              <input
                type="text"
                onChange={handleChange}
                name="nome"
                value={form.nome}
              />
            </div>

            <div>
              <label>Idade</label>
              <input
                type="text"
                onChange={handleChange}
                name="idade"
                value={form.idade}
              />
            </div>

            <div>
              <label>Cidade</label>
              <input
                type="text"
                onChange={handleChange}
                name="cidade"
                value={form.cidade}
              />
            </div>
            <div>
              <label>Estado</label>
              <input
                type="text"
                onChange={handleChange}
                name="estado"
                value={form.estado}
              />
            </div>
            <div>
              <label>Signo</label>
              <input
                type="text"
                onChange={handleChange}
                name="signo"
                value={form.signo}
              />
            </div>
            <div>
              <label>Profissão</label>
              <input
                type="text"
                onChange={handleChange}
                name="profissao"
                value={form.profissao}
              />
            </div>

            <div>
              <label>Hobby</label>
              <input
                type="text"
                onChange={handleChange}
                name="hobby"
                value={form.hobby}
              />
            </div>

            <button onClick={handleSubmit}>Salvar aluno</button>
          </form>
        )}
        {!showForm && (
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
        )}

        <button onClick={handleDelete}>Deletar usuário!</button>

        <button
          onClick={() => {
            setShowForm(!showForm);
          }}
        >
          Editar usuário!
        </button>
      </section>
    </div>
  );
}

export default PageDetailsAluno;

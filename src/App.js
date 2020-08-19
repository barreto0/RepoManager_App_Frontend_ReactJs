import React, {useState, useEffect} from "react";
import api from "./services/api"

import "./styles.css";

function App() {

  const [repos, setRepos] = useState([]);

  useEffect(()=>{
    api.get("/repositories").then(response =>{
      setRepos(...repos, response.data);
    });
  },[]);

  async function handleAddRepository() {
    //fazer post na api
    const response = await api.post("/repositories",{
      title: `Desafio ${Date.now()}`,
      url: "www.repositorio.com",
      techs: [
        "Javascript",
        "HTML", 
        "CSS"
      ]
    });

    const repo = response.data;

    setRepos([...repos, repo]);
  }

  async function handleRemoveRepository(id) {
    
    const response = await api.delete(`/repositories/${id}`);

    if(response.status === 204){
      const newRepos = repos.filter(repo => repo.id !== id);
      setRepos(newRepos);
     
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repos.map(repo => 
        <li key={repo.id}>
          {repo.title}
          <span style={{paddingLeft: 10}}>{repo.url}</span>
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>)}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

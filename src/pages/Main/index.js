import React, { Component } from "react";
import { FaGithubAlt, FaPlus, FaSpinner } from "react-icons/fa";
import { Link } from 'react-router-dom';

import api from "../../services/api";

import Container from '../../components/Container';
import { Form, SubmitButton, List } from "./styles";

class Main extends Component {
  state = {
    newRepo: "",
    repositories: [],
    loading: 0,
    error: 0,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({repositories: JSON.parse(repositories)});
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = (e) => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { newRepo, repositories } = this.state;

    this.setState({ loading: 1 });

    await api.get(`/repos/${newRepo}`)
    .then((response) => {
      const data = {
        id: response.data.id,
        name: response.data.full_name,
        avatar_url: response.data.owner.avatar_url,
      }

      this.setState({
        repositories: [...repositories, data],
        newRepo: "",
        loading: 0,
        error: 0,
      });
    })
    .catch((error) => {
      console.log(error);

      this.setState({
        newRepo: "",
        error: 1,
        loading: 0,
      });
    });
  };

  render() {    
    const { newRepo, loading, repositories, error } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Ropositórios
        </h1>

        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Adicionar repositório (ex: user/repo-name)"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          { repositories.map(repo => (
            <li key={repo.id} >
              <div>
                <img src={repo.avatar_url} alt="Avatar"/>
                <span> {repo.name} </span>
              </div>
              <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

export default Main;

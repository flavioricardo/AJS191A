import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";

export default class ListarContatos extends Component {
  static propTypes = {
    contatos: PropTypes.array.isRequired,
    onDeleteContato: PropTypes.func.isRequired
  };

  state = {
    query: ""
  };

  updateQuery = query => {
    this.setState({ query: query.trim() });
  };

  clearQuery = () => {
    this.setState({ query: "" });
  };

  render() {
    const { contatos, onDeleteContato } = this.props;
    const { query } = this.state;

    let showingContatos;
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      showingContatos = contatos.filter(contact => match.test(contact.name));
    } else {
      showingContatos = contatos;
    }

    showingContatos.sort(sortBy("name"));

    return (
      <div className="list-contatos">
        <div className="list-contatos-top">
          <input
            className="search-contatos"
            type="text"
            placeholder="Buscar contatos"
            value={query}
            onChange={event => this.updateQuery(event.target.value)}
          />
          <Link to="/create" className="add-contact">
            Adicionar Contato
          </Link>
        </div>

        {showingContatos.length !== contatos.length && (
          <div className="showing-contatos">
            <span>
              Mostrando {showingContatos.length} de {contatos.length}
            </span>
            <button onClick={this.clearQuery}>Mostrar todos</button>
          </div>
        )}

        <ol className="contact-list">
          {showingContatos.map(contact => (
            <li key={contact.id} className="contact-list-item">
              <div
                className="contact-avatar"
                style={{
                  backgroundImage: `url(${contact.avatarURL})`
                }}
              />
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button
                onClick={() => onDeleteContato(contact)}
                className="contact-remove"
              >
                Remover
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

import React, { Component } from "react";
import { Route } from "react-router-dom";
import ListarContatos from "./ListarContatos";
import * as ContatosAPI from "./utils/ContatosAPI";
import CriarContato from "./CriarContato";

export default class App extends Component {
  state = {
    screen: "list",
    contatos: []
  };

  componentDidMount() {
    ContatosAPI.getAll().then(contatos => {
      this.setState({ contatos });
    });
  }
  removeContato = contact => {
    this.setState(state => ({
      contatos: this.state.contatos.filter(c => c.id !== contact.id)
    }));
    ContatosAPI.remove(contact);
  };

  createContato(contact) {
    ContatosAPI.create(contact).then(contact => {
      this.setState(state => ({
        contatos: state.contatos.concat([contact])
      }));
    });
  }

  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <ListarContatos
              onDeleteContato={this.removeContato}
              contatos={this.state.contatos}
              onNavigate={() => {
                this.setState({ screen: "create" });
              }}
            />
          )}
        />
        <Route
          path="/create"
          render={({ history }) => (
            <CriarContato
              onCriarContato={contact => {
                this.createContato(contact);
                history.push("/");
              }}
            />
          )}
        />
      </div>
    );
  }
}

import React, { Component } from "react";
import serializeForm from "form-serialize";
import ImageInput from "./utils/ImageInput";

export default class CriarContato extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    if (this.props.onCriarContato) this.props.onCriarContato(values);
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="create-contact-form">
          <ImageInput
            className="create-contact-avatar-input"
            name="avatarURL"
            maxHeight={64}
          />
          <div className="create-contact-details">
            <input type="text" name="name" placeholder="Nome" />
            <input type="text" name="email" placeholder="E-mail" />
            <button>Adicionar Contato</button>
          </div>
        </form>
      </div>
    );
  }
}

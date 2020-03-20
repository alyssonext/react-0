import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import Tabela from '../../Components/Tabela/Tabela';
import './../Home/Home.css';
import Formulario from '../../Components/Formulario/Formulario';
import Header from '../../Components/Header/Header';
import PopUp from '../../Utils/PopUp';
import ApiService from '../../Utils/ApiService';
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      autores: [],
    }

  }



  removeAutor = (id) => {
    const { autores } = this.state;

    const autoresAtualizados = autores.filter((autor) => {
      return autor.id !== id;
    }); 
    ApiService.RemoveAutor(id)
        .then(res => {
        if(res.message === 'deleted'){
          this.setState({autores: [...autoresAtualizados]});
          PopUp.exibeMensagem('error', 'Autor removido com sucesso!')
        }
      })
      .catch(err => PopUp.exibeMensagem('error', 'Erro na comunicação com a API ao tentar remover o autor'))   
    
  
  }


  escutadorDeSubmit = autor => {

    ApiService.CriaAutor(JSON.stringify(autor))
        .then(res => {
        if (res.message ==='success'){
          this.setState({ autores: [...this.state.autores, autor] });
          PopUp.exibeMensagem('success', 'Autor adicionado com sucesso!')
        }       
      })
      .catch(err => PopUp.exibeMensagem('error', 'Erro na comunicação com a API na hora de adicionar autor'))
     

  }

  componentDidMount() {
    ApiService.ListaAutores()
          .then(res => {
          if(res.message === 'success'){
            this.setState({ autores: [...this.state.autores, ...res.data] })
            PopUp.exibeMensagem('success', 'Obras exibidas com sucesso!')
          }
      })
      .catch(err => PopUp.exibeMensagem('error', 'Erro ao conectar a API para obter lista'))
  }

  render() {
    return (
      <Fragment>

        <Header />
        <div className="container mb-10">
          <h1>Catálogo de Obras</h1>
          <Tabela autores={this.state.autores} removeAutor={this.removeAutor} />
          <Formulario escutadorDeSubmit={this.escutadorDeSubmit} />
        </div>
      </Fragment>
    );
  }


}

export default App;

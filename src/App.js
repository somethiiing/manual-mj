import React from 'react';
import axios from 'axios';
import './App.css';

import Admin from './components/admin';
import Game from './components/game';

let username = 'admin';
let password = 'thisisthepassword'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // home, playerLogin, adminLogin, game, admin
      currentPage: 'home',
      nameField: 'wilson',
      playerSelection: 'player1',
      adminName: '',
      adminPassword: ''
    };

    this.renderHome = this.renderHome.bind(this);
    this.renderPlayerLogin = this.renderPlayerLogin.bind(this);
    this.renderAdminLogin = this.renderAdminLogin.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleAdminLogin = this.handleAdminLogin.bind(this);
    this.handlePlayerLogin = this.handlePlayerLogin.bind(this);
  }

  handleOnChange(e, field) {
    let temp = {};
    temp[field] = e.target.value;
    this.setState(temp);
  }

  handleAdminLogin(e) {
    e.preventDefault();
    if (this.state.adminName === username && this.state.adminPassword === password) {
        this.setState({currentPage: 'admin'});
      } else {
        alert('wrong login info');
      }
  }

  handlePlayerLogin(e) {
    e.preventDefault();
    this.setState({currentPage: 'game'})
  }

  renderHome() {
    return (
      <div style={{height: '100%'}}>
        <h1 style={{height:'50px', display: 'flex', justifyContent: 'center'}}>HOME</h1>
        <div style={{
          height: '100%'}}>
          <button
            class='bigButton'
            style={{backgroundColor: '#6796de'}}
            onClick={ () => this.setState({currentPage: 'playerLogin'})}
          >PLAYER</button>
          <button
            class='bigButton'
            style={{backgroundColor: '#5878aa'}}
            onClick={ () => this.setState({currentPage: 'adminLogin'})}
          >ADMIN</button>
        </div>
      </div>
    )
  }

  renderPlayerLogin() {
    let playerList = ['player1', 'player2', 'player3', 'player4'];
    return (
      <div>
        <form onSubmit={this.handlePlayerLogin}>
          <input onChange={(e) => this.handleOnChange(e, 'nameField')} placeholder='type name here'></input>
          <select onChange={(e) => this.handleOnChange(e, 'playerSelection')} >
            {playerList.map( player => <option key={player} value={player}>{player}</option>)}
          </select>
          <button>join game</button>
        </form>
      </div>
    );
  }

  renderAdminLogin() {
    return (
      <form onSubmit={this.handleAdminLogin}>
        <input
          placeholder='user'
          value={this.state.adminName}
          onChange={( e => {this.handleOnChange(e, 'adminName')})}
        ></input>
        <input
          placeholder='password'
          type='password'
          value={this.state.adminPassword}
          onChange={( e => {this.handleOnChange(e, 'adminPassword')})}
        ></input>
        <button>login</button>
      </form>
    )
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        {this.state.currentPage === 'home' && this.renderHome()}
        {this.state.currentPage === 'playerLogin' && this.renderPlayerLogin()}
        {this.state.currentPage === 'game' && <Game
          currentPlayer={this.state.playerSelection}
          playerName={this.state.nameField}
          changePage={() => this.setState({currentPage: 'admin'})}
        />}
        {this.state.currentPage === 'adminLogin' && this.renderAdminLogin()}
        {this.state.currentPage === 'admin' && <Admin />}
      </div>
    );
  }
}

export default App;

import React from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const tempServer = 'http://localhost:5000'

let socket;

export default class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appState: {},
      showResetStateButton: false,
      playerDrawSelect: 'player1',
    };

    this.submitBoardChange = this.submitBoardChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
  }

  componentDidMount() {
    socket = io(`${tempServer}/`);

    socket.on('UPDATE_STATE', data => this.setState({appState: data}));
    axios.get(`${tempServer}/api/getState`)
      .then(data => {
        this.setState({appState: data.data.state});
      });
  }

  submitBoardChange(e, type) {
    e.preventDefault();
    let temp = {};

    switch(type) {
      case 'FRONT_DRAW':
      case 'BACK_DRAW':
        temp.data = {player: this.state.playerDrawSelect}
        break;
      default:
        break;
    }
    temp.type = type;

    axios.post(`${tempServer}/api/updateGame`, temp)
  }

  handleInputChange(e, type) {
    let temp = {};
    temp[type] = e.target.value;
    this.setState(temp)
  }

  toggleButton(e, type) {
    let temp = {};
    temp[type] = !this.state[type];
    this.setState(temp);
  }

  render() {
    return (
      <div>
        <h1>ADMIN PAGE</h1>
        <div style={{display: 'flex'}}>
          <div style={{display: 'flex', flexDirection: 'column', width: '50%', padding: '25px'}}>
            <div style={{display: 'flex', flexDirection: 'column'}} >
              <button onClick={e => this.submitBoardChange(e, 'ASSIGN_SEATS')}>ASSIGN SEATS</button>
              <br />
              <button onClick={e => this.submitBoardChange(e, 'INC_DEALER')}>INCREMENT DEALER</button>
              <button onClick={e => this.submitBoardChange(e, 'DEC_DEALER')}>DECREMENT DEALER</button>
              <button onClick={e => this.submitBoardChange(e, 'INC_ROUND')}>INCREMENT ROUND</button>
              <button onClick={e => this.submitBoardChange(e, 'DEC_ROUND')}>DECREMENT ROUND</button>
              <br />
              <div style={{height: 'auto', display: 'flex', justifyContent: 'space-around'}}>
                <select style={{width: '100px'}} onChange={e => this.handleInputChange(e, 'playerDrawSelect')}>
                  {['player1', 'player2', 'player3', 'player4'].map( player => {
                    return <option value={player}>{player}</option>
                  })}
                </select>
                <button onClick={e => this.submitBoardChange(e, 'FRONT_DRAW')}>FRONT DRAW</button>
                <button onClick={e => this.submitBoardChange(e, 'BACK_DRAW')}>BACK DRAW</button>
              </div>
              <br />
              <button onClick={e => this.submitBoardChange(e, 'SHUFFLE_DECK')}>SHUFFLE DECK</button>
              <button onClick={e => this.submitBoardChange(e, 'ROLL_DICE')}>ROLL DICE</button>
              <button onClick={e => this.submitBoardChange(e, 'CUT_WALL')}>CUT WALL</button>
              <button onClick={e => this.submitBoardChange(e, 'DEAL_TILES')}>DEAL TILES</button>
              <button onClick={e => this.submitBoardChange(e, 'RESET_DECK')}>RESET DECK</button>
              <br />
              <button onClick={e => this.toggleButton(e, 'showResetStateButton')}>TOGGLE RESET STATE</button>
              {this.state.showResetStateButton &&
                <button
                  style={{border: '1px solid red'}}
                  onClick={e => this.submitBoardChange(e, 'RESET_STATE')}>RESET STATE
                </button>}
            </div>
          </div>

          <div style={{width: '50%', borderLeft: '1px solid black', paddingLeft: '25px', overflowY: 'scroll'}}>
            { <pre>{JSON.stringify(this.state, null, 4)}</pre> }
          </div>
        </div>
      </div>
    )
  }
};

// reset whole game

// assign seats
// find starting person
// assign first dealer


// assign winner
import React from 'react';
import axios from 'axios';
import io from 'socket.io-client';

import { wrapArray } from './utils';

const tempServer = 'http://localhost:5000'

let socket;

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameInfo: {
        round: 1,
        seatOrder: ['player1', 'player2', 'player3', 'player4'],
        roll: 0,
        dealer: '',
        discard: [],
        deck: []
      },
      players: {
        player1: {
          name: '',
          waiting: false,
          hand: ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8',],
          outsideTiles: ['F1', 'F2', 'F3', 'F4'],
          hiddenOutsideTiles: ['F1', 'F2', 'F3', 'F4']
        },
        player2: {
          name: '',
          waiting: false,
          hand: [1,2,3,4,5,6,7,8],
          outsideTiles: ['F1', 'F2', 'F3', 'F4'],
          hiddenOutsideTiles: ['F1', 'F2', 'F3', 'F4']
        },
        player3: {
          name: '',
          waiting: false,
          hand: [1,2,3,4,5,6,7,8],
          outsideTiles: ['F1', 'F2', 'F3', 'F4'],
          hiddenOutsideTiles: ['F1', 'F2', 'F3', 'F4']
        },
        player4: {
          name: '',
          waiting: false,
          hand: [1,2,3,4,5,6,7,8],
          outsideTiles: ['F1', 'F2', 'F3', 'F4'],
          hiddenOutsideTiles: ['F1', 'F2', 'F3', 'F4']
        }
      }
    };

    /*
    props:
    currentPlayer
    playerName
    */
  }

  componentDidMount() {
    socket = io(`${tempServer}/`);

    // socket.on('UPDATE_STATE', data => {
    //   let { gameInfo, players } = data;
    //   this.setState({players, gameInfo});
    // });
    // axios.get(`${tempServer}/api/getState`)
    //   .then(data => {
    //     let { gameInfo, players } = data.data.state;
    //     this.setState({players, gameInfo});
    //   });
  }

  render() {
    window.state = () => console.log(this.state);
    window.props = () => console.log(this.props);
    const { gameInfo, players } = this.state;
    const { currentPlayer, playerName } = this.props;
    const { round, seatOrder, roll, dealer, discard, deck } = gameInfo;
    const { name, waiting, hand, outsideTiles, hiddenOutsideTiles } = players[currentPlayer];

    const currInd = seatOrder.indexOf(currentPlayer);
    const wrappedArray = wrapArray(seatOrder, currInd);
    console.log(wrappedArray)
    return (
      <div style={{display: 'flex'}}>
        <div style={{display: 'flex', flexDirection: 'column', width: '75%'}}>
          {/* top */}
          <div style={{
            display: 'flex', height: '25%',
            alignItems: 'center', borderBottom: '1px solid black'}}>
            <div style={{width: '25%', height: '100%', borderRight: '1px solid black'}}></div>
            <div style={{display: 'flex', flexDirection: 'column', width: '50%', height: '100%', justifyContent: 'space-evenly', alignItems: 'center'}}>
              <h4>Concealed</h4>
              <div style={{display: 'flex', height: '40px'}}>
                {players[wrappedArray[1]].hand.map(tile =>
                  <img style={{height: '40px', border: '1px solid black', marginRight: '1px'}}
                    src={`./images/back.jpg`} />)}
              </div>
              <h4>Revealed</h4>
              <div style={{display: 'flex', height: '40px'}}>
                <div>
                  {players[wrappedArray[1]].hiddenOutsideTiles.map(() =>
                    <img style={{height: '40px', border: '1px solid black', marginRight: '1px'}}
                      src={`./images/back.jpg`} />)}
                  {players[wrappedArray[1]].outsideTiles.map(tile =>
                    <img style={{height: '40px', border: '1px solid black', marginRight: '1px'}}
                      src={`./images/${tile}.jpg`} />)}
                </div>
              </div>
            </div>
            <div style={{width: '25%', height: '100%', borderLeft: '1px solid black'}}></div>
          </div>
          {/* middle */}
          {/* LEFT PERSON */}
          <div style={{height: '50%', display: 'flex'}}>
            <div style={{width: '25%', borderRight: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <h4 style={{transform: 'rotate(270deg)'}}>Concealed</h4>
              <div style={{display: 'flex', width: '40px', height: '40px', justifyContent: 'center', transform: 'rotate(270deg)'}}>
                {players[wrappedArray[0]].hand.map(() =>
                  <img style={{height: 'fit-content', height: '40px', border: '1px solid black', marginRight: '1px'}}
                    src={`./images/back.jpg`} />)}
              </div>
              <h4 style={{transform: 'rotate(270deg)'}}>Revealed</h4>
              <div style={{display: 'flex', width: '40px', height: '40px', justifyContent: 'center', transform: 'rotate(270deg)'}}>
                {players[wrappedArray[0]].hiddenOutsideTiles.map(() =>
                  <img style={{height: 'fit-content', height: '40px', border: '1px solid black', marginRight: '1px'}}
                    src={`./images/back.jpg`} />)}
                {players[wrappedArray[0]].outsideTiles.map(tile =>
                  <img style={{height: 'fit-content', height: '40px', border: '1px solid black', marginRight: '1px'}}
                    src={`./images/${tile}.jpg`} />)}
                </div>
              </div>

            <div className='centerSpacer' style={{width: '50%'}}></div>
            
            {/* RIGHT PERSON */}
            <div style={{width: '25%', borderLeft: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <div style={{display: 'flex', width: '40px', height: '40px', justifyContent: 'center', transform: 'rotate(90deg)'}}>
                {players[wrappedArray[3]].hiddenOutsideTiles.map(() =>
                  <img style={{height: 'fit-content', height: '40px', border: '1px solid black', marginRight: '1px'}}
                    src={`./images/back.jpg`} />)}
                {players[wrappedArray[3]].outsideTiles.map(tile =>
                  <img style={{height: 'fit-content', height: '40px', border: '1px solid black', marginRight: '1px'}}
                    src={`./images/${tile}.jpg`} />)}
                </div>
              <h4 style={{transform: 'rotate(90deg)'}}>Revealed</h4>
              <div style={{display: 'flex', width: '40px', height: '40px', justifyContent: 'center', transform: 'rotate(90deg)'}}>
                {players[wrappedArray[3]].hand.map(() =>
                  <img style={{height: 'fit-content', height: '40px', border: '1px solid black', marginRight: '1px'}}
                    src={`./images/back.jpg`} />)}
              </div>
              <h4 style={{transform: 'rotate(90deg)'}}>Concealed</h4>
            </div>
          </div>
          {/* bottom */}
          <div style={{
            display: 'flex', height: '25%',
            alignItems: 'center', borderTop: '1px solid black'}}>
            <div style={{width: '25%', height: '100%', borderRight: '1px solid black'}}></div>
            <div style={{display: 'flex', flexDirection: 'column', width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '50%', justifyContent: 'space-around', alignItems: 'center'}}>
                <h4>Revealed</h4>
                <div style={{display: 'flex', height: '50%'}}>
                  <div>{hiddenOutsideTiles.map(() => <img style={{height: '40px', border: '1px solid black', marginRight: '1px'}} src={`./images/back.jpg`} />)}</div>
                  <div style={{display: 'flex', height: '50%'}}>
                    {outsideTiles.map(tile => {
                      return(
                        <img
                        style={{display: 'flex', height: '40px', border: '1px solid black', marginRight: '1px'}}
                        src={`./images/${tile}.jpg`} />
                        );
                      })}
                </div>
                </div>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '50%', justifyContent: 'space-around', alignItems: 'center'}}>
                <h4>Concealed</h4>
                <div style={{display: 'flex', height: '50%'}}>
                  {hand.map(tile => {
                    return(
                      <img
                      style={{display: 'flex', height: '40px', border: '1px solid black', marginRight: '1px'}}
                      src={`./images/${tile}.jpg`} />
                      );
                    })}
                </div>
              </div>
            </div>
            <div style={{width: '25%', height: '100%', borderLeft: '1px solid black'}}></div>
          </div>
        </div>

        <div style={{borderLeft: '1px solid black', width: '25%'}}>
          <div style={{height: '50%', borderBottom: '1px solid black'}}>
            info
            <button onClick={this.props.changePage}>admin</button>
          </div>

          <div style={{height: '50%'}}>
            <h3>Action Area</h3>
          </div>

        </div>
      </div>
    )
  }
};

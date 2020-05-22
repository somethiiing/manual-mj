const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT);
const io = require('socket.io').listen(server);

const deepMerge = require('deepmerge')

// const { deepMerge } = require('./utils');
const { tiles, shuffle, setStartingPosition,
  resetDeck, rollDice, resetPlayerHands, dealTiles, drawTile } = require('./tiles');

app
  .use(cors())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, 'build')));

const defaultState = {
  gameInfo: {
    round: 1,
    seatOrder: ['player1', 'player2', 'player3', 'player4'],
    roll: 0,
    dealer: 0,
    discard: [],
    deck: tiles.slice(0),
  },
  players: {
    player1: {
      name: '',
      waiting: false,
      hand: [],
      outsideTiles: [],
      hiddenOutsideTiles: []
    },
    player2: {
      name: '',
      waiting: false,
      hand: [],
      outsideTiles: [],
      hiddenOutsideTiles: []
    },
    player3: {
      name: '',
      waiting: false,
      hand: [],
      outsideTiles: [],
      hiddenOutsideTiles: []
    },
    player4: {
      name: '',
      waiting: false,
      hand: [],
      outsideTiles: [],
      hiddenOutsideTiles: []
    }
  }
};

let state = deepMerge({}, defaultState);

app.get('/api/getState', (req, res) => {
  res.send({state});
})

app.post('/api/joinRoom', (req, res) => {
  const { name, num } = req.body
  state[num].players.name = name;
  io.emit('UPDATE_STATE', state);
  res.sendStatus(200);
});

app.post('/api/updateGame', (req, res) => {
  const { type, data = {} } = req.body;
  const { player } = data;
  switch(type) {
    case 'ASSIGN_SEATS':
      state.gameInfo.seatOrder = shuffle(state.gameInfo.seatOrder);
      break;
    case 'INC_ROUND':
      state.gameInfo.round = state.gameInfo.round + 1;
      break
    case 'DEC_ROUND':
      state.gameInfo.round = state.gameInfo.round - 1;
      break;
    case 'INC_DEALER':
      state.gameInfo.round = state.gameInfo.round + 1;
      break
    case 'DEC_DEALER':
      state.gameInfo.round = state.gameInfo.round - 1;
      break;
    case 'FRONT_DRAW':
      console.log(JSON.stringify(state, null, 2))
      state = drawTile(state, player, 'front');
      break;
    case 'BACK_DRAW':
      state = drawTile(state, player, 'back');
      break;
    case 'SHUFFLE_DECK':
      state.gameInfo.deck = shuffle(state.gameInfo.deck);
      break;
    case 'ROLL_DICE':
      state.gameInfo.roll = rollDice();
      break;
    case 'CUT_WALL':
      let { roll, deck } = state.gameInfo;
      state.gameInfo.deck = setStartingPosition(roll, deck)
      break;
    case 'DEAL_TILES':
      state = dealTiles(state);
      break;
    case 'RESET_DECK':
      state.gameInfo.deck = resetDeck(state.gameInfo.deck);
      state.gameInfo.discard = [];
      state.players = resetPlayerHands(state.players);
      break;
    case 'RESET_STATE':
      state = deepMerge({}, defaultState);
      break;
    default:
      break;
  }
  io.emit('UPDATE_STATE', state);
  res.sendStatus(200);
});

io.on('connection', socket => {
  console.log('user connected');
  socket.on('disconnect', testdata => {
    console.log('user disconnected')
  });
});

console.log(`listening on port: ${PORT}`);
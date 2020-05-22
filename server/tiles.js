const deepMerge = require('deepmerge')

const tiles = [
  // Flowers
  'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8',
  // Bamboo/Sticks
  'B1', 'B1', 'B1', 'B1',
  'B2', 'B2', 'B2', 'B2',
  'B3', 'B3', 'B3', 'B3',
  'B4', 'B4', 'B4', 'B4',
  'B5', 'B5', 'B5', 'B5',
  'B6', 'B6', 'B6', 'B6',
  'B7', 'B7', 'B7', 'B7',
  'B8', 'B8', 'B8', 'B8',
  'B9', 'B9', 'B9', 'B9',
  // Character/Wan
  'C1', 'C1', 'C1', 'C1',
  'C2', 'C2', 'C2', 'C2',
  'C3', 'C3', 'C3', 'C3',
  'C4', 'C4', 'C4', 'C4',
  'C5', 'C5', 'C5', 'C5',
  'C6', 'C6', 'C6', 'C6',
  'C7', 'C7', 'C7', 'C7',
  'C8', 'C8', 'C8', 'C8',
  'C9', 'C9', 'C9', 'C9',
  // Dots/Circles
  'D1', 'D1', 'D1', 'D1',
  'D2', 'D2', 'D2', 'D2',
  'D3', 'D3', 'D3', 'D3',
  'D4', 'D4', 'D4', 'D4',
  'D5', 'D5', 'D5', 'D5',
  'D6', 'D6', 'D6', 'D6',
  'D7', 'D7', 'D7', 'D7',
  'D8', 'D8', 'D8', 'D8',
  'D9', 'D9', 'D9', 'D9',
  // Honors, Red/Green/White
  'HR', 'HR', 'HR', 'HR',
  'HG', 'HG', 'HG', 'HG',
  'HW', 'HW', 'HW', 'HW',
  // Winds ESNW
  'WE', 'WE', 'WE', 'WE',
  'WS', 'WS', 'WS', 'WS',
  'WW', 'WW', 'WW', 'WW',
  'WN', 'WN', 'WN', 'WN',
];

const shuffle = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

const sortTiles = (tiles) => {
  let hash = {
    'F': [], 'B': [], 'C': [], 'D': [], 'H': [], 'W': []
  }
  tiles.forEach( tile => { hash[tile[0]].push(tile); });
  for(let arr in hash) {
    hash[arr] = hash[arr].sort((a, b) => Number(a[1]) < Number(b[1]) ? -1 : 1)
  }
  return [].concat(hash.F).concat(hash.B).concat(hash.C).concat(hash.D).concat(hash.H).concat(hash.W)
}

const findStartingWall = (roll) => {
  return (roll % 4) === 0 ? 4 : (roll % 4);
}

const setStartingPosition = (roll, deck) => {
  let startingWall = findStartingWall(roll);
  let position = 144 - ( (startingWall - 1) * 36 ) - (36 - (roll * 2));

  return deck.concat(deck.splice(0, position));
}

const rollDice = () => {
  let first = 1 + Math.floor(Math.random() * 6);
  let second = 1 + Math.floor(Math.random() * 6);
  let third = 1 + Math.floor(Math.random() * 6);

  return first + second + third;
}

const resetDeck = () => {
  return tiles.slice(0);
}

const resetPlayerHands = (playerState) => {
  return {
    player1: {
      name: playerState.player1.name,
      waiting: false,
      hand: [],
      outsideTiles: [],
      hiddenOutsideTiles: []
    },
    player2: {
      name: playerState.player2.name,
      waiting: false,
      hand: [],
      outsideTiles: [],
      hiddenOutsideTiles: []
    },
    player3: {
      name: playerState.player3.name,
      waiting: false,
      hand: [],
      outsideTiles: [],
      hiddenOutsideTiles: []
    },
    player4: {
      name: playerState.player4.name,
      waiting: false,
      hand: [],
      outsideTiles: [],
      hiddenOutsideTiles: []
    }
  }
}

const dealTiles = (state) => {
  const { gameInfo, players } = state;
  const { seatOrder, deck } = gameInfo;
  const { player1, player2, player3, player4 } = players;

  let counter = 0;

  for(let i = 0; i < 16; i++) {
    players[seatOrder[counter]].hand = players[seatOrder[counter]].hand.concat(deck.splice(0, 4));
    counter = counter === 3 ? 0 : counter + 1;
  }
  return state;
}

const drawTile = (state, player, location) => {
  // location === 'front' or 'back'
  let { gameInfo, players } = state;
  let { deck } = gameInfo;
  let tile = location === 'front' ? deck.shift() : deck.pop();
  players[player].hand.push(tile);

  return state;
}

module.exports = {
  tiles,
  shuffle,
  findStartingWall,
  setStartingPosition,
  rollDice,
  sortTiles,
  dealTiles,
  drawTile,
  resetDeck,
  resetPlayerHands
};


let testData = {
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

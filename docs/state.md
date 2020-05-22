WAITING_FOR_PLAYERS
- ACTION: GAME_START

HANDLE_GAME_START
- ACTION: CIRCLE_START

HANDLE_CIRCLE_START
- ACTION: NEW_DEAL_START

DISCARD_PHASE
- ACTION: DECLARE_WIN_SELF_PICK
- ACTION: HIDDEN_GANG
- ACTION: DISCARD_TILE

POTENTIAL_MELDS
- ACTION: PASS_PRIORITY
- ACTION: DECLARE_WIN_OUTSIDE
- ACTION: DECLARE_PONG
- ACTION: DECLARE_EAT







GAME_START:
- assign wind/seats

CIRCLE_START:
- set dealerCount to 1
- set wind to correct wind start at Dong -> Nan -> Xi -> Bei

NEW_DEAL_START:
- shuffle deck
- deal tiles out
- sort tiles/hand
- activePlayer gets additional tile
- handle flowers
- update status to "DISCARD_PHASE"

DISCARD_TILE:
- move currentDiscard to discard
- remove tile from activePlayer's hand
- add tile to currentDiscard
- sort activeplayer's hand
- set status to "POTENTIAL_MELDS"








1 game = 4 circles/winds
1 circle = 4 dealers
1 dealer = infinite "hands"


dealerOrder = ['player1', 'player2', 'player3', 'player4']
dealerCount = "which dealer is currently active dealer"



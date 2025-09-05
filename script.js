const Board = (() => {
    const board = Array(9).fill(null);

    function setMarker(index, marker) {
        if(board[index]) return false;
        board[index] = marker;
        logBoard()
        return true;
    }

    function checkWin() {
        const winningPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let i = 0; i < winningPatterns.length; i++) {
            const [a, b, c] = winningPatterns[i]
            if (board[a] === null) continue;
            if (board[a] === board[b] && board[b] === board[c]) {
                return board[a];
            }
        }
    }

    function checkTie() {
        return board.every(cell => cell)
    }

    function logBoard() {
        console.dir(board)
    }

    return {
        setMarker,
        checkWin,
        checkTie
    }
})()

const Game = (() => {
    const players = [
        player("Hänsel", "X"),
        player("Gretel", "O")
    ]

    let activePlayer = players[0];

    function playTurn(index) {
        if(!Board.setMarker(index, activePlayer.marker)){
            return
        }
        
        const winner = getPlayerByMarker(Board.checkWin())
        if (winner) {
            console.log(winner)
            return;
        }
        if (Board.checkTie()) {
            console.log("Tie")
            return;
        }

        swapActivePlayer();
    }

    function swapActivePlayer() {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    function getPlayerByMarker(marker) {
        return players.find(player => player.marker === marker)
    }

    return {
        playTurn
    }

})()

function player(name, marker) {
    return { name, marker };
}

const UI = (() => {
    const gameBoardContainer = $(".game-board-containter")


    function $(query){
        return document.querySelector(query)
    }


    function createBoard(){

    }
    
    
    
    function renderBoard(){

    }
})()
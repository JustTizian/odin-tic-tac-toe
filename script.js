const Board = (() => {
    const board = Array(9).fill(null);

    function setMarker(index, marker){
        board[index] = marker;
        logBoard()
    }

    function logBoard(){
        console.dir(board)
    }

    return{
        setMarker
    }
})()

const Game = (() => {
    const player1 = player("Hänsel", "X");
    const player2 = player("Gretel", "O");
    let activePlayer = player1;

    function playTurn(index){
        Board.setMarker(index, activePlayer.marker)
        swapActivePlayer();
    }

    function swapActivePlayer(){
        console.log(activePlayer == player1)
        console.log(activePlayer == player2)
        activePlayer = activePlayer === player1 ? player2 : player1;
    }

    return{
        playTurn
    }
    
})()

function player(name, marker){
    return{name, marker};
}

const UI = (() => {

})()
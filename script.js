const gameboard = (function () {
    const gameboard = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    function place(index) {
        gameboard[index-1] = game.getActivePlayer()
        game.swapActivePlayer()
    }

    function displayGameBoard() {
        console.dir(gameboard)
    }

    return {
        place,
        displayGameBoard
    }
})()


const game = (function () {
    let isXTurn = true;

    function playTurn(index){
        gameboard.place(index)
        gameboard.displayGameBoard()
    }

    return {
        getActivePlayer: () => isXTurn ? "X" : "O",
        swapActivePlayer: () => isXTurn = !isXTurn,
        playTurn
    }
})()
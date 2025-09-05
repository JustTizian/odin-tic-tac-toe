const gameboard = (function () {
    const gameboard = Array(9).fill(null)

    function place(index) {
        if (gameboard[index] === "X" || gameboard[index] === "O") return false;
        gameboard[index] = game.getActivePlayer();
        return true;
    }

    function displayGameBoard() {
        console.dir(gameboard)
    }

    function checkWin() {
        const winningPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let i = 0; i < winningPatterns.length; i++) {
            const [a, b, c] = winningPatterns[i]
            if (gameboard[a] === null) continue;
            if (gameboard[a] === gameboard[b] &&
                gameboard[b] === gameboard[c]) {
                return gameboard[a]
            }
        }
    }

    function checkTie(){
        return gameboard.every(cell => cell !== null)
    }

    return {
        place,
        displayGameBoard,
        checkWin,
        checkTie
    }
})()


const game = (function () {
    let isXTurn = true;

    function playTurn(index) {
        while (gameboard.place(index)) {
            gameboard.place(index)
        }
        gameboard.displayGameBoard()
        let winner = gameboard.checkWin()
        if (winner) {
            console.log(`${winner} won!`)
            return;
        }

        if(gameboard.checkTie()){
            console.log("Tie")
            return;
        }
        
        game.swapActivePlayer()
        
        
    }

    return {
        getActivePlayer: () => isXTurn ? "X" : "O",
        swapActivePlayer: () => isXTurn = !isXTurn,
        playTurn
    }
})()

/* const UIHandler = function(){

}() */
const Board = (() => {
    const board = Array(9).fill(null);

    function setMarker(index, marker) {
        if (board[index]) return false;
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

    function getBoard() {
        return board
    }

    function reset() {
        board.fill(null)
    }

    return {
        setMarker,
        checkWin,
        checkTie,
        getBoard,
        reset
    }
})()

const Game = (() => {
    const players = []

    let ties = 0;
    let activePlayer = players[0];

    function start() {
        Board.reset()
        UI.createBoard()
        
        players.length = 0
        players.push(
            player("Hänsel", "X"),
            player("Gretel", "O"));
        activePlayer = players[0]
        ties = 0
        UI.updateScoreDisplay(players, ties)
        UI.updateStatusBar(`Active Player: ${activePlayer.marker}`)
        
    }

    function playTurn(index) {
        if (!Board.setMarker(index, activePlayer.marker)) {
            return
        }
        UI.renderBoard()

        const winner = getPlayerByMarker(Board.checkWin())
        if (winner) {
            UI.updateStatusBar(`${winner.marker} won!`)
            winner.score++
            UI.updateScoreDisplay(players, ties)
            UI.boardLockControl(true)
            UI.showResetButton(true)

            return;
        }
        if (Board.checkTie()) {
            UI.updateStatusBar("Tie")
            ties++
            UI.updateScoreDisplay(players, ties)
            UI.boardLockControl(true)
            UI.showResetButton(true)
            return;
        }

        swapActivePlayer();
        UI.updateStatusBar(`Active Player: ${activePlayer.marker}`)
    }

    function swapActivePlayer() {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    function getPlayerByMarker(marker) {
        return players.find(player => player.marker === marker)
    }

    function reset() {
        Board.reset()
        activePlayer = players[0]
        UI.reset();
        UI.renderBoard();
        UI.updateStatusBar(`Active Player: ${activePlayer.marker}`)
    }

    return {
        start,
        playTurn,
        reset
    }

})()

function player(name, marker) {
    this.score = 0;
    return { name, marker, score };
}

const UI = (() => {
    const gameBoardContainer = $(".game-board-container")
    const gameBoardCells = []
    const statusDisplay = $(".status-display")
    const scoreDisplays = $$(".score-display")

    gameBoardContainer.addEventListener("click", (e) => {
        const target = e.target.closest(".game-cell")
        if (target) {
            Game.playTurn(target.dataset.number)
        }
    })

    const resetButton = $(".reset-btn")
    resetButton.addEventListener("click", Game.reset)

    const startButton = $(".start-button")
    startButton.addEventListener("click", Game.start)

    function $(query) {
        return document.querySelector(query)
    }

    function $$(query) {
        return document.querySelectorAll(query)
    }

    function createBoard() {

        gameBoardContainer.replaceChildren()
        gameBoardCells.length = 0

        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("button")
            cell.classList.add("game-cell")
            cell.dataset.number = i
            gameBoardCells.push(cell)
            gameBoardContainer.appendChild(cell)
        }
    }

    function renderBoard() {
        console.log(Board.getBoard())
        Board.getBoard().forEach((cell, index) => gameBoardCells[index].textContent = cell)
    }

    function boardLockControl(bool) {
        gameBoardCells.forEach(cell => cell.disabled = bool)
    }

    function updateStatusBar(text) {
        statusDisplay.textContent = text
    }

    function updateScoreDisplay(players, ties) {
        scoreDisplays[0].textContent = `Ties ${ties}`
        scoreDisplays[1].textContent = `${players[0].name} Score: ${players[0].score}`
        scoreDisplays[2].textContent = `${players[1].name} Score: ${players[1].score}`
    }
    function showResetButton(bool) {
        bool ? resetButton.style.display = "block" : resetButton.style.display = "none"
    }

    function reset() {
        boardLockControl(false)
    }

    return {
        createBoard,
        renderBoard,
        boardLockControl,
        showResetButton,
        reset,
        updateStatusBar,
        updateScoreDisplay
    }
})()
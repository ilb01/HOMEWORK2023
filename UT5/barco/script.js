document.addEventListener("DOMContentLoaded", function () {
    const canvas1 = document.getElementById("gameCanvas1");
    const canvas2 = document.getElementById("gameCanvas2");
    const context1 = canvas1.getContext("2d");
    const context2 = canvas2.getContext("2d");

    const boardSize = 10;
    const cellSize = 30;
    const ships = [
        { name: "carrier", length: 5 },
        { name: "battleship", length: 4 },
        { name: "cruiser", length: 3 },
        { name: "submarine", length: 3 },
        { name: "destroyer", length: 2 }
    ];

    const boards = {
        player1: Array.from({ length: boardSize }, () =>
            Array.from({ length: boardSize }, () => ({ hit: false, ship: null }))
        ),
        player2: Array.from({ length: boardSize }, () =>
            Array.from({ length: boardSize }, () => ({ hit: false, ship: null }))
        )
    };

    let currentPlayer = "player1";

    function drawBoard(context, board) {
        context.clearRect(0, 0, canvas1.width, canvas1.height);

        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                const cell = board[row][col];

                let color;
                if (cell.hit) {
                    color = cell.ship ? "#f00" : "#00f";
                } else {
                    color = cell.ship ? "#999" : "#fff";
                }

                context.fillStyle = color;
                context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);

                context.strokeStyle = "#000";
                context.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);

                context.fillStyle = "#000";
                context.font = "bold 12px Arial";
                context.fillText(String.fromCharCode(65 + row) + (col + 1), col * cellSize + 10, row * cellSize + 20);
            }
        }
    }

    function placeShipsRandomly(board) {
        ships.forEach(function (ship) {
            let isPlaced = false;

            while (!isPlaced) {
                const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
                const startRow = Math.floor(Math.random() * (boardSize - ship.length + 1));
                const startCol = Math.floor(Math.random() * (boardSize - ship.length + 1));

                if (canPlaceShip(board, ship, startRow, startCol, orientation)) {
                    placeShip(board, ship, startRow, startCol, orientation);
                    isPlaced = true;
                }
            }
        });
    }

    function canPlaceShip(board, ship, startRow, startCol, orientation) {
        if (orientation === "horizontal") {
            for (let i = 0; i < ship.length; i++) {
                if (board[startRow][startCol + i].ship) {
                    return false;
                }
            }
        } else if (orientation === "vertical") {
            for (let i = 0; i < ship.length; i++) {
                if (board[startRow + i][startCol].ship) {
                    return false;
                }
            }
        }

        return true;
    }

    function placeShip(board, ship, startRow, startCol, orientation) {
        if (orientation === "horizontal") {
            for (let i = 0; i < ship.length; i++) {
                board[startRow][startCol + i].ship = ship;
            }
        } else if (orientation === "vertical") {
            for (let i = 0; i < ship.length; i++) {
                board[startRow + i][startCol].ship = ship;
            }
        }
    }

    function handleCellClick(event) {
        const target = event.target;
        const rect = target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rowIndex = Math.floor(y / cellSize);
        const colIndex = Math.floor(x / cellSize);

        const cell = currentPlayer === "player1" ? boards.player2[rowIndex][colIndex] : boards.player1[rowIndex][colIndex];
        cell.hit = true;

        const currentPlayerLabel = currentPlayer === "player1" ? "Jugador 1" : "Jugador 2";

        if (cell.ship) {
            console.log(`¡Hundiste un barco del ${currentPlayerLabel}!`);
        } else {
            console.log("Agua...");
        }

        if (currentPlayer === "player1") {
            drawBoard(context2, boards.player2);

            if (checkGameEnd(boards.player2)) {
                console.log("¡Juego terminado! Jugador 1 ganó.");
                canvas2.removeEventListener("click", handleCellClick);
            } else {
                currentPlayer = "player2";
            }
        } else {
            drawBoard(context1, boards.player1);

            if (checkGameEnd(boards.player1)) {
                console.log("¡Juego terminado! Jugador 2 ganó.");
                canvas1.removeEventListener("click", handleCellClick);
            } else {
                currentPlayer = "player1";
            }
        }
    }

    function checkGameEnd(board) {
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                if (board[row][col].ship && !board[row][col].hit) {
                    return false;
                }
            }
        }
        return true;
    }

    drawBoard(context1, boards.player1);
    drawBoard(context2, boards.player2);

    canvas1.addEventListener("click", handleCellClick);
    canvas2.addEventListener("click", handleCellClick);

    placeShipsRandomly(boards.player1);
    placeShipsRandomly(boards.player2);
});


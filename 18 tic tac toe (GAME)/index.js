const gameCells = document.querySelectorAll('.cell');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const restartBtn = document.querySelector('.restartBtn');
const alertBox = document.querySelector('.alertBox');

//Making variables
let currentPlayer = 'X';
let nextPlayer = 'O';
let playerTurn = currentPlayer;
player1.textContent = `Player 1: ${currentPlayer}`;
player2.textContent = `Player 2: ${nextPlayer}`;


// function to start game
const startGame = () =>{
    gameCells.forEach(cell => {
        cell.addEventListener('click',handleClick);
    });
}


const handleClick = (e) => {
    if(e.target.textContent === ''){
        e.target.textContent = playerTurn;
        if(checkWin()){
            //console.log(`${playerTurn} is the winner`);
            showAlert(`${playerTurn} is the winner`);
            disableCells();
        }else if(checkTie()){
            //console.log('its a tie');
            showAlert(`its a tie`);
            disableCells();
        }else{
            changePlayerTurn();
            showAlert(`turn for player: ${playerTurn}`);
        }
    }
}

//function to disable game after a win or a tie
const disableCells = () =>{
    gameCells.forEach(cell => {
        cell.removeEventListener('click',handleClick);
        cell.classList.add('disabled');
    })
}

//function to change player turn
const changePlayerTurn = ()=>{
    // if(playerTurn === currentPlayer){
    //     playerTurn = nextPlayer;
    // }
    // else{
    //     playerTurn = currentPlayer;
    // }
    playerTurn = (playerTurn === currentPlayer) ? nextPlayer : currentPlayer;
}

//function to check win
const checkWin = ()=>{
    const winningConditions =  [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for (let i = 0; i < winningConditions.length; i++) {
        
        const [pos1, pos2 ,pos3] = winningConditions[i];

        if(gameCells[pos1].textContent !== '' && gameCells[pos1].textContent === gameCells[pos2].textContent && gameCells[pos2].textContent === gameCells[pos3].textContent){
            return true;
        }
        
    }
    return false
}


//function to check tie
const checkTie = ()=>{
    let emptyCellsCount = 0;
    gameCells.forEach(cell => {
        if(cell.textContent === ''){
            emptyCellsCount++;
        }
    });

    return emptyCellsCount === 0 && !checkWin();
}

//functoin to restart game
const restartGame = () =>{
    gameCells.forEach(cell =>{
        cell.textContent = '';
        cell.classList.remove('disabled');
    })
    startGame();
}

//restart btn
restartBtn.addEventListener('click',restartGame);


//
const showAlert = (msg) =>{
    alertBox.style.display = 'block';
    alertBox.textContent = msg;

    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000);
}

//calling start game function
startGame();
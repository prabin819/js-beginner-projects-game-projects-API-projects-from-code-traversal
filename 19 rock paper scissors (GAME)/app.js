let userScore = 0;
let computerScore = 0;

const choices = document.querySelectorAll('.choice');
const message = document.querySelector('#msg');
const computerScoreElement = document.getElementById('computer-score');
const userScoreElement = document.getElementById('user-score');



const genComputerChoice = () => {
    //rock, paper, scissors
    const options = ["rock","paper","scissors"];

    const randNo = Math.floor(Math.random() * 3);

    return options[randNo];
}


const drawGame = () =>{
    message.innerText = "Game was draw.";
    message.style.backgroundColor = 'yellow';
    message.style.color = 'black';
    //console.log('Game was draw.');
}

const showWinner = (userWin, userChoice, compChoice) =>{
    userWin ? (message.innerText = "You win:  ", 
               message.style.backgroundColor = 'green', 
               message.innerText += `${userChoice} beats ${compChoice}`,
               message.style.color = 'black',
               userScore++,
               userScoreElement.textContent = userScore.toString()) 
               : 
               (message.innerText = "Computer win:  ", 
               message.style.backgroundColor = 'red', 
               message.innerText += `${compChoice} beats ${userChoice}`,
               message.style.color = 'black',
               computerScore++,
               computerScoreElement.textContent = computerScore.toString() );
}


const playGame = (userChoice) =>{
    console.log('user choice = ', userChoice);
    //generate computer choice
    const computerChoice = genComputerChoice();
    console.log('comp choice = ', computerChoice);

    if(userChoice === computerChoice){
        drawGame();
    }else{
        let userWin = true;

        if(userChoice === "rock"){
            userWin = computerChoice === "paper"? false:true;
        }
        else if(userChoice === "paper"){
            userWin = computerChoice === "scissors"? false:true;
        }
        else{
            userWin = computerChoice === "rock"? false:true;
        }
        showWinner(userWin, userChoice,computerChoice);
    }

    
}

choices.forEach(choice => {
    choice.addEventListener('click', ()=>{
        const userChoice = choice.getAttribute('id');
        //console.log(userChoice + ' choice was clicked');
        playGame(userChoice);
    });
});


const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

//variables
let currPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


//A function to initialise the game
function initGame(){
    currPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //UI par bhi empty karna padega
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //one more thing - we have to initialise box with initial css properties again
        box.classList = `box box${index + 1}`;
        
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currPlayer}`;
}

initGame();

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
})

function handleClick(index){
    if(gameGrid[index] === ""){
        //this will reflect on UI
        boxes[index].innerText = currPlayer;
        //this will help in tracking the game status
        gameGrid[index] = currPlayer;
        //if value is already filled we have to disable cursor pointer
        boxes[index].style.pointerEvents = "none";

        //now we have to swap turn 
        swapTurn();

        //check if someone has already won
        checkGameOver();
    }
}

function swapTurn(){
    if(currPlayer == "X"){
        currPlayer = "O";
    }
    else{
        currPlayer = "X"
    }

    //ui update
    gameInfo.innerText = `Current Player - ${currPlayer}`;
}

function checkGameOver(){
    let ans = "";

    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && 
        ( gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){

            //check if winner is X
            if(gameGrid[position[0]] === "X"){
                ans = "X";
            }
            else{
                ans = "O";
            }

            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            //now we know X/O is a winner - so I have to make boxes green
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
    });

    //now I have a winner - noe we have to show who is the winner and activate the button
    if(ans !== ""){
        gameInfo.innerText = `Winner Player - ${ans}`;
        newGameBtn.classList.add("active");
        return;
    }

    //agar hum yha tak aa gye h to matlb h koi winner nhi h game tie = check weather there is tie
    let fillCoun = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillCoun++;
    });

    //board is completely filled hence game is TIE
    if(fillCoun == 9){
        gameInfo.innerText = "Game Tied !!!";
        newGameBtn.classList.add("active");
    }
}

newGameBtn.addEventListener("click", initGame);
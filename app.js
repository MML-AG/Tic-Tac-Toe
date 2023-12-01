const startBtn = document.querySelector('#startBtn')

startBtn.addEventListener('click', ()=>{
    if(checkFields()){
        document.querySelector('#takeInfo').style.display = "none"
        document.querySelector('#game').style.display = "flex"
        Game.updatePlayer()
    }else{
        alert('Please fill all the fields')
    }
})

function checkFields(){
    if(document.querySelector('#player1').value === "" || document.querySelector('#player2').value === "" ){
        return false
    }
    return true
}
document.querySelector('#restart').addEventListener('click', restart)
function restart(){
    window.location.reload()
}
function handleClick(event){

    //change turn
    Game.changeTurn()
    let turn = Game.getTurn()
    document.querySelector('#turn').innerHTML = `Turn For ${turn}`
    //change the innerHtml of the cell
    if(turn === "X"){
        event.target.innerHTML = "O"
    }else{
        event.target.innerHTML = "X"
    }

    Game.checkWin()

    Game.checkDraw();

}
function createNewPlayer(name, mark){
    return {
        name,
        mark
    }
}
const Game = (
    function(){
        let players = []
        let winner;
        let gameOver = false;
        let winningCombs = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]

        function updatePlayer(){
            players[0] = createNewPlayer(document.querySelector("#player1").value, "X")
            players[1] = createNewPlayer(document.querySelector("#player2").value, "O")
        }
        let cells = document.querySelectorAll('.cell')

        cells.forEach((cell, index) =>{
            cell.id = index
            cell.addEventListener('click', handleClick, {once: true})
        })
        
        let turn = "X";
        
        function getTurn(){
            return turn
        }
        function changeTurn(){
            turn =  turn==="X" ? "O" : "X"
        }
        
        function printWinner(winner){
            let winningPlayer = winner === "X" ? players[0].name : players[1].name
            console.log(winningPlayer)
            if(gameOver){
                document.querySelector('#winningMessage').style.display = "block"
                document.querySelector('#turn').style.display = "none"
                document.querySelector('#winningMessage').innerHTML = `Winner is ${winner} <br> 
                Winning Player is: <span style = " background-color: green;"> ${winningPlayer} </span>
                `
                cells.forEach((cell) =>{
                    cell.removeEventListener('click', handleClick)
                })
                
            }
        }
        function checkWin(){
            cells = Array.from(document.querySelectorAll('.cell'))
            winningCombs.forEach(comb =>{
                if((cells[comb[0]].innerHTML === cells[comb[1]].innerHTML && 
                    cells[comb[1]].innerHTML === cells[comb[2]].innerHTML) && cells[comb[0]].innerHTML !== ""){
                        winner = cells[comb[0]].innerHTML
                        gameOver = true
                        printWinner(winner)
                    }
                })
            }
            
            function printDraw(){
                document.querySelector('#winningMessage').style.display = "block"
                document.querySelector('#turn').style.display = "none"
                document.querySelector('#winningMessage').innerHTML = `It is a draw!`
            }
            function checkDraw(){
                cells = Array.from(document.querySelectorAll('.cell'))
                let filledCells = cells.filter((cell) =>{
                    return cell.innerHTML ==="X" || cell.innerHTML === "O"
                })

                if(filledCells.length === 9){
                    gameOver = true
                    printDraw()
                }
        }
    return{
        changeTurn,
        getTurn,
        checkWin,
        updatePlayer,
        checkDraw
    }
    }
)()


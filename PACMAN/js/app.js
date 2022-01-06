document.addEventListener('DOMContentLoaded',() => {
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const newGame = document.querySelector('.new-game')
    const width = 28 // 784 total squares
    let totalDotsWin = 0
    let totalDotsEaten = 0
    let score = 0

    //Grid layout
    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]

    const squares = []
    //legend data
    // 0 Pellet
    // 1 Wall
    // 2 Ghost Lair
    // 3 Power Pellet
    // 4 empty
    function createBoard(){
        newGame.classList.add('hidden')

        for(let i = 0; i < layout.length; i++){
            const square = document.createElement('div') 
            grid.appendChild(square)
            squares.push(square)

            // add styles
            if(layout[i] === 0){
                squares[i].classList.add('pac-dot')
                totalDotsWin++
            } else if (layout[i] === 1){
                squares[i].classList.add('wall')
            } else if (layout[i] === 2){
                    squares[i].classList.add('ghost-lair')
            }  else if (layout[i] === 3){
                squares[i].classList.add('power-pellet')
                totalDotsWin++
            }
        }
    }
    createBoard()

    //Pac-man Starting Point
    let pacmanCurrentIndex = 490
    squares[pacmanCurrentIndex].classList.add('pac-man')

    //move pac man 

    function movePacMan(e) {
        squares[pacmanCurrentIndex].classList.remove('pac-man')

        switch(e.keyCode) {
            case 37:
                if(pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex - 1].classList.contains('wall') && !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair')) pacmanCurrentIndex -=1
                //left exit pacman
                if(pacmanCurrentIndex - 1 === 363){pacmanCurrentIndex = 391}
                break

            case 38: 
                if(pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex - width].classList.contains('wall') && !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')) pacmanCurrentIndex -=width
                break
            case 39: 
                if(pacmanCurrentIndex % width !== width - 1 &&!squares[pacmanCurrentIndex + 1].classList.contains('wall') && !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair')) pacmanCurrentIndex +=1
                if(pacmanCurrentIndex +1 === 392){pacmanCurrentIndex = 364}

                break
            case 40: 
                if(pacmanCurrentIndex + width < width*width &&!squares[pacmanCurrentIndex + width].classList.contains('wall') && !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')) pacmanCurrentIndex +=width
                break


        } 
        squares[pacmanCurrentIndex].classList.add('pac-man')
        pacDotEaten()
        powerPelletEaten()
        checkForGameOver()
        checkForWin()

    }
    document.addEventListener('keyup',movePacMan)
    newGame.addEventListener('click', restartGame)


    function pacDotEaten() {
        if(squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
            score++
            scoreDisplay.innerHTML = score
            totalDotsEaten++
            squares[pacmanCurrentIndex].classList.remove('pac-dot')
        } 

    }
    //Eat Power PEllet Scare Ghosts
    function powerPelletEaten() {
        if(squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
            score+=10
            scoreDisplay.innerHTML = score
            totalDotsEaten++
            ghosts.forEach(ghost => ghost.isScared = true)
            setTimeout(unScareGhosts,10000)
            squares[pacmanCurrentIndex].classList.remove('power-pellet')
        } 
    }
    //Turn  Ghosts Normal
    function unScareGhosts(params) {
        ghosts.forEach(ghost => ghost.isScared = false)
    }

    class Ghost {
        constructor(className,startIndex, speed) {
            this.className = className
            this.startIndex = startIndex
            this.speed = speed
            this.currentIndex = startIndex
            this.timerId = NaN
            this.isScared = false
        }
    }

ghosts = [
    new Ghost('blinky', 320 , 250),
    new Ghost('pinky', 348 , 400 ), 
    new Ghost('inky', 323 , 300 ),
    new Ghost('clyde', 351, 500 )
]

ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
})

ghosts.forEach(ghost => moveGhost(ghost))

//Funtion to move ghost
function moveGhost (ghost) {
    const directions = [-1, +1, width, -width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(function () {
        //test for wall and a ghost


        if  (!squares[ghost.currentIndex + direction].classList.contains('ghost') &&
        !squares[ghost.currentIndex + direction].classList.contains('wall') ) {
          //remove the ghosts classes
          squares[ghost.currentIndex].classList.remove(ghost.className)
          squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
          //move into that space
          ghost.currentIndex += direction
          squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      //else find a new random direction ot go in
      } else direction = directions[Math.floor(Math.random() * directions.length)]

        //if scarred turn blue
        if(ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost')
        } 
        //If scared and eaten

        if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            ghost.currentIndex = ghost.startIndex
            score+=100
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        }
        //check for game over
        checkForGameOver()
    }, ghost.speed)

}
function checkForGameOver() { 
    if (squares[pacmanCurrentIndex].classList.contains('ghost') && 
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', movePacMan)
        scoreDisplay.innerHTML = score  + '<br>Game Over'
        newGame.classList.remove('hidden')

    }
}

function checkForWin(){
    if(totalDotsEaten === totalDotsWin) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', movePacMan)
        scoreDisplay.innerHTML = score  + '<br>You have Won!'
        newGame.classList.remove('hidden')
    }
}
function restartGame(){
    window.location.reload();
}
})
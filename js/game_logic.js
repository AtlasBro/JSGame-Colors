//游戏面板
    let moves = document.querySelector('.moves')
    // ?
    let board = document.querySelector('#board')
    let colors = document.querySelector('#colors')
    let gameover = document.querySelector('#game-over')

    // control variables
    let colorArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

    let running = false

    let skill=3
    let cell = '-x'
    var cap = 15
    //选择难度
    document.getElementById('easy').onclick=function (){
    skill = 3
    document.getElementById('maxmoves').innerHTML=15
        cap=15
}

    document.getElementById('medium').onclick=function (){
    skill = 5
    document.getElementById('maxmoves').innerHTML=25
        cap=25
}

    document.getElementById('hard').onclick=function (){
    skill = 7
    document.getElementById('maxmoves').innerHTML=35
        cap=35
}

    let tally = 0
    let color
    let winTime = 0
    let currentWinTime=document.getElementById("wintimes")
    let mostWinTimes=document.getElementById("mostwintimes")
    //  game play methods
    // ----------------------------
    let shuffle = (collection) => {
    for (let i = collection.length; i; i--) {
    // alert(i);
    let j = Math.floor(Math.random() * i);
    [collection[i - 1], collection[j]] = [collection[j], collection[i - 1]]
}
    return collection
}

    let setColors = (collection, n) => {
    return n < 10 ? shuffle(collection).slice(0, n) : collection
}

    let checkWin = (moves) => {
    let n = 0
    let msg = ''
    if (moves <= cap) {
    if (board.childNodes[99].className.indexOf(cell) > -1) {
    for (var i = 0; i < 100; i++) {
    if (board.childNodes[i].className.indexOf(cell) > -1) {
    n++
}
}
}

    if (n === 100) {
    msg = '<span class="new-game">You Win!</span>'
    running = false
        //连胜次数增加
        winTime++
        //更新连胜次数和最高连胜次数
        currentWinTime.innerHTML=winTime
        mostWinTimes.innerHTML=winTime
        let value=sessionStorage.getItem("highscore")
        if(winTime>=value){
            mostWinTimes.innerHTML=winTime
            sessionStorage.setItem("highscore",winTime)
        }
} else if (n < 100 && moves >= cap) {
    msg = '<span class="new-game">Oops! Try Again...</span>'
    running = false
        //清空连胜次数
        currentWinTime.innerHTML=0
}
    }
    if(!running) {
    gameover.innerHTML = msg
}
}

    let checkColor = (color) => {
    let tiles = board.childNodes
    for(var x = 0; x < 100; x++) {
    if(tiles[x].className.indexOf(cell) > -1) {
    tiles[x].className = color + cell
    if (x + 1 < 100 && tiles[x + 1].className === color) {
    tiles[x + 1].className += cell
}
    if (x + 10 < 100 && tiles[x + 10].className === color) {
    tiles[x + 10].className += cell
}
    if (x - 1 >= 0 && x % 10 > 0 && tiles[x - 1].className === color) {
    tiles[x - 1].className += cell
}
    if (x - 10 >= 0 && x % 10 > 0 && tiles[x - 10].className === color) {
    tiles[x - 10].className += cell
}
}
}
}

    let builder = (container, element, collection, count, randomize) => {
    container.innerHTML = ''
    count = count || collection.length
    randomize = randomize || false
    for (let i = 0; i < count; i++) {
    let child = document.createElement(element)
    child.className = randomize ? collection[Math.floor((Math.random() * collection.length))] : collection[i]
    container.appendChild(child)
}
}

    let newGame = () => {
    let options = setColors(colorArray.slice(), skill)
    tally = 0
    moves.innerText = tally
    //?
    gameover.innerHTML = ''
    running = true
    builder(colors, 'chip', options)
    builder(board, 'tile', options, 100, true) //画幅大小
    color = board.childNodes[0].className
    board.className = ''
    board.childNodes[0].className = color + cell
    checkColor(color)
}

    let play = (chip) => {
    if (running && color !== chip){
    color = chip
    if(board.className !== 'started') {
    board.className = 'started'
}
    tally++
        moves.innerText=tally
    //?
    checkColor(chip)
    checkWin(tally)
}
}

    document.addEventListener("DOMContentLoaded", () => {
    newGame()
}, false)

//判断Moves
//     function getMoves(){
//     let moves=document.getElementById('moves').innerHTML++
//     let maxmoves=0
//     switch (skill){
//     default:maxmoves=15;
//     break;
//     case 3:maxmoves=15;
//     break;
//     case 5:maxmoves=25;
//     break;
//     case 7:maxmoves=35;
//     break;
// }
//     if(moves>=maxmoves){
//     // alert("超过步数上限！")
//     // setInterval(newGame(),3000)
// }
// }
    //点击后步数增加
    // let colorbox=document.getElementById('colors')
    // colorbox.addEventListener('click',getMoves)

    document.addEventListener('click', (event) => {
    let css = Array.from(event.target.classList)
    if(event.target.tagName === 'CHIP') {
    play(event.target.className)
}
    else if(css.includes('new-game')) {
    newGame()
}
})
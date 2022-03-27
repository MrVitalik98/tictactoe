"use strict"


let plyone = document.getElementById('playerone');
let plytwo = document.getElementById('playertwo');
let plyoneName = document.getElementsByClassName('playerOneName')[0];
let plytwoName = document.getElementsByClassName('playerTwoName')[0];
let plyonePoint = document.getElementsByClassName('playerOnePoint')[0];
let plyotwoPoint = document.getElementsByClassName('playerTwoPoint')[0];

let td = document.getElementsByTagName('td');
let arr = Array.from(td);
let freespace,fullspace;
let playerOne, playerTwo;
let point,plyPoints,j,n;


setInterval(()=>{
    freespace = arr.filter(item => item.innerText == '');
    fullspace = arr.filter(item=>item.innerText != '');
    n = freespace.length;
    document.getElementsByClassName('process')[0].innerHTML = n;

    for(let value of fullspace){
        value.onpointerup = null;
    }
    
    playerOne = {
        clsname:'playerOneName',
        clspoint:'playerOnePoint',
        symbol:'X',
        id:n%2 != 0,
        color:'text-success'
    };

    playerTwo = {
        clsname:'playerTwoName',
        clspoint:'playerTwoPoint',
        symbol:'O',
        id:n%2 == 0,
        color:'text-danger'
    };


   point = arr.map(item => item.innerText);
    playerOne.func = () => playerPoints(playerOne);
    playerOne.func();

    playerTwo.func = () => playerPoints(playerTwo);
    playerTwo.func();

    if(n < 9){
        document.getElementsByTagName('button')[0].classList.replace('visible','invisible');
        document.getElementsByTagName('button')[0].onclick = null;
    }

},100);


function startGame(){
    delete document.getElementsByTagName('button')[3].dataset.dismiss;
}


function playGame(){
    if(plyone.value != '' && plytwo.value != ''){
        if(isFinite(plyone.value) || isFinite(plytwo.value)){
            alert('Name must not be a number...Please write the name correctly!!!');
        }
        else if(plyone.value.length < 3 || plytwo.value.length < 3){
            alert('Name must be more than three letters...');
        }
        else{
            plyoneName.innerHTML = plyone.value;
            plytwoName.innerHTML = plytwo.value;
            plyonePoint.innerHTML = 0;
            plyotwoPoint.innerHTML = 0;
            document.getElementsByTagName('button')[2].dataset.dismiss = 'modal';
            document.getElementsByTagName('button')[1].classList.replace('d-none','d-block');
            document.getElementsByTagName('button')[0].innerHTML = 'change';
            document.getElementsByTagName('button')[0].classList.replace('btn-success','btn-info');
            document.getElementsByTagName('span')[0].classList.replace('invisible','visible');

            for(let i = 0; i < td.length; i++){
                td[i].innerHTML = '';
                td[i].onpointerup = () => {
                    fn(i);
                }
            }
        }
    }
    else{
        alert('please write player names');
    }
};


function fn(i){
    if(playerOne.id){
        td[i].innerHTML = playerOne.symbol;
        td[i].classList = playerOne.color;
        document.getElementsByTagName('span')[1].classList.replace('invisible','visible');
        document.getElementsByTagName('span')[0].classList.replace('visible','invisible');
    }else{
        td[i].innerHTML = playerTwo.symbol;
        td[i].classList = playerTwo.color;
        document.getElementsByTagName('span')[1].classList.replace('visible','invisible');
        document.getElementsByTagName('span')[0].classList.replace('invisible','visible');
    }
}


function restartGame(){
    document.getElementsByTagName('button')[0].classList.replace('d-none','d-block');
    document.getElementsByTagName('button')[1].classList.replace('d-block','d-none');
    document.getElementsByTagName('span')[0].classList.replace('invisible','visible');
    document.getElementsByTagName('span')[1].classList.replace('visible','invisible');
    document.getElementsByTagName('button')[0].classList.replace('invisible','visible');
    document.getElementsByTagName('button')[0].onclick = startGame();

    for(let i = 0; i < td.length; i++){
        td[i].innerHTML = '';
        td[i].onpointerup = () => {
            fn(i);
        }
    }
}


function playerPoints(player){
    let positions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    let plyPoints = positions.filter(pos => pos.every(i => point[i] == player.symbol)).length
    player.point = plyPoints
    
    return document.getElementsByClassName(player.clspoint)[0].innerHTML = plyPoints
};


setInterval(()=>{
    if(n==0){
        document.getElementsByClassName('jumbotron')[0].classList.replace('invisible','visible');
        if(playerOne.point > playerTwo.point){
            document.getElementsByClassName('plywinner')[0].innerHTML = plyoneName.innerText;
            document.getElementsByClassName('draw')[0].classList.replace('d-block','d-none');
            document.getElementsByClassName('winner')[0].classList.replace('d-none','d-block');
        }
        if(playerTwo.point > playerOne.point){
            document.getElementsByClassName('plywinner')[0].innerHTML = plytwoName.innerText;
            document.getElementsByClassName('draw')[0].classList.replace('d-block','d-none');
            document.getElementsByClassName('winner')[0].classList.replace('d-none','d-block');
        }
        if(playerOne.point == playerTwo.point){
            document.getElementsByClassName('draw')[0].classList.replace('d-none','d-block');
            document.getElementsByClassName('winner')[0].classList.replace('d-block','d-none');
        }
    }
    else{
        document.getElementsByClassName('jumbotron')[0].classList.replace('visible','invisible');
    }

    if(document.body.offsetWidth > 568){
        document.getElementsByTagName('table')[0].classList.replace('w-75','w-50');
    }else{
        document.getElementsByTagName('table')[0].classList.replace('w-50','w-75');
    }

},100)

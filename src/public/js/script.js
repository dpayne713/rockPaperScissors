
const dom = {
    score: document.querySelector('#SCORE'), 
    playAreaTop: document.querySelector('.playArea__top'), 
    playAreaMain: document.querySelector('.playArea__main'),
    playAreaBackground: document.querySelector('.playArea__main-background'), 

    playAreaReset: document.querySelector('.playArea__main-reset'), 
    playAreaResetText: document.querySelector('.playArea__main-reset-text'),

    paper: document.querySelector('.paper'), 
    scissors: document.querySelector('.scissors'), 
    rock: document.querySelector('.rock'),

    playPiece: document.querySelectorAll('.playArea__main-playPiece'), 
    houseBlackCircle: document.querySelector('.houseBlackCircle')
}

const winners = {
    rock : 'scissors', 
    scissors : 'paper', 
    paper : 'rock'
}

let curScore = 0;  
let prevClass; 
let done = true; 

import houseHTML from './houseHTML.js'

const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));



////// GAME EVENT LISTNERS ///////


dom.paper.addEventListener('click', function() {playGame('paper')});

dom.scissors.addEventListener('click', function() {playGame('scissors')});

dom.rock.addEventListener('click', function(){playGame('rock')});

dom.playAreaReset.addEventListener('click', ()=> {
    location.reload(); 
});

// PRIMARY GAME FUNCTION // 
// Takes pick and performs all game functions //

async function playGame(pick) {
    if (!done) {
        return
    }
    done = false;  
    const prevClasses = {
        paper: 'topLeft-small', 
        scissors: 'topRight-small',
        rock:  'bottomCenter-small'
    } 

    prevClass = prevClasses[pick]; 

    choiceDisplay(pick);

    dom.houseBlackCircle.classList.remove('displayOFF');

    await wait(1800); 
    
    dom.playAreaTop.classList.remove('invisible');
    dom.playAreaTop.classList.add('visible');

    const house = housePick();
    
    dom.playAreaMain.insertAdjacentHTML('beforeend', houseHTML[house]);

    if (winners[pick] === house) {
        curScore ++
        dom.score.textContent = curScore;
        dom[pick].classList.add('win'); 

        if (curScore === 5) {
            changeWidth(); 
            dom.playAreaResetText.textContent = "You Win!"
            dom.playAreaReset.classList.remove('displayOFF'); 
            return 
        }

        await wait(2000); 

        resetPlayArea(); 
        dom[pick].classList.add(prevClass); 

    } else if (house === pick){
        await wait(1000);
        resetPlayArea();
        dom[pick].classList.add(prevClass);  

    } else {
        curScore --
        dom.score.textContent = curScore; 
       
        await wait(50)
        document.querySelector('.rightBig').classList.add('win'); 

        if (curScore === -5) {
            changeWidth(); 
            dom.playAreaResetText.textContent = "You Loose"
            dom.playAreaReset.classList.remove('displayOFF'); 
            
            return 
        }

        await wait(2000); 
        resetPlayArea();
        dom[pick].classList.add(prevClass); 
    } 

}

function choiceDisplay(choice) {

    dom.playAreaTop.classList.remove('displayOFF'); 
    dom.playAreaBackground.classList.add('displayOFF');     

    let choices = ['rock', 'paper', 'scissors'].filter(el=> el !== choice);  

    choices.forEach(el=> {
        dom[el].classList.add('displayOFF'); 
    });
    dom[choice].classList.remove('topRight-small'); 
    dom[choice].classList.add('leftBig'); 
}

function housePick() {
    const choices = ['rock', 'paper', 'scissors']
    const random = Math.floor(Math.random()*3); 
    return choices[random]
}

function resetPlayArea(width) {
    dom.playPiece.forEach(el => {
        el.classList.remove('leftBig');
        el.classList.remove('displayOFF');
        el.classList.remove('win'); 
    }); 
    dom.playAreaBackground.classList.remove('displayOFF');
    dom.playAreaTop.classList.add('invisible');

    dom.playAreaMain.removeChild(dom.playAreaMain.lastChild);
    dom.houseBlackCircle.classList.add('displayOFF');

    if (width) {
        dom.playAreaTop.classList.remove('width90rem'); 
        dom.playAreaMain.classList.remove('width90rem');
        dom.playAreaTop.classList.add('width70rem'); 
        dom.playAreaMain.classList.add('width70rem'); 
    }

    done = true; 
}

function changeWidth() {
    dom.playAreaReset.classList.remove('displayOFF'); 
    dom.playAreaTop.classList.remove('width70rem'); 
    dom.playAreaTop.classList.add('width90rem'); 
    dom.playAreaMain.classList.remove('width70rem'); 
    dom.playAreaMain.classList.add('width90rem'); 
}




















// RULES LOGIC //



const rulesBtn = document.querySelector('#RULES-BTN'); 
const rulesOverlay = document.querySelector('#RULES'); 
const rulesClose = document.querySelector('#RULES-CLOSE');

rulesBtn.addEventListener('click', ()=> {
    rulesOverlay.classList.remove('displayOFF'); 
});

rulesClose.addEventListener('click', ()=> {
    rulesOverlay.classList.add('displayOFF'); 
}); 


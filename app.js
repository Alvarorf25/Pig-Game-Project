/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

//Get this variables in a function (init()) to don't repeat yourself because we are going to need them again 
//scores = [0,0]; //an array for the players score
//roundScore = 0; //one value because we want 1 score at a time. Variable that store score in each round
//activePlayer = 0; // variable which tell me which is the current player that is playing, the active player
init();


//SET THE EVENT HANDLER (ROLL BUTTON)

document.querySelector('.btn-roll').addEventListener('click', function() {

    if (gamePlaying) {
        //1. Random number.
        var dice = Math.floor(Math.random() * 6) + 1;      // to get numbers between 1 to 6

        //2. Display the result
        var diceDOM = document.querySelector('.dice');    // variable that stored the selection, and then use this variable whenever I need it instead of doing the process all time
        diceDOM.style.display = 'block';                  //to display the dice because up there we hid it
        diceDOM.src = 'dice-' + dice + '.png';            // to show the corresponding image with the correspondin dice number

        //3. Update the round score IF the rolled number was NOT a 1
        if (dice !== 1) {
            //Add score
            roundScore += dice; // This is the same to type: (roundScore = roundScore + dice;) and this means we updated our internalvariable value
            document.querySelector('#current-' + activePlayer).textContent = roundScore;  // To display our updated variable value in the user interface
        
        } else {
            //Next player
            nextPlayer();        
        }
    }    
});

//HOLD BUTTON
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add the CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;  //scores[activePlayer] = scores[activePlayer] + roundScore. Stored the score of the active player in the array variable defined (scores = [0,0];) inside the array will be "activePlayer". 
        //STORE THE SCORE THAT THE PLAYER GOT IN THIS ROUND TO THE SCORE THAT THE PLAYER ALREADY HAD. 

        // Update the UI (User Interface)
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';  // To  hide the dice
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner'); // To add the winner class when a player won the game
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); // To remove the active class becuase the game is finished.
            gamePlaying = false;

        } else {
            //Next player
            nextPlayer();
        }
    }
    
});


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // TERNARY OPERATOR (iF (something) ? = THEN and : = else)
    roundScore = 0; //to reset the roundScore to 0 when someone gets 1 that means the current score is reset it is not allowing to acumulate the numbers at the score.
    
    //Reset the score (current score) when a player gets 1
    document.getElementById ('current-0').textContent = 0; // as soon as the player rolls a 1 he loses his score
    document.getElementById ('current-1').textContent = 0; // So it sets to 0 the current score when de user gets 1
    
    //Make the visible who is the active player (change the background and set the red dot) How to add, remove and toggle HTML classes.
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //Hide the dice where will be the next player active after the other one gets 1.
    document.querySelector('.dice').style.display = 'none';
}

//NEW GAME BUTTON
document.querySelector('.btn-new').addEventListener('click', init); //here we pass the init function into the EventListener

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none'; //To hide the dice at the begining we have to set the "display" property as "none"
                                                           //So first change the style using the "style" method, then the CSS property (display in this case) and then the value "none"

    //SET THE CURRENT AND SCORES VALUES IN 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 0';
    document.getElementById('name-1').textContent = 'Player 1'; 
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active'); //we don't want 2 active class apply so make sure remove all and the active what it was again
}





//document.querySelector('#current-' + activePlayer).textContent = dice;     //Insert text content (This is a SETTER because we set a value)
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';    //insert some html content
//var x = document.querySelector('#score-0').textContent;   //to read in the console the value stored in "score-0" (this is  GETTER because we get a value)

//For reference

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

/*

THAT WAY:

activePlayer === 0 ? activePlayer === 1 : activePlayer === 0;

IS THE SAME TO SAY:

if(activePlayer === 0) {
    activePlayer = 1;
} else {
    activePlayer = 0;
}

*/
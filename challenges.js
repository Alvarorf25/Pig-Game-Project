/*
YOUR 3 CHALLENGES

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that it's the next player's
turn. (HINT: Allways save the previous dice roll in a separate variable).

2. Add an input field to the HTML where players can set the winning score, so that they can change the
predefined score of 100. (HINT: you can read that value with the .value property in JavaScript. This is a
good oportunity to use google to figure this out).

3. Add another dice to the game, so that there are two dices now. The player looses his current score
when one of the is a 1. (HINT: you will need CSS to position the second dice, so take a look at the CSS
code for the first one.)
*/


var scores, roundScore, activePlayer, gamePlaying;

//Get this variables in a function (init()) to don't repeat yourself because we are going to need them again 
//scores = [0,0]; //an array for the players score
//roundScore = 0; //one value because we want 1 score at a time. Variable that store score in each round
//activePlayer = 0; // variable which tell me which is the current player that is playing, the active player
init();

var lastDice;

//SET THE EVENT HANDLER (ROLL BUTTON)

document.querySelector('.btn-roll').addEventListener('click', function() {
    
    if (gamePlaying) {
        //1. Random number.
        var dice1 = Math.floor(Math.random() * 6) + 1;      // to get numbers between 1 to 6
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        document.getElementById('dice-1').style.display = 'block'; //to display the dice because up there we hid it
        document.getElementById('dice-2').style.display = 'block'; //to display the dice because up there we hid it
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';// to show the corresponding image with the correspondin dice number
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png'; 

        //3. Update the round score IF the rolled number was NOT a 1
        if (dice1 !== 1 && dice2 !== 1) {
            //Add score
            roundScore += dice1 + dice2; // This is the same to type: (roundScore = roundScore + dice;) and this means we updated our internalvariable value
            document.querySelector('#current-' + activePlayer).textContent = roundScore;  // To display our updated variable value in the user interface
        
        } else {
            //Next player
            nextPlayer();        
        }

        /*
        if (dice === 6 && lastDice === 6) {
            //Player looses score
            scores[activePlayer] = 0;                                             //Set the score of the player which is playing to 0
            document.querySelector('#score-' + activePlayer).textContent = '0';   //Update the UI (User Interface)
            nextPlayer();                                                         //Calling the function next player's turn

        } else if (dice !== 1) {
            //Add score
            roundScore += dice; // This is the same to type: (roundScore = roundScore + dice;) and this means we updated our internal variable value
            document.querySelector('#current-' + activePlayer).textContent = roundScore;  // To display our updated variable value in the user interface
        
        } else {
            //Next player
            nextPlayer();        
        }
        
        lastDice = dice;
        */
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

        var input = document.querySelector('.final-score').value;
        var winningScore;

        // Undefined, 0, null or "" are COERCED to false. Anything else is COERCED to true
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';  // To  hide the dice
            document.getElementById('dice-2').style.display = 'none';  // To  hide the dice
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
    document.getElementById('dice-1').style.display = 'none'; 
    document.getElementById('dice-2').style.display = 'none'; 
}

//NEW GAME BUTTON
document.querySelector('.btn-new').addEventListener('click', init); //here we pass the init function into the EventListener

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';    //To hide the dice at the begining we have to set the "display" property as "none"
    document.getElementById('dice-2').style.display = 'none';    //So first change the style using the "style" method, then the CSS property (display in this case) and then the value "none"

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
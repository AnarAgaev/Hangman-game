'use strict';

window.addEventListener('DOMContentLoaded', () => {

    let colors       = ['crimson','blue','green','gold','blueviolet','darkorchid','deeppink','dodgerblue','lawngreen','magenta','yellowgreen','mediumslateblue','tomato','slateblue','orangered','mediumvioletred'],
        words        = ['cat','dog','mouse','glasses','bag','car','bus','milk','brush','wall','board','ball','basket','girl','chocolate','pen','book','coffee','chair','apple'],
        title        = document.querySelectorAll('#title span'),
        expectedWord = document.getElementById('word'),
        btnSayWord   = document.getElementById('say-word'),
        btnSayLetter = document.getElementById('say-letter'),
        counter      = document.getElementById('counter'),
        resault      = document.getElementById('resault'),
        word         = getRandomItemOfArray(words),
        answerArray  = [],
        attempts     = 7,
        gues;

    // Print count attempts
    counter.innerHTML = attempts;

    // Create the resulting array
    for (let i = 0; i < word.length; i++) {
        answerArray[i] = '_';
    }

    // Add first and last letter
    answerArray[0] = word[0];
    answerArray[answerArray.length - 1] = word[word.length - 1];

    // Print question word
    expectedWord.innerHTML = answerArray.join(' ');

    // Game cycle
    btnSayLetter.addEventListener('click', () => {
        if (attempts != 0) {
            gues = prompt('Guess the LETTER or click Cancel to exit the game!', '');
    
            if (gues === null) {
                attempts = 0;
                checkCycle();
            } else if (gues.length != 1) {
                alert('Please enter one letter!');
            } else {
                //Updating the state of the game
                for (let i = 0; i < word.length; i++) {
                    if (word[i] === gues ) {
                        answerArray[i] = gues;
                    }
                }
                attempts--;
            }
    
            // Print resault of cycle
            expectedWord.innerHTML = answerArray.join(' ');
            counter.innerHTML = attempts;
            checkCycle();
        }
    });

    btnSayWord.addEventListener('click', () => {
        if (attempts != 0) {
            gues = prompt('Guess the WORD or click Cancel to exit the game!', '');
           
            if (gues === null) {
                attempts = 0;
                checkCycle();
            } else if (gues == word) {
                attempts--;
                for (let i = 0; i < word.length; i++) {
                    answerArray[i] = gues[i];            
                }
            } else {
                attempts--;
            }
            
            counter.innerHTML = attempts;
            expectedWord.innerHTML = answerArray.join(' ');
            checkCycle();
        }
    });

    // Check game cicle
    function checkCycle() {
        if (word === answerArray.join('')) {
            win();
        } else if (attempts == 0) {
            gameOver();
        }
    }

    // Game over
    function gameOver() {
        resault.style.top = 0;
        resault.style.fontSize = '7vw';
        resault.style.backgroundColor = 'rgba(255,255,255, .7)';
        resault.getElementsByTagName('span')[0].innerHTML = 'Game over!';
    }

    // Win
    function win() {
        resault.style.top = 0;
        resault.style.fontSize = '7vw';
        resault.style.backgroundColor = 'rgba(255,255,255, .7)';
        resault.getElementsByTagName('span')[0].innerHTML = 'You\'re winner!';
    }

    // Colorize title
    (function colorize(title) {

        for (let i = 0; i < title.length; i++) {
            title[i].style.color = getRandomItemOfArray(colors);
        }

        setInterval(() => {
            title[Math.floor(Math.random() * title.length)].style.color = getRandomItemOfArray(colors);
        }, 500);

    }(title));

    // Get random item from Array
    function getRandomItemOfArray(array) {

        if (Array.isArray(array)) {
            return array[Math.floor(Math.random() * array.length)];
        }
        
        console.log(new TypeError("Object isn't array!"));
    }
});
'use strict';

window.addEventListener('DOMContentLoaded', () => {

    let colors       = ['crimson','blue','green','gold','blueviolet','darkorchid','deeppink','dodgerblue','lawngreen','magenta','yellowgreen','mediumslateblue','tomato','slateblue','orangered','mediumvioletred'],
        words        = ['cat','dog','mouse','glasses','bag','car','bus','milk','brush','wall','board','ball','basket','girl','chocolate','pen','book','coffee','chair','apple'],
     
        title        = document.querySelectorAll('#title span'),
        expectedWord = document.getElementById('word'),
        counter      = document.getElementById('counter'),
        word         = getRandomItemOfArray(words),
        answerArray  = setupAnswerArray(word),
        attempts     = 7,
        gues;

    printInElement(counter, attempts);                   // Print count attempts
    initWord(answerArray, word);                         // Add first and last letter
    printInElement(expectedWord, answerArray.join(' ')); // Print question word
    sayLetter(document.getElementById('say-letter'));    // click on a button Say letter
    sayWord(document.getElementById('say-word'));        // click on a button Say word

    // Click button for say gues letter
    function sayLetter(button) {
        button.addEventListener('click', () => {
            if (attempts != 0) {
                gues = prompt('Guess the LETTER or click Cancel to exit the game!', '');
                let marker = true;
        
                if (gues === null) {
                    attempts = 0;
                    checkCycle();
                } else if (gues.length != 1) {
                    alert('Please enter one letter!');
                } else {
                    //Updating the state of the game
                    for (let i = 0; i < word.length; i++) {
                        if (word[i] === gues) {
                            if (answerArray[i] !== '_') marker = false;
                            answerArray[i] = gues;
                        }
                    }
                    if (marker) {
                        attempts--;
                    } 
                }
        
                printInElement(expectedWord, answerArray.join(' '));
                printInElement(counter, attempts)
                checkCycle();
            }
        });
    }

    // Click button for say gues word
    function sayWord(button) {
        button.addEventListener('click', () => {
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
                
                printInElement(counter, attempts)
                printInElement(expectedWord, answerArray.join(' '));
                checkCycle();
            }
        });
    }

    // Create the resulting array
    function setupAnswerArray(word) {
        let array = [];

        for (let i = 0; i < word.length; i++) {
            array[i] = '_';
        }

        return array;
    }

    // Print some text in a tag on the page
    function printInElement(elemnt, content) {
        elemnt.innerHTML = content;
    }

    // Initial word (add first and last letter)
    function initWord(array, word) {
        array[0] = word[0];
        array[array.length - 1] = word[word.length - 1];
    }

    // Check game cicle
    function checkCycle() {
        if (word === answerArray.join('')) {
            gameResault(document.getElementById('resault'), 'You\'re winner!');
        } else if (attempts == 0) {
            gameResault(document.getElementById('resault'), 'Game over!');
        }
    }
    
    // Finish the game (Game over or Win) -- Shown block has some styles for correct display
    function gameResault(shownBlock, resaultText) {
        shownBlock.classList.add('show');
        shownBlock.getElementsByTagName('span')[0].innerHTML = resaultText;
    }

    // Colorize a text
    (function colorize(title) {
        for (let i = 0; i < title.length; i++) {
            title[i].style.color = getRandomItemOfArray(colors);
        }

        setInterval(() => {
            title[Math.floor(Math.random() * title.length)].style.color = getRandomItemOfArray(colors);
        }, 500);
    }(title));

    // Get random item from an array
    function getRandomItemOfArray(array) {
        if (Array.isArray(array)) {
            return array[Math.floor(Math.random() * array.length)];
        }
        
        console.log(new TypeError("Object isn't array!"));
    }
});
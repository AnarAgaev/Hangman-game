'use strict';

window.addEventListener('DOMContentLoaded', () => {

    let colors       = ['crimson','blue','green','gold','blueviolet','darkorchid','deeppink','dodgerblue','lawngreen','magenta','yellowgreen','mediumslateblue','tomato','slateblue','orangered','mediumvioletred'],
        words        = ['cat','dog','mouse','glasses','bag','car','bus','milk','brush','wall','board','ball','basket','girl','chocolate','pen','book','coffee','chair','apple'],
     
        title        = document.querySelectorAll('#title span'),
        expectedWord = document.getElementById('word'),
        counter      = document.getElementById('counter'),
        canvas       = document.getElementById('canvas'),
        word         = getRandomItemOfArray(words),
        answerArray  = setupAnswerArray(word),
        attempts     = 7,
        gues;

    printInElement(counter, attempts);                   // Print count attempts
    initWord(answerArray, word);                         // Add first and last letter
    printInElement(expectedWord, answerArray.join(' ')); // Print question word
    sayLetter(document.getElementById('say-letter'));    // click on a button Say letter
    sayWord(document.getElementById('say-word'));        // click on a button Say word
    drowPicture(canvas, attempts);                       // Drow picture with hangman

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
                        drowPicture(canvas, attempts);
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
                    drowPicture(canvas, attempts);
                    for (let i = 0; i < word.length; i++) {
                        answerArray[i] = gues[i];            
                    }
                } else {
                    attempts--;
                    drowPicture(canvas, attempts);
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

    // Drow picture
    function drowPicture(canvas, item) {
        let ctx = canvas.getContext('2d');

        switch (item) {
            case 7: // Drow gallows
                ctx.fillStyle = 'black';
                ctx.fillRect(50, 275, 200, 15);
                ctx.fillRect(230, 25, 10, 250);
                ctx.fillRect(120, 25, 110, 10);
                ctx.fillRect(120, 30, 5, 40);
                break;
            case 6: // Drow head
                ctx.strokeStyle = 'blue';
                ctx.lineWidth = '4';
                ctx.beginPath();
                ctx.arc(122, 83, 15, 0, Math.PI * 2, false);
                ctx.stroke();
                break;
            case 5: // Draw shui
                drowLine('5', [122, 100], [122, 110]);
                break;
            case 4: // Drow body
                drowLine('10', [122, 110], [122, 170]);
                break;
            case 3: // Drow left hend
                drowLine('4', [90, 100], [117, 112]);
                break;
            case 2: // Drow rgiht hend
                drowLine('4', [154, 100], [127, 112]);
                break;
            case 1: // Draw a left leg
                drowLine('4', [100, 210], [120, 169]);
                break;
            case 0: // Draw a right leg
                drowLine('4', [144, 210], [124, 169]); 
                break;
        }

        function drowLine(widht, from, to) {
            ctx.beginPath();
            ctx.lineWidth = widht;
            ctx.moveTo(from[0], from[1]);
            ctx.lineTo(to[0], to[1]);
            ctx.stroke();
        }
    }
});
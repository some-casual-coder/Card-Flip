const cards = document.querySelectorAll('.memory-card');

const timer = document.querySelector('.timer');
const movesCounter = document.querySelector('.moves');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let seconds = 0,
    minutes = 0,
    hours = 0;
let moves = 0;
let interval;

// Immediately invoked function expression(IIFE)
// @description Shuffle based on order of item in the flex box: this is an easier way to shuffle the cards
(function shuffle() {
    cards.forEach(card => {
        let randomOrder = Math.floor(Math.random() * 12);
        card.style.order = randomOrder;
    });
})();

(function startGame() {
    [moves, seconds, minutes, hours] = [0, 0, 0, 0];
    timer.innerHTML = "0:0";
    clearInterval(interval);
})();

function restartGame() {
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
        let randomOrder = Math.floor(Math.random() * 12);
        card.style.order = randomOrder;
    });
    [moves, seconds, minutes, hours, firstCard, secondCard, hasFlippedCard, lockBoard] = [0, 0, 0, 0, null, null, false, false];
    timer.innerHTML = "0:0";
    clearInterval(interval);
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unFlipCards();
    addMove();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetValuesAttachedToCard();
}

function unFlipCards() {
    lockBoard = true
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetValuesAttachedToCard();
    }, 700);
}

function resetValuesAttachedToCard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function addMove() {
    moves++;
    movesCounter.innerHTML = moves;
    if (moves == 1) {
        seconds = 0;
        minutes = 0;
        hours = 0;
        startTimer();
    }
}

function startTimer() {
    interval = setInterval(() => {
        seconds++;
        timer.innerHTML = minutes + ":" + seconds;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        }
        if (minutes = 60) {
            hours++;
            minutes = 0;
        }
    }, 1000);
}

cards.forEach(card => card.addEventListener('click', flipCard));
let cards = [];
let sum = 0;
let sumdisp = 0;
let aces = 0;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");

let player = {
    name: "Arnab",
    chips: 145
};

let cardchar = ["", "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

let playerEl = document.getElementById("player-el");
playerEl.textContent = player.name + ": $" + player.chips;

function getRandomCard() {
    let num = Math.floor(Math.random() * 13 + 1);
    if (num === 1) { aces += 1; return [11, "A"]; }
    else if (num > 10) { return [10, cardchar[num]]; }
    else { return [num, cardchar[num]]; }
}

function startGame() {
    aces = 0;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard[1], secondCard[1]];
    sum = firstCard[0] + secondCard[0];
    renderGame();
}

function renderGame() {
    cardsEl.textContent = "Cards: ";
    for (let i = 0; i < cards.length; i += 1) {
        cardsEl.textContent += cards[i] + " ";
    }
    sumdisp = sum;
    for (let i = 0; i < aces; i += 1) {
        if (sumdisp <= 21) { break; }
        else { sumdisp -= 10; }
    }
    sumEl.textContent = "Sum: " + sumdisp;
    if (sumdisp < 21) {
        message = "Do you want to draw a new card?";
    } else if (sumdisp > 21) {
        message = "You're out of the game!";
    } else {
        message = "You've got Blackjack!";
    }
    messageEl.textContent = message;
}

function newCard() {
    if (sumdisp < 21) {
        let card = getRandomCard();
        sum += card[0];
        cards.push(card[1]);
        renderGame();
    }
}
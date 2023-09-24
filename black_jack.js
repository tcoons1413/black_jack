let player = {
    name: "Tom",
    chips: '100',
}
let deck = {}
let cards = []
let checkedCards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.querySelector("#sum-el")
let cardsEl = document.querySelector("#cards-el")
let playerEl = document.getElementById("player-el")

function Card(suite, rank) {
    this.suite = suite
    this.rank = rank
    this.value = this.determineValue()
}
Card.prototype.determineValue = function () {
    if (this.rank === "A") {
        return 11
    } else if (["J", "Q", "K"].includes(this.rank)) {
        return 10
    } else {
        return parseInt(this.rank, 10)
    }
}

Card.prototype.toString = function () {
    return `${this.rank} of ${this.suite}`
}

function Deck() {
    this.cards = []
    this.populateDeck()
}

Deck.prototype.populateDeck = function () {
    const suite = ["Clubs", "Diamonds", "Hearts", "Spades"]
    const rank = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
    for (let i = 0; i < suite.length; i++) {
        for (let j = 0; j < rank.length; j++) {
            this.cards.push(new Card(suite[i], rank[j]))
        }
    }
}

Deck.prototype.shuffleDeck = function () {
    for (let i = this.cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = this.cards[i]
        this.cards[i] = this.cards[j]
        this.cards[j] = temp
    }
}

Deck.prototype.dealOne = function () {
    return this.cards.pop()
}

Deck.prototype.toString = function () {
    return this.cards.join(", ")
}

function startGame() {
    isAlive = true
    deck = new Deck()
    deck.shuffleDeck()
    let firstCard = deck.dealOne()
    let secondCard = deck.dealOne()
    cards = [firstCard, secondCard]
    checkedCards.push(firstCard.rank)
    checkedCards.push(secondCard.rank)
    sum = firstCard.value + secondCard.value
    renderGame()
}

function renderGame() {
    cardsEl.textContent = `Cards: `
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " - "
    }
    sumEl.textContent = "Sum: " + sum
    if (sum < 21) {
        message = "Do yo u want another card?"
    } else if (sum === 21) {
        message = "WooHoo! Black Jack!"
        hasBlackJack = true
    } else {
        message = "You Lost!"
        isAlive = false
    }
    messageEl.textContent = message
}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        new_card = deck.dealOne();
        checkedCards = [...checkedCards, new_card.rank]
        sum += new_card.value
        cards.push(new_card)
        if (sum > 21 && checkedCards.includes("A")) {
            sum = sum - 10
            let index = checkedCards.indexOf("A")
            checkedCards.splice(index, 1)
            console.log(checkedCards)
        }
        renderGame()
    }
}


// window.onload = function () {
//     if (!player.name) {
//         player.name = prompt("Enter Name: ")
//         playerEl.textContent = player.name + ": $" + player.chips
//     }
// }



function renderSearchCards() {
    const heroCards = document.getElementById("hero-cards")
    clearCards(heroCards)
    this.forEach(character => {
        const card = createCharacterCard.call(character)
        heroCards.appendChild(card)
        heroCards.style.flexDirection = "row"
        heroCards.style.flexWrap = "wrap"
    })
}

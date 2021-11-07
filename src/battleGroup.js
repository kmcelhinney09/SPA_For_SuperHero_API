function addToBattleGroup(){
    const updateData = {
        "id": this.id,
        "character": this
      }
      const patchRequest = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(updateData)
      }
      fetch("http://localhost:3000/battleGroup", patchRequest)
}


function removeFromBattleGroup(){
    const fetchURL = "http://localHost:3000/battleGroup/" + this.id
      const patchRequest = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
      fetch(fetchURL, patchRequest)
}

function renderBattleCards() {
    const heroCards = document.getElementById("battle-group")
    clearCards(heroCards)
    this.forEach(character => {
        const card = createCharacterCard.call(character)
        heroCards.appendChild(card)
        heroCards.style.flexDirection = "row"
        heroCards.style.flexWrap = "wrap"
    })
}

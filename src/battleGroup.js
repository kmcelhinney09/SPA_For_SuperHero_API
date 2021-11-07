function addToBattleGroup() {
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


function removeFromBattleGroup() {
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
  fetch("http://localhost:3000/liked")
    .then(res => res.json())
    .then(characterID => {
      fetch("http://localhost:3000/battleGroup")
        .then(res => res.json())
        .then(battleGroupStatus => {
          const characterIDStatus = []
          const inBattleGroup = []
          characterID.forEach(characterInfo => {
            characterIDStatus.push(characterInfo.id)
          })
          battleGroupStatus.forEach(battleGroupInfo => {
            inBattleGroup.push(battleGroupInfo.id.toString())
          })
          this.map(character => {
            console.log(character)
            const characterSlugSplit = character.slug.split("-")
            let liked = false
            let inGroup = false
            if (characterIDStatus.includes(characterSlugSplit[0])) {
              liked = true
            }
            if (inBattleGroup.includes(characterSlugSplit[0])) {
              inGroup = true
            }
            const cardLocation = document.getElementById("battle-group")
            const card = createCharacterCard.call(character, liked, inGroup)
            cardLocation.appendChild(card)
          })

        })
    })
}

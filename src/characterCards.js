function createCharacterCard(liked) {
    const cardDiv = document.createElement("div")
    if (this.biography.alignment === "good") {
        cardDiv.className = "alignmentGood"
    } else {
        cardDiv.className = "alignmentBad"
    }
    // cardDiv.setAttribute("class", "characterCard")
    const upperCard = document.createElement("div")
    upperCard.className = "upperCard"

    const alignmentElement = document.createElement("h3")
    alignmentElement.textContent = this.biography.alignment.toUpperCase()
    alignmentElement.className = "alignment"
    upperCard.appendChild(alignmentElement)

    const publisherElement = document.createElement('h3')
    publisherElement.textContent = this.biography.publisher
    publisherElement.className = "publisher"
    upperCard.appendChild(publisherElement)

    const characterImage = document.createElement('img')
    const imageText = document.createElement('div')
    imageText.className = "imageText"
    characterImage.src = this.images.md
    characterImage.setAttribute("class", "characterImage")
    imageText.appendChild(characterImage)
    upperCard.appendChild(imageText)

    const middleCard = document.createElement("div")
    middleCard.className = "middleCard"

    const characterName = document.createElement("h2")
    characterName.textContent = `${this.id} - ${this.name}`
    middleCard.appendChild(characterName)

    const lowerCard = document.createElement('div')
    lowerCard.className = "lowerCard"

    const sectionBioandStats = document.createElement("ul")
    const biographyLabel = document.createElement("li")
    biographyLabel.textContent = "Biography"

    sectionBioandStats.appendChild(biographyLabel)

    const characterBio = document.createElement('ul')

    const characterFullName = document.createElement('li')
    characterFullName.textContent = `Full Name: ${this.biography.fullName}`
    characterBio.appendChild(characterFullName)

    const characterRace = document.createElement('li')
    characterRace.textContent = `Race: ${this.appearance.race}`
    characterBio.appendChild(characterRace)

    const characterPlaceOfBirth = document.createElement('li')
    characterPlaceOfBirth.textContent = `Place of Birth: ${this.biography.placeOfBirth}`
    characterBio.appendChild(characterPlaceOfBirth)

    const characterFirstApperance = document.createElement('li')
    characterFirstApperance.textContent = `First Apperance: ${this.biography.firstAppearance}`
    characterBio.appendChild(characterFirstApperance)

    const characterOccupation = document.createElement('li')
    characterOccupation.textContent = `Occupation: ${this.work.occupation}`
    characterBio.appendChild(characterOccupation)

    sectionBioandStats.appendChild(characterBio)




    const powerStatsLabel = document.createElement('li')
    powerStatsLabel.textContent = "POWERSTATS"

    const characterPowerStats = document.createElement('ul')

    const characterCombat = document.createElement('li')
    characterCombat.textContent = `Combat: ${this.powerstats.combat}`
    characterPowerStats.appendChild(characterCombat)

    const characterDurability = document.createElement('li')
    characterDurability.textContent = `Durability ${this.powerstats.durability}`
    characterPowerStats.appendChild(characterDurability)

    const characterIntelligence = document.createElement('li')
    characterIntelligence.textContent = `Intelligence: ${this.powerstats.intelligence}`
    characterPowerStats.appendChild(characterIntelligence)

    const characterPower = document.createElement('li')
    characterPower.textContent = `Power: ${this.powerstats.power}`
    characterPowerStats.appendChild(characterPower)

    const characterSpeed = document.createElement('li')
    characterSpeed.textContent = `Speed: ${this.powerstats.speed}`
    characterPowerStats.appendChild(characterSpeed)

    const characterStrength = document.createElement('li')
    characterStrength.textContent = `Strength: ${this.powerstats.strength}`
    characterPowerStats.appendChild(characterStrength)

    sectionBioandStats.appendChild(powerStatsLabel)
    sectionBioandStats.appendChild(characterPowerStats)

    lowerCard.appendChild(sectionBioandStats)

    const buttonDiv = document.createElement("div")
    let likeBtnStatus = false
    let battleBtnStatus = false
    const likeButton = document.createElement("button")
    likeButton.textContent = "💓Like"
    likeButton.setAttribute("class", "btn")
    likeButton.addEventListener("click", () => {
        if (likeBtnStatus) {
            removeLiked.call(this.id)
            likeButton.style.backgroundColor = "aliceblue"

        } else {
            addLiked.call(this.id)
            likeButton.style.backgroundColor = "red"
        }
        likeBtnStatus = !likeBtnStatus
    })
    if (liked) {
        likeButton.style.backgroundColor = "red"
        likeBtnStatus = !likeBtnStatus
    }

    const battleGroupBtn = document.createElement("button")
    battleGroupBtn.textContent = "Add Battle Group"
    battleGroupBtn.className = "btn"

    battleGroupBtn.addEventListener("click", () => {
        if(battleBtnStatus){
            battleGroupBtn.style.backgroundColor = "aliceblue"
        }else{
            battleGroupBtn.style.backgroundColor = "green"
        }

        battleBtnStatus = !battleBtnStatus
    })
    buttonDiv.appendChild(likeButton)
    buttonDiv.appendChild(battleGroupBtn)

    cardDiv.appendChild(upperCard)
    cardDiv.appendChild(middleCard)
    cardDiv.appendChild(lowerCard)
    cardDiv.appendChild(buttonDiv)

    return cardDiv
}

function populateCards(alphaList) {
    fetch("http://localhost:3000/liked")
        .then(res => res.json())
        .then(characterID => {
            characterIDStatus = []
            characterID.forEach(characterInfo => {
                characterIDStatus.push(characterInfo.id)
            })
            this.map(character => {
                alphaList.forEach(letter => {
                    const characterSlugSplit = character.slug.split("-")
                    let liked = false
                    if (characterSlugSplit[1].startsWith(letter.toLowerCase())) {
                        if (characterIDStatus.includes(characterSlugSplit[0])) {
                            liked = true
                        }
                        const cardLocation = document.getElementById(letter + "Space")
                        const card = createCharacterCard.call(character, liked)
                        cardLocation.appendChild(card)
                    }
                })

            })
        })
}
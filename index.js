document.addEventListener("DOMContentLoaded", () => {
    loadComicData()
    document.getElementById("alphabet-dropdown").addEventListener('click', (e) => {
        const filterValue = e.target.value
        if (filterValue === "All") {
            const cardDivsions = document.getElementById("hero-cards").childNodes
            cardDivsions.forEach(section => {
                clearCards(document.getElementById("hero-cards"))
                loadComicData()
                section.setAttribute("style", "display: block")
            })
        } else {
            const cardDivsions = document.getElementById("hero-cards").childNodes
            cardDivsions.forEach(section => {
                if (section.id !== filterValue) {
                    section.style.display = "none"
                } else {
                    section.style.display = "block"
                }
            })
        }
    })

    const form = document.querySelector(".search-character")
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        const searchStatus = true
        const searchValue = e.target.searchbar.value
        fetch("https://akabab.github.io/superhero-api/api/all.json")
            .then(res => res.json())
            .then(comicData => {
                const characterChoice = []
                const searchChoice = comicData.map(character => {
                    const search = new RegExp(searchValue.toLowerCase())
                    const searchIndex = character.name.toLowerCase().search(search)
                    if (searchIndex > -1) {
                        characterChoice.push(character)
                        // console.log(character)
                    }
                })
                renderSearchCards.call(characterChoice)
            })
        form.reset()
    })
});

function loadComicData() {
    fetch("https://akabab.github.io/superhero-api/api/all.json")
        .then(res => res.json())
        .then(comicData => {
            const characterFirstLetters = createAlpha.call(comicData)
            createAlphaSeperators.call(characterFirstLetters)
            createAlphaSelectors.call(characterFirstLetters)
            populateCards.call(comicData, characterFirstLetters)
        })
}

function createAlpha() {
    const characterLetters = []
    this.forEach(character => {
        if (!characterLetters.includes(character.name[0])) {
            characterLetters.push(character.name[0])
        }
    })
    return characterLetters
}

function createAlphaSeperators() {
    const heroCards = document.getElementById("hero-cards")
    this.map(letter => {
        const div = document.createElement("div")
        div.setAttribute("id", letter)
        const letterHeader = document.createElement("h3")
        letterHeader.textContent = letter
        letterHeader.setAttribute("class", "letter-header")
        const sperator = document.createElement("hr")
        sperator.setAttribute("class", "letter-header")
        div.appendChild(letterHeader)
        div.appendChild(sperator)
        heroCards.appendChild(div)
    })

}

function createAlphaSelectors() {
    const filterDropdown = document.getElementById("alphabet-dropdown")
    this.map(letter => {
        const option = document.createElement("option")
        option.textContent = letter
        filterDropdown.appendChild(option)
    })
}

function createCharacterCard() {
    const cardDiv = document.createElement("div")
    const upperCard = document.createElement("div")

    const alignmentElement = document.createElement("h3")
    alignmentElement.textContent = this.biography.alignment
    upperCard.appendChild(alignmentElement)

    const publisherElement = document.createElement('h3')
    publisherElement.textContent = this.biography.publisher
    upperCard.appendChild(publisherElement)

    const characterImage = document.createElement('img')
    characterImage.src = this.images.md
    upperCard.appendChild(characterImage)

    const middleCard = document.createElement("div")

    const characterName = document.createElement("h2")
    characterName.textContent = `${this.id} - ${this.name}`
    middleCard.appendChild(characterName)

    const biographyLabel = document.createElement("h3")
    biographyLabel.textContent = "Bio"
    middleCard.appendChild(biographyLabel)

    const characterBio = document.createElement('ul')
    const characterFullName = document.createElement('li')
    characterFullName.textContent = `Full Name: ${this.biography.fullName}`
    characterBio.appendChild(characterFullName)

    const characterPlaceOfBirth = document.createElement('li')
    characterPlaceOfBirth.textContent = `Place of Birth: ${this.biography.placeOfBirth}`
    characterBio.appendChild(characterPlaceOfBirth)

    const characterFirstApperance = document.createElement('li')
    characterFirstApperance.textContent = `First Apperance: ${this.biography.firstAppearance}`
    characterBio.appendChild(characterFirstApperance)

    const characterOccupation = document.createElement('li')
    characterOccupation.textContent = `Occupation: ${this.work.occupation}`
    characterBio.appendChild(characterOccupation)

    middleCard.appendChild(characterBio)

    const lowerCard = document.createElement('div')

    const powerStatsLabel = document.createElement('h4')
    powerStatsLabel.textContent = "POWERSTATS"
    lowerCard.appendChild(powerStatsLabel)

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

    const characterRace = document.createElement('p')
    characterRace.textContent = this.appearance.race

    lowerCard.appendChild(characterPowerStats)
    lowerCard.appendChild(characterRace)

    cardDiv.appendChild(upperCard)
    cardDiv.appendChild(middleCard)
    cardDiv.appendChild(lowerCard)

    return cardDiv
}

function populateCards(alphaList) {
    this.map(character => {
        alphaList.forEach(letter => {
            const characterSlugSplit = character.slug.split("-")
            if (characterSlugSplit[1].startsWith(letter.toLowerCase())) {
                const cardLocation = document.getElementById(letter)
                const card = createCharacterCard.call(character)
                cardLocation.appendChild(card)
            }
        })


    })
}

function renderSearchCards() {
    console.log(this)
    const heroCards = document.getElementById("hero-cards")
    clearCards(heroCards)
    this.forEach(character => {
        const card = createCharacterCard.call(character)
        heroCards.appendChild(card)
    })
}

function clearCards(parent){
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
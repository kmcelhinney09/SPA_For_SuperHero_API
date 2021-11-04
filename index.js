let searchStatus = false
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
    const formContainer = document.getElementById("formContainer")
    const searchButton = document.getElementById("find-hero")
    searchButton.addEventListener("click", () => {
        searchStatus = !searchStatus
        if (searchStatus) {
            formContainer.style.display = "block"
            searchButton.textContent = "close"
        } else {
            formContainer.style.display = "none"
            searchButton.textContent = "Find"
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
        div.className = "letterDiv"
        const letterHeader = document.createElement("h1")
        letterHeader.textContent = letter
        letterHeader.setAttribute("class", "letter-header")
        // const sperator = document.createElement("hr")
        // sperator.setAttribute("class", "letter-header")
        const cardSpace = document.createElement("div")
        cardSpace.className = "cardSpace"
        cardSpace.setAttribute("id", letter + "Space")
        div.appendChild(letterHeader)
        // div.appendChild(sperator)
        div.appendChild(cardSpace)
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
    if(this.biography.alignment === "good"){
        cardDiv.className = "alignmentGood"
    }else{
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
    const likeButton = document.createElement("button")
    likeButton.textContent = "Like"
    likeButton.setAttribute("class", "btn")
    buttonDiv.appendChild(likeButton)

    cardDiv.appendChild(upperCard)
    cardDiv.appendChild(middleCard)
    cardDiv.appendChild(lowerCard)
    cardDiv.appendChild(buttonDiv)

    return cardDiv
}

function populateCards(alphaList) {
    this.map(character => {
        alphaList.forEach(letter => {
            const characterSlugSplit = character.slug.split("-")
            if (characterSlugSplit[1].startsWith(letter.toLowerCase())) {
                const cardLocation = document.getElementById(letter + "Space")
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

function clearCards(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
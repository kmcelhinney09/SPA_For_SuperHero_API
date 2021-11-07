let searchStatus = false
let battleGroupBtnStatus = false
document.addEventListener("DOMContentLoaded", () => {
    loadComicData()
    document.getElementById("alphabet-dropdown").addEventListener("change", (e) => {
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
    const battleGroupBtn = document.getElementById("battle-group-btn")
    battleGroupBtn.addEventListener("click", () => {
        if (battleGroupBtnStatus) {
            document.getElementById("battle-group-section").style.display = "none"
            battleGroupBtn.textContent = "Show Battle Group"
            clearCards(document.getElementById("hero-cards"))
            loadComicData()
        } else {
            document.getElementById("battle-group-section").style.display = "flex"
            battleGroupBtn.textContent = "Hide Battle Group"
            clearCards(document.getElementById("battle-group"))
            fetch("http://localhost:3000/battleGroup")
                .then(res => res.json())
                .then(battleGroupData => {
                    const battleGroup = []
                    battleGroupData.forEach(characterData => {
                        battleGroup.push(characterData.character)
                    })
                    renderBattleCards.call(battleGroup)
                })
        }
        battleGroupBtnStatus = !battleGroupBtnStatus
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
        const cardSpace = document.createElement("div")
        cardSpace.className = "cardSpace"
        cardSpace.setAttribute("id", letter + "Space")
        div.appendChild(letterHeader)
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



function clearCards(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
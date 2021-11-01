document.addEventListener("DOMContentLoaded", () => {
    loadComicData()
});

function loadComicData() {
    fetch("https://akabab.github.io/superhero-api/api/all.json")
        .then(res => res.json())
        .then(comicData => {
            const characterFirstLetters = createAlpha.call(comicData)
            createAlphaSeperators.call(characterFirstLetters)
            createAlphaSelectors.call(characterFirstLetters)
        })
}

function createAlpha(){
    const characterLetters = []
    this.forEach(character =>{
        if(!characterLetters.includes(character.name[0])){
            characterLetters.push(character.name[0])
        }
    })
    return characterLetters
}

function createAlphaSeperators(){
    const heroCards = document.getElementById("hero-cards")
    this.map(letter => {
        const div = document.createElement("div")
        div.setAttribute("id", letter)
        const letterHeader = document.createElement("h3")
        letterHeader.textContent = letter
        letterHeader.setAttribute("class","letter-header")
        const sperator = document.createElement("hr")
        sperator.setAttribute("class","letter-header")
        div.appendChild(letterHeader)
        div.appendChild(sperator)
        heroCards.appendChild(div)
    })
    
}

function createAlphaSelectors(){
    const filterDropdown = document.getElementById("alphabet-dropdown" )
    this.map(letter =>{
        const option = document.createElement("option")
        option.textContent = letter
        filterDropdown.appendChild(option)
    })
}
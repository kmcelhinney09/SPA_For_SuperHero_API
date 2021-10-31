document.addEventListener("DOMContentLoaded", () => {
    loadComicData()
});

function loadComicData() {
    fetch("https://akabab.github.io/superhero-api/api/all.json")
        .then(res => res.json())
        .then(comicData => {
            createAlphaSeperators(comicData)
        })
}

function createAlpha(comicArray){
    const characterLetters = []
    comicArray.forEach(character =>{
        if(!characterLetters.includes(character.name[0])){
            characterLetters.push(character.name[0])
        }
    })
    return characterLetters
}

function createAlphaSeperators(comicArray){
    const lettersForSperators = createAlpha(comicArray)
    const heroCards = document.getElementById("hero-cards")
    lettersForSperators.map(letter => {
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


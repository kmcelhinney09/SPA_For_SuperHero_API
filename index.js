document.addEventListener("DOMContentLoaded", () => {

});

function comicData() {
    fetch("https://akabab.github.io/superhero-api/api/all.json")
        .then(res => res.json())
        .then(comicData => {
            console.log(comicData)
        })
}

comicData()
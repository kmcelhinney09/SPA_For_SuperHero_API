function addToBattleGroup(){
    const battleGroup = []
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
      battleGroup.push(this)
      console.log(battleGroup)
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

function renderBattleGroup(){

}
function addLiked(){
    const updateData = {
        "id": this.toString()
      }
      const patchRequest = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(updateData)
      }
      fetch("http://localhost:3000/liked", patchRequest)
}

function removeLiked(){
    const fetchURL = "http://localHost:3000/liked/" + this
    const updateData = {
        "id": this.toString()
      }
      const patchRequest = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(updateData)
      }
      fetch(fetchURL, patchRequest)
}
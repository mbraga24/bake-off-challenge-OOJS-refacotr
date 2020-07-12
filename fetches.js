class APIAdapter {

  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  bakeWinner() {
    return fetch(`${this.baseUrl}/winner`).then(resp => resp.json())
  }

  fetchInitialData() {
    return fetch(this.baseUrl).then(resp => resp.json())
  }
  
  createNewBake(newBake) {
    return fetch(this.baseUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"      
              },
              body: JSON.stringify(newBake)
            })
            .then(resp => resp.json())
  }

  updateBakeScore(newScore, bakeId) {
    return fetch(`${this.baseUrl}/${bakeId}/ratings`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 699a9ff1-88ca-4d77-a26e-e4bc31cfc261"
              },
              body: JSON.stringify({
                score: newScore
              })
            })
            .then(resp => resp.json())
  }
}
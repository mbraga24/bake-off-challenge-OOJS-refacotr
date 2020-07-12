class BakeCard {
  constructor(bake) {
    this.bake = bake
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(event.target.score.value)
    const newScore = event.target.score.value
  
    adapter.updateBakeScore(newScore, this.bake.id)
    .then((updatedBake) => {
      this.bake.score = newScore
    })
  }

  renderCard() {
    this.detailContainer = document.querySelector('#detail')
    this.detailContainer.innerHTML = `
      <img src="${this.bake.image_url}" alt="${this.bake.name}">
      <h1>${this.bake.name}</h1>
      <p class="description">
        ${this.bake.description}
      </p>
      <form id="score-form" data-id="${this.bake.id}">
        <input value="${this.bake.score}" type="number" name="score" min="0" max="10" step="1">
        <input type="submit" value="Rate">
      </form>
    `
  
    const scoreForm = this.detailContainer.querySelector('#score-form')
    
    scoreForm.addEventListener('submit', this.handleSubmit)
  }
}
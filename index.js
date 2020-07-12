const adapter = new APIAdapter("http://localhost:3000/bakes")

const newBakeForm = document.querySelector('#new-bake-form')

document.querySelector('#judge-bake-button').addEventListener('click', (event) => {
  adapter.bakeWinner()
  .then(bakeWinner => {
    const winner = document.querySelector(`li[data-id="${bakeWinner.id}"]`)
    winner.classList.add("winner")
  })
})

newBakeForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const newBake = {
    name: event.target.name.value, 
    image_url: event.target.image_url.value,
    description: event.target.description.value
  }

  adapter.createNewBake(newBake)
  .then(newBakeData => {
    renderBakeSideBar(newBakeData)
  })
})

// fetch data
adapter.fetchInitialData()
.then(bakes => {
  renderAllBakes(bakes)
  renderDetail(bakes[0])
})

function renderBakeSideBar(bake) {
  const bakesContainer = document.querySelector('#bakes-container')
  const bakeLi = document.createElement('li')

  bakeLi.className = "item"
  bakeLi.dataset.id = bake.id
  bakeLi.innerText = bake.name

  bakeLi.addEventListener('click', (event) => {
    renderDetail(bake)
  })

  bakesContainer.append(bakeLi)
}

function renderAllBakes(bakes) {
  bakes.forEach(bake => renderBakeSideBar(bake))
}

function renderDetail(bake) {
  const detailContainer = document.querySelector('#detail')
  detailContainer.innerHTML = `
    <img src="${bake.image_url}" alt="${bake.name}">
    <h1>${bake.name}</h1>
    <p class="description">
      ${bake.description}
    </p>
    <form id="score-form" data-id="${bake.id}">
      <input value="${bake.score}" type="number" name="score" min="0" max="10" step="1">
      <input type="submit" value="Rate">
    </form>
  `

  detailContainer.querySelector('#score-form').addEventListener('submit', (event) => {
    event.preventDefault()
    const newScore = event.target.score.value
  
    adapter.updateBakeScore(newScore, bake.id)
    .then((updatedBake) => {
      bake.score = newScore
    })
  })
}


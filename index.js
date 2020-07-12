const adapter = new APIAdapter("http://localhost:3000/bakes")

// DOM elements
const newBakeForm = document.querySelector('#new-bake-form')
const bakesContainer = document.querySelector('#bakes-container')
const judgeBtn = document.querySelector('#judge-bake-button')

const judgeButton = new JudgeButton(judgeBtn, {
  onClick: () => {
    adapter.bakeWinner()
    .then(bakeWinner => {
      const winner = document.querySelector(`li[data-id="${bakeWinner.id}"]`)
      winner.classList.add("winner")
    })
  }
})

const bakeForm = new BakeForm(newBakeForm, {
  onSubmit: (formData) => {
    adapter.createNewBake(formData)
    .then(newBakeData => {
      const sideBar = new SideBar(newBakeData, bakesContainer, {
        onClick: (bakeData) => {
          const bakeCard = new BakeCard(bakeData)
          bakeCard.renderCard()
        }
      })
      sideBar.renderBakeSideBar()
    })
  }
})

function renderAllBakes(bakes) {
  bakes.forEach(bake => {
    const sideBar = new SideBar(bake, bakesContainer, {
      onClick: (bakeData) => {
        const bakeCard = new BakeCard(bakeData)
        bakeCard.renderCard()
      }
    })
    sideBar.renderBakeSideBar(bake)
  })
}

// Initial fetch
adapter.fetchInitialData()
.then(bakes => {
  renderAllBakes(bakes)
  const bakeCard = new BakeCard(bakes[0])
  bakeCard.renderCard()
})
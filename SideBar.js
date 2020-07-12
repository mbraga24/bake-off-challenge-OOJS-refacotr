class SideBar {
    constructor(bake, parentElement, callbacks) {
      this.bake = bake
      this.parentElement = parentElement
      this.onClick = callbacks.onClick
    }

    handleClick = (event) => {
      this.onClick(this.bake)
    }

    renderBakeSideBar() {
      const bakeLi = document.createElement('li')
    
      bakeLi.className = "item"
      bakeLi.dataset.id = this.bake.id
      bakeLi.innerText = this.bake.name
    
      bakeLi.addEventListener('click', this.handleClick)
    
      this.parentElement.append(bakeLi)
    }
}
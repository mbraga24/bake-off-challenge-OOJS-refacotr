class JudgeButton {
  constructor(button, callbacks) {
    this.button = button
    this.onClick = callbacks.onClick

    this.button.addEventListener('click', this.handleClick)
  }

  handleClick = () => {
    this.onClick()
  }
  
}
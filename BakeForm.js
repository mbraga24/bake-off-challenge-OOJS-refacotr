class BakeForm {
  constructor(form, callbacks) {
    this.form = form
    this.onSubmit = callbacks.onSubmit
    this.form.addEventListener('submit', this.handleSubmit)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const data = {}
    for (let element of event.target.elements) {
      if (element.type !== 'submit') {
        data[element.name] = element.value
      }
    }
    this.onSubmit(data)
  }
}
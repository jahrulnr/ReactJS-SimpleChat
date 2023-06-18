class Message {

  #data = {}

  set = (data) => {
    this.#data.id = data.id
    this.#data.from_id = data.from_id
    this.#data.to_id = data.to_id
    this.#data.text = data.text
    this.#data.readed = data.readed
    this.#data.created_at = data.created_at
  }

  get = () => this.#data

}

export default Message
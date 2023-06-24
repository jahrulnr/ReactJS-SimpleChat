class Friend {

  #data = {}

  set = (data) => {
    this.#data.id = data.friend_id ?? data.id
    this.#data.name = data.name
    this.#data.username = data.username
  }

  get = () => this.#data

}

export default Friend
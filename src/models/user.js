class User {

  #data = {}

  set = (data) => {
    this.#data.id = data.id
    this.#data.name = data.name
    this.#data.username = data.username
    this.#data.email = data.email
    this.#data.role = data.role
  }

  get = () => this.#data

}

export default User
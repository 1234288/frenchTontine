export default class Role {
  _id: string
  name: string
  description: string

  constructor(_id = '-1', name = '', description = '') {
    this._id = _id
    this.name = name
    this.description = description
  }
}

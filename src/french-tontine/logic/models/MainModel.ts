export default class MainModel {
  _id: string
  createdBy: null | number
  createdAt: string
  updatedBy: null | number
  updatedAt: string
  deletedBy: null | number
  deletedAt: string

  constructor(
    _id = '-1',
    createdBy = null,
    createdAt = '',
    updatedBy = null,
    updatedAt = '',
    deletedBy = null,
    deletedAt = ''
  ) {
    this._id = _id
    this.createdBy = createdBy
    this.createdAt = createdAt
    this.updatedBy = updatedBy
    this.updatedAt = updatedAt
    this.deletedBy = deletedBy
    this.deletedAt = deletedAt
  }
}

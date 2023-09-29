import MainModel from './MainModel'

export default class Country extends MainModel {
  name: string

  constructor(
    _id = '-1',
    createdBy = null,
    createdAt = '',
    updatedBy = null,
    updatedAt = '',
    deletedBy = null,
    deletedAt = '',
    name = ''
  ) {
    super(_id, createdBy, createdAt, updatedBy, updatedAt, deletedBy, deletedAt)

    this.name = name
  }
}

import MainModel from './MainModel'
import Tontine from './Tontine'
import User from './User'

export default class TontineCandidate extends MainModel {
  userId: User
  tontineId: Tontine
  status: string

  constructor(
    _id = '-1',
    createdBy = null,
    createdAt = '',
    updatedBy = null,
    updatedAt = '',
    deletedBy = null,
    deletedAt = '',

    userId = new User(),
    tontineId = new Tontine(),
    status = ''
  ) {
    super(_id, createdBy, createdAt, updatedBy, updatedAt, deletedBy, deletedAt)

    this.userId = userId
    this.tontineId = tontineId
    this.status = status
  }
}

import Country from './Country'
import MainModel from './MainModel'

export default class Inscription extends MainModel {
  firstname: string
  lastname: string
  email: string
  phoneNumber: string
  phoneNumber2: string
  residenceCity: string
  residenceCountry: Country
  functionT: string
  additionalInformation: string
  rejectionReason: string
  status: string
  emailVerified: boolean
  emailVerifiedAt: Date
  avatar : any

  constructor(
    _id = '-1',
    createdBy = null,
    createdAt = '',
    updatedBy = null,
    updatedAt = '',
    deletedBy = null,
    deletedAt = '',
    firstname = '',
    lastname = '',
    email = '',
    phoneNumber = '',
    phoneNumber2 = '',
    residenceCity = '',
    residenceCountry = new Country(),
    functionT = '',
    additionalInformation = '',
    rejectionReason = '',
    status = '',
    emailVerified = false,
    emailVerifiedAt = new Date()
  ) {
    super(_id, createdBy, createdAt, updatedBy, updatedAt, deletedBy, deletedAt)

    this.firstname = firstname
    this.lastname = lastname
    this.email = email
    this.phoneNumber = phoneNumber
    this.phoneNumber2 = phoneNumber2
    this.residenceCity = residenceCity
    this.residenceCountry = residenceCountry
    this.functionT = functionT
    this.additionalInformation = additionalInformation
    this.rejectionReason = rejectionReason
    this.status = status
    this.emailVerified = emailVerified
    this.emailVerifiedAt = emailVerifiedAt
    this.avatar = this.avatar
  }
}

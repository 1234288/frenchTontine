import Country from './Country'
import MainModel from './MainModel'
import Role from './Role'

export default class User extends MainModel {
  id: string
  firstname: string
  lastname: string
  email: string
  phoneNumber: string
  phoneNumber2: string
  residenceCity: string
  residenceCountry: Country
  functionT: string
  status: string
  roles: Role[]
  accountActivatedAt: Date
  passwordChanged: boolean
  password: string
  avatar: any

  constructor(
    id = '0',
    _id = '-1',
    createdBy = null,
    createdAt = '',
    updatedBy = null,
    updatedAt = '',
    deletedBy = null,
    deletedAt = '',
    firstname = '',
    lastname = '',
    phoneNumber = '',
    phoneNumber2 = '',
    email = '',
    status = '',
    residenceCity = '',
    residenceCountry = new Country(),
    functionT = '',
    accountActivatedAt = new Date(),
    roles = [],
    passwordChanged = true,
    password = '',
    avatar = null
  ) {
    super(_id, createdBy, createdAt, updatedBy, updatedAt, deletedBy, deletedAt)

    this.id = id
    this.firstname = firstname
    this.lastname = lastname
    this.phoneNumber = phoneNumber
    this.phoneNumber2 = phoneNumber2
    this.email = email
    this.status = status
    this.residenceCity = residenceCity
    this.residenceCountry = residenceCountry
    this.accountActivatedAt = accountActivatedAt
    this.roles = roles
    this.passwordChanged = passwordChanged
    this.functionT = functionT
    this.password = password
    this.avatar = avatar
  }
}

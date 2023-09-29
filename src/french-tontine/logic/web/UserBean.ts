import User from '../models/User'
import UserService from '../services/UserService'
import MainBean from './MainBean'

export default class UserBean extends MainBean {
  constructor() {
    super('user', 'userService', new User(), new UserService())
  }
}

// ** Axios
import axios from 'src/configs/axios-config'

// ** Config
import { getHeadersInformation, resetPasswordUrl } from 'src/french-tontine/logic/utils/constant'

import MainService from './MainService'

export default class UserService extends MainService {
  constructor() {
    super('')
  }

  create(object: any) {
    return new Promise((resolve, reject) => {
      axios
        .post('/auth/add-user', object, {
          headers: {
            ...getHeadersInformation()
          }
        })
        .then(response => {
          resolve(response.data.data)
        })
        .catch(error => {
          console.log('object :: ', object)
          console.log('error.response.data.status :: ', Object.keys(error.response.data.status))
          this.errorManagement(error)
          reject(error.response.data.status)
        })
    })
  }

  update(object: any) {
    return new Promise((resolve, reject) => {
      axios
        .put('/users/update', object, {
          headers: {
            ...getHeadersInformation()
          }
        })
        .then(response => {
          resolve(response.data.data)
        })
        .catch(error => {
          console.log('object :: ', object)
          console.log('error.response.data :: ', Object.keys(error.response.data))
          this.errorManagement(error)
          reject(error.response.data.status)
        })
    })
  }

  accountActivation(token: string) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/auth/account-activation?token=${token}`)
        .then(response => {
          resolve(response.data.data)
        })
        .catch(error => {
          console.log('error.request :: ', Object.keys(error.request))
          this.errorManagement(error)
          reject(error.response.data.status)
        })
    })
  }

  emailVerification(token: string) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/inscription/verify-email?token=${token}`)
        .then(response => {
          resolve(response.data.data)
        })
        .catch(error => {
          console.log('error.request :: ', Object.keys(error.request))
          this.errorManagement(error)
          reject(error.response.data.status)
        })
    })
  }

  passwordChanged(object: any) {
    return new Promise((resolve, reject) => {
      axios
        .post('/auth/change-password', object, {
          headers: {
            ...getHeadersInformation()
          }
        })
        .then(response => {
          resolve(response.data.data)
        })
        .catch(error => {
          this.errorManagement(error)
          reject(error.response.data.status)
        })
    })
  }

  readAll() {
    return new Promise(resolve => {
      axios
        .get('/users/list', {
          headers: {
            ...getHeadersInformation()
          }
        })
        .then(response => {
          resolve(response.data.data)
        })
        .catch(error => {
          this.errorManagement(error)
          resolve(false)
        })
    })
  }

  resetPassword(email: string) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          '/auth/send-reset-password-email',
          {
            email: email,
            resetPwdUrl: resetPasswordUrl
          },
          {
            headers: {
              ...getHeadersInformation()
            }
          }
        )
        .then(response => {
          resolve(response.data.data)
        })
        .catch(error => {
          this.errorManagement(error)
          reject(error.response.data.status)
        })
    })
  }

  resetPasswordBody(object: any) {
    return new Promise((resolve, reject) => {
      axios
        .post('/auth/reset-password', object, {
          headers: {
            ...getHeadersInformation()
          }
        })
        .then(response => {
          resolve(response.data.data)
        })
        .catch(error => {
          this.errorManagement(error)
          reject(error.response.data.status)
        })
    })
  }

  disableUser(id: string) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/users/change-status?id=${id}&status=disabled`, {
          headers: {
            ...getHeadersInformation()
          }
        })
        .then(response => {
          resolve(response.data.data)
        })
        .catch(error => {
          this.errorManagement(error)
          reject(error.response.data.status)
        })
    })
  }

  activateUser(id: string) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/users/change-status?id=${id}&status=activated`, {
          headers: {
            ...getHeadersInformation()
          }
        })
        .then(response => {
          resolve(response.data.data)
        })
        .catch(error => {
          this.errorManagement(error)
          reject(error.response.data.status)
        })
    })
  }
}

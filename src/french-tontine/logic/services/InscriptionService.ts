// ** Axios
import axios from 'src/configs/axios-config'

// ** Config
import { getHeadersInformation } from 'src/french-tontine/logic/utils/constant'

import MainService from './MainService'

export default class InscriptionService extends MainService {
  constructor() {
    super('/inscription/list')
  }

  readAll() {
    return new Promise(resolve => {
      axios
        .get('/inscription/list', {
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

  validateRegistration(id: string) {
    return new Promise((resolve, reject) => {
      axios
        .get('/inscription/validate?id=' + id, {
          headers: {
            ...getHeadersInformation()
          }
        })
        .then(response => {
          resolve(response.data.status.code)
        })
        .catch(error => {
          console.log('error.response.data :: ', Object.keys(error.response.data))
          console.log('id :: ', id)
          console.log('error.response.data.status.description :: ', error.response.data.status.description)

          // this.errorManagement(error) // description
          reject(error.response.data.status.description)
        })
    })
  }

  rejectRegistration(id: string, rejectionReason: string) {
    const data = {
      id,
      rejectionReason
    }
    console.log('data :: ', data)

    return new Promise((resolve, reject) => {
      axios
        .put('/inscription/reject', data, {
          headers: {
            ...getHeadersInformation()
          }
        })
        .then(response => {
          resolve(response.data.status.code)
        })
        .catch(error => {
          console.log('error.response.data :: ', Object.keys(error.response.data))
          console.log('id :: ', id)
          console.log('error.response.data.status.description :: ', error.response.data.status.description)

          // this.errorManagement(error) // description
          reject(error.response.data.status.description)
        })
    })
  }
}

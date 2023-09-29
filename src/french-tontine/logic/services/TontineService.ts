// ** Axios
import axios from 'src/configs/axios-config'

// ** Config
import { getHeadersInformation } from 'src/french-tontine/logic/utils/constant'

import MainService from './MainService'

export default class TontineService extends MainService {
  constructor() {
    super('/tontine/list')
  }

  readAll() {
    return new Promise(resolve => {
      axios
        .get('/tontine/find', {
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

  create(object: any) {
    return new Promise((resolve, reject) => {
      axios
        .post('/tontine/create', object, {
          headers: {
            ...getHeadersInformation()
          }
        })
        .then(response => {
          resolve(response.data.status.code)
        })
        .catch(error => {
          console.log('error.response.data :: ', Object.keys(error.response.data))
          console.log('object :: ', object)
          console.log('error.response.data.status.description :: ', error.response.data.status.description)

          // this.errorManagement(error) // description
          reject(error.response.data.status.description)
        })
    })
  }

  update(object: any) {
    return new Promise((resolve, reject) => {
      axios
        .put('/tontine/update', object, {
          headers: {
            ...getHeadersInformation()
          }
        })
        .then(response => {
          resolve(response.data.status.code)
        })
        .catch(error => {
          console.log('error.response.data :: ', Object.keys(error.response.data))
          console.log('object :: ', object)
          console.log('error.response.data.status.description :: ', error.response.data.status.description)

          // this.errorManagement(error) // description
          reject(error.response.data.status.description)
        })
    })
  }

  changeStatus(id: string, status: string) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/tontine/change-status?id=${id}&status=${status}`, {
          headers: {
            ...getHeadersInformation()
          }
        })
        .then(response => {
          resolve(response.data.status.code)
        })
        .catch(error => {
          console.log('error.response.data :: ', Object.keys(error.response.data))
          console.log('object :: ', id)
          console.log('error.response.data.status.description :: ', error.response.data.status.description)

          // this.errorManagement(error) // description
          reject(error.response.data.status.description)
        })
    })
  }

  joinTontine(userId: string, tontineId: string) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `/tontine/join`,
          {
            userId,
            tontineId
          },
          {
            headers: {
              ...getHeadersInformation()
            }
          }
        )
        .then(response => {
          resolve(response.data.status.code)
        })
        .catch(error => {
          console.log('error.response.data :: ', Object.keys(error.response.data))
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

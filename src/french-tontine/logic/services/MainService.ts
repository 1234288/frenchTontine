// ** Axios
import axios from 'src/configs/axios-config'

// ** Config
import { getHeadersInformation } from 'src/french-tontine/logic/utils/constant'

export default class MainService {
  url: string

  constructor(url: string, routeFor = '') {
    this.url = url + routeFor
  }

  create(object: any) {
    return new Promise(resolve => {
      axios
        .post(`${this.url}`, object, {
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

  update(object: any, id: string) {
    console.log('id :: ', id)

    return new Promise(resolve => {
      axios
        .put(`${this.url}`, object, {
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

  readAll() {
    return new Promise(resolve => {
      axios
        .get(`${this.url}/all`, {
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

  errorManagement(error: any) {
    console.log(' error  :: ', error)
  }
}

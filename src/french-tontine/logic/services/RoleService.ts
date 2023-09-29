// ** Axios
import axios from 'src/configs/axios-config'

// ** Config
import { getHeadersInformation } from 'src/french-tontine/logic/utils/constant'

import MainService from './MainService'

export default class RoleService extends MainService {
  constructor() {
    super('/roles')
  }

  readAll() {
    return new Promise(resolve => {
      axios
        .get('/roles', {
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
}

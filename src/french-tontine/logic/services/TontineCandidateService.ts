// ** Axios
import axios from 'src/configs/axios-config'

// ** Config
import { getHeadersInformation } from 'src/french-tontine/logic/utils/constant'

export default class TontineCandidateService {
  readAll(tontineId: string) {
    return new Promise(resolve => {
      axios
        .get(`/tontine/joining-req-list?tontineId=${tontineId}`, {
          headers: {
            ...getHeadersInformation()
          }
        })
        .then(response => {
          resolve(response.data.data)
        })
        .catch(error => {
          console.log('error  :: ', error)
          resolve(false)
        })
    })
  }

  processJoiningReq(userId: string[], tontineId: string, action: string) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          '/tontine/process-joining-req',
          {
            userId,
            tontineId,
            action
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
}

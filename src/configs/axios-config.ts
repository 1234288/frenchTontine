import axios from 'axios'

import authConfig from 'src/configs/auth'

const instance = axios.create({
  baseURL: 'https://french-tontine-api.his-tech.tech', // 'http://161.97.92.156:9001' // 'https://french-tontine-api.his-tech.tech', // 'http://10.228.11.220:9196', // Set your base URL here
  // You can also define other custom configuration options
  timeout: 5000, // Request timeout
  headers: {
    'Content-Type': 'application/json'
  }
})

const logout = () => {
  window.localStorage.removeItem('frenchTontineUserData')
  window.localStorage.removeItem(authConfig.storageTokenKeyName)

  window.location.reload()
}

// Add a response interceptor
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401 && window.location.pathname !== '/login/') {
      logout()
    }

    return Promise.reject(error)
  }
)

export default instance

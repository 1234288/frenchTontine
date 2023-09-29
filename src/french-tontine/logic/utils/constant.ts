import authConfig from 'src/configs/auth'

export const getHeadersInformation = () => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!

  if (storedToken) {
    return {
      Authorization: `Bearer ${storedToken}`
    }
  }

  return {}
}

export const formatDateTime = (date: string | Date) => {
  const dateF = new Date(date)
  let month: any = dateF.getMonth() + 1

  month = month < 10 ? `0${month}` : month
  const day = dateF.getDate() < 10 ? `0${dateF.getDate()}` : dateF.getDate()
  const hours = dateF.getHours() < 10 ? `0${dateF.getHours()}` : dateF.getHours()
  const minute = dateF.getMinutes() < 10 ? `0${dateF.getMinutes()}` : dateF.getMinutes()
  const seconde = dateF.getSeconds() < 10 ? `0${dateF.getSeconds()}` : dateF.getSeconds()

  return `${dateF.getFullYear()}-${month}-${day} ${hours}:${minute}:${seconde}`
}

export const webSiteUrl = 'https://french-tontine.his-tech.tech/'

export const resetPasswordUrl = 'https://french-tontine-app.his-tech.tech/reset-password/'

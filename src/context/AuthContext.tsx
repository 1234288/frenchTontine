// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'src/configs/axios-config'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import {
  AuthValuesType,
  LoginParams,
  ErrCallbackType,
  UserDataType,
  TwoStepsParams,
  ResetPasswordParams
} from './types'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  twoStepsVerification: () => Promise.resolve(),
  resendCode: () => Promise.resolve(),
  resetPassword: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    console.log(' First +++++++++++++++++++++++++++++++++++++ 1 ')

    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      if (storedToken) {
        setLoading(true)

        if (window.localStorage.getItem('frenchTontineUserData')) {
          const userData = JSON.parse(window.localStorage.getItem('frenchTontineUserData') as string)
          setUser({ ...userData })
          setLoading(false)
        } else {
          localStorage.removeItem('userData')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('accessToken')
          setUser(null)
          setLoading(false)
          if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
            router.replace('/login')
          }
        }
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.loginEndpoint, {
        email: params.email,
        password: params.password
      })
      .then(async response => {
        // console.log('response.data ::: ', response.data.data)

        window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.data.token)
        setUser({ ...response.data.data.user })
        window.localStorage.setItem('frenchTontineUserData', JSON.stringify(response.data.data.user))

        const returnUrl = router.query.returnUrl
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL as string)
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('frenchTontineUserData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const handleTwoStepsVerification = (params: TwoStepsParams, errorCallback?: ErrCallbackType) => {
    const customParam = {
      username: router.query.username,
      otp: params.otp
    }

    axios
      .post(authConfig.twoStepsVerificationEndpoint, customParam)
      .then(async response => {
        window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.data.token)
        setUser({ ...response.data.data.user })
        window.localStorage.setItem('frenchTontineUserData', JSON.stringify(response.data.data.user))

        const returnUrl = router.query.returnUrl
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL as string)
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleResendCode = () => {
    console.log('I already resend code Thanks')
  }

  const handleResetPassword = (params: ResetPasswordParams) => {
    console.log('params ::: ', params)

    const userData = JSON.parse(window.localStorage.getItem('frenchTontineUserData') as string)
    userData.passwordChanged = false

    setUser({ ...userData })
    window.localStorage.setItem('frenchTontineUserData', JSON.stringify(userData))

    const returnUrl = router.query.returnUrl
    const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
    router.replace(redirectURL as string)
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    twoStepsVerification: handleTwoStepsVerification,
    resendCode: handleResendCode,
    resetPassword: handleResetPassword
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }

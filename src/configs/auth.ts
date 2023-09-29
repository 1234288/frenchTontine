export default {
  loginEndpoint: '/auth/signin',
  twoStepsVerificationEndpoint: '/auth/validate-otp',

  meEndpoint: '/auth/me',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'frenchTontineAccessToken',
  onTokenExpiration: 'frenchTontineRefreshToken' // logout | refreshToken
}

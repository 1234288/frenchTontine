// ** React Imports
import { ReactNode, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import InputAdornment from '@mui/material/InputAdornment'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { t } from 'i18next'

import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import UserService from 'src/french-tontine/logic/services/UserService'

interface State {
  showNewPassword: boolean
  showConfirmNewPassword: boolean
}

const defaultValues = {
  newPassword: '',
  confirmNewPassword: ''
}

interface FormData {
  newPassword: string
  confirmNewPassword: string
}

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, obj => {
      if (obj.value.length === 0) {
        return t('Password field is required')
      } else if (obj.value.length > 0 && obj.value.length < obj.min) {
        return t('Password must be at least 8 characters')
      } else {
        return ''
      }
    })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, () =>
      t('Field must contain at least one uppercase, lowercase, special character and digit with min 8 characters')
    )
    .required(),
  confirmNewPassword: yup
    .string()
    .required(() => t('Confirm password field is a required') as string)
    .oneOf([yup.ref('newPassword')], () => t('The Confirm Password field confirmation does not match'))
})

// ** Styled Components
const ResetPasswordIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 650,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}))

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: `${theme.palette.primary.main} !important`
}))

const ResetPasswordV2 = () => {
  // ** States
  const [values, setValues] = useState<State>({
    showNewPassword: false,
    showConfirmNewPassword: false
  })

  // ** Hooks
  const theme = useTheme()
  const router = useRouter()

  // ** Vars
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // Handle New Password
  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }

  // Handle Confirm New Password
  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({ defaultValues, mode: 'onBlur', resolver: yupResolver(schema) })

  const onSubmit = (data: FormData) => {
    const userService = new UserService()
    const { newPassword } = data

    userService
      .resetPasswordBody({
        token: router.query.token,
        email: router.query.email,
        password: newPassword
      })
      .then((user: any) => {
        console.log(' user ', user)

        setTimeout(() => {
          router.replace('/')
        }, 1500)
      })
      .catch(error => {
        console.log('error : ', error)

        if ((error.description as string).toLowerCase().includes('old')) {
          setError('newPassword', {
            type: 'manual',
            message: t(error.description) as string
          })
        }
      })
  }

  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center',
            backgroundColor: 'customColors.bodyBg',
            margin: theme => theme.spacing(8, 0, 8, 8)
          }}
        >
          <ResetPasswordIllustration
            alt='reset-password-illustration'
            src={`/images/pages/auth-v2-reset-password-illustration-${theme.palette.mode}.png`}
          />
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <svg width={34} viewBox='0 0 32 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                fill={theme.palette.primary.main}
                d='M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z'
              />
              <path
                fill='#161616'
                opacity={0.06}
                fillRule='evenodd'
                clipRule='evenodd'
                d='M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z'
              />
              <path
                fill='#161616'
                opacity={0.06}
                fillRule='evenodd'
                clipRule='evenodd'
                d='M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                fill={theme.palette.primary.main}
                d='M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z'
              />
            </svg>
            <Box sx={{ my: 6 }}>
              <Typography variant='h3' sx={{ mb: 1.5 }}>
                {t('Réinitialiser le mot de passe')} 🔒
              </Typography>
              <Typography sx={{ display: 'flex' }}>
                {t('for')}
                <Typography component='span' sx={{ ml: 1, fontWeight: 500 }}>
                  {router.query.email}
                </Typography>
              </Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name='newPassword'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    sx={{ display: 'flex', mb: 4 }}
                    fullWidth
                    label={t('New Password')}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    id='input-new-password'
                    placeholder='············'
                    error={Boolean(errors.newPassword)}
                    type={values.showNewPassword ? 'text' : 'password'}
                    {...(errors.newPassword && { helperText: errors.newPassword.message })}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowNewPassword}
                            onMouseDown={e => e.preventDefault()}
                          >
                            <Icon fontSize='1.25rem' icon={values.showNewPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
              <Controller
                name='confirmNewPassword'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    sx={{ display: 'flex', mb: 4 }}
                    fullWidth
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder='············'
                    label={t('Confirm Password')}
                    id='input-confirm-new-password'
                    error={Boolean(errors.confirmNewPassword)}
                    type={values.showConfirmNewPassword ? 'text' : 'password'}
                    {...(errors.confirmNewPassword && { helperText: errors.confirmNewPassword.message })}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={handleClickShowConfirmNewPassword}
                          >
                            <Icon
                              fontSize='1.25rem'
                              icon={values.showConfirmNewPassword ? 'tabler:eye' : 'tabler:eye-off'}
                            />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
              {/* <CustomTextField
                fullWidth
                autoFocus
                label={t('Nouveau mot de passe')}
                value={values.newPassword}
                placeholder='············'
                sx={{ display: 'flex', mb: 4 }}
                id='auth-reset-password-v2-new-password'
                onChange={handleNewPasswordChange('newPassword')}
                type={values.showNewPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowNewPassword}
                        onMouseDown={e => e.preventDefault()}
                        aria-label='toggle password visibility'
                      >
                        <Icon fontSize='1.25rem' icon={values.showNewPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <CustomTextField
                fullWidth
                label={t('Confirmer le mot de passe')}
                placeholder='············'
                sx={{ display: 'flex', mb: 4 }}
                value={values.confirmNewPassword}
                id='auth-reset-password-v2-confirm-password'
                type={values.showConfirmNewPassword ? 'text' : 'password'}
                onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        aria-label='toggle password visibility'
                        onClick={handleClickShowConfirmNewPassword}
                      >
                        <Icon
                          fontSize='1.25rem'
                          icon={values.showConfirmNewPassword ? 'tabler:eye' : 'tabler:eye-off'}
                        />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              /> */}
              <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
                {t('Définir un nouveau mot de passe')}
              </Button>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { mr: 1 } }}>
                <Typography component={LinkStyled} href='/pages/auth/login-v2'>
                  <Icon fontSize='1.25rem' icon='tabler:chevron-left' />
                  <span>{t('Retour à la connexion')}</span>
                </Typography>
              </Typography>
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}

ResetPasswordV2.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

ResetPasswordV2.guestGuard = true

export default ResetPasswordV2

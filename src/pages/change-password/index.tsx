// ** React Imports
import { ReactNode, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

import { t } from 'i18next'

import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import UserService from 'src/french-tontine/logic/services/UserService'

interface State {
  showNewPassword: boolean
  showConfirmNewPassword: boolean
  showOldPassword: boolean
}

const defaultValues = {
  newPassword: '',
  confirmNewPassword: '',
  oldPassword: ''
}

interface FormData {
  newPassword: string
  confirmNewPassword: string
  oldPassword: string
}

const schema = yup.object().shape({
  oldPassword: yup
    .string()
    .min(8, obj => {
      if (obj.value.length === 0) {
        return t('Old password field is required')
      } else if (obj.value.length > 0 && obj.value.length < obj.min) {
        return t('Old password must be at least 8 characters')
      } else {
        return ''
      }
    })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, () =>
      t('Field must contain at least one uppercase, lowercase, special character and digit with min 8 characters')
    )
    .required(),
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
const Img = styled('img')(({}) => ({}))

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
    showConfirmNewPassword: false,
    showOldPassword: false
  })

  // ** Hooks
  const theme = useTheme()
  const auth = useAuth()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({ defaultValues, mode: 'onBlur', resolver: yupResolver(schema) })

  // ** Vars
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const backToLogin = (event: any) => {
    event.preventDefault()
    auth.logout()
  }

  // Handle New Password
  const handleClickShowOldPassword = () => {
    setValues({ ...values, showOldPassword: !values.showOldPassword })
  }

  // Handle New Password
  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }

  // Handle Confirm New Password
  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }

  const onSubmit = (data: FormData) => {
    const userService = new UserService()
    const { newPassword, oldPassword } = data

    // auth.resetPassword({ newPassword, oldPassword })

    userService
      .passwordChanged({ oldPassword: oldPassword, newPassword })
      .then((user: any) => {
        console.log(' user ', user)

        auth.setUser({ ...user })
        window.localStorage.setItem('frenchTontineUserData', JSON.stringify(user))

        setTimeout(() => {
          router.replace('/')
        }, 1500)
      })
      .catch(error => {
        console.log('error : ', error)

        if ((error.description as string).toLowerCase().includes('old')) {
          setError('oldPassword', {
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
            <Img height='50' alt='error-illustration' src='/images/french-tontine/french-tontine.png' />

            <Box sx={{ my: 6 }}>
              <Typography variant='h3' sx={{ mb: 1.5 }}>
                {t('Change Password')} 🔒
              </Typography>
              <Typography sx={{ display: 'flex' }}>
                {t('for')}{' '}
                <Typography component='span' sx={{ ml: 1, fontWeight: 500 }}>
                  {auth.user?.email}
                </Typography>
              </Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name='oldPassword'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    sx={{ display: 'flex', mb: 4 }}
                    fullWidth
                    autoFocus
                    label={t('Old Password')}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder='············'
                    error={Boolean(errors.oldPassword)}
                    type={values.showOldPassword ? 'text' : 'password'}
                    {...(errors.oldPassword && { helperText: errors.oldPassword.message })}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowOldPassword}
                            onMouseDown={e => e.preventDefault()}
                          >
                            <Icon fontSize='1.25rem' icon={values.showOldPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
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
              <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
                {t('Set New Password')}
              </Button>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { mr: 1 } }}>
                <Typography component={LinkStyled} href='/login' onClick={backToLogin}>
                  <Icon fontSize='1.25rem' icon='tabler:chevron-left' />
                  <span>{t('Back to login')}</span>
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

export default ResetPasswordV2

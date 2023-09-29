// ** React Imports
import { ReactNode, useEffect, useState } from 'react'

// ** Next Import
// import Link from 'next/link'

// ** MUI Components
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Alert from '@mui/material/Alert'
import Slide from '@mui/material/Slide'
import IconButton from '@mui/material/IconButton'

// ** Next Import
import { useRouter } from 'next/router'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Next Import
import Link from 'next/link'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { t } from 'i18next'
import { CircularProgress } from '@mui/material'
import UserService from 'src/french-tontine/logic/services/UserService'

// ** Styled Components
const Img = styled('img')(({}) => ({}))

const VerifyEmailIllustration = styled('img')(({ theme }) => ({
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
  color: theme.palette.primary.main,
  fontSize: theme.typography.body1.fontSize
}))

// const LinkStyled = styled(Link)(({ theme }) => ({
//   textDecoration: 'none',
//   color: `${theme.palette.primary.main} !important`
// }))

let timeoutId: any = null

const VerifyEmailV2 = () => {
  // ** Hooks
  const router = useRouter()

  // ** Hooks
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    console.log(' ---------------------- router.query ', router.query)
    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      if ('token' in router.query && !open) {
        const userService = new UserService()
        userService
          .accountActivation(router.query.token as string)
          .then((rep: any) => {
            console.log(' rep ', rep)
            setLoading(false)
            setIsError(false)
            setOpen(true)
          })
          .catch(error => {
            console.log('error : ', error)
            setLoading(false)
            setIsError(true)
            setErrorMessage(error.description)
          })
      } else if (!open) {
        setLoading(false)
        setIsError(true)
        setErrorMessage('Your activation link is incorrect, please use the correct link')
      }
    }, 1500)
  }, [router])

  // ** Vars
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

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
          <VerifyEmailIllustration
            alt='verify-email-illustration'
            src={`/images/pages/auth-v2-verify-email-illustration-${theme.palette.mode}.png`}
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
              <>
                <Typography variant='h3' sx={{ mb: 1.5 }}>
                  {t('Your account activation is in progress...')} 👁️‍🗨️
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}></Typography>
              </>

              {loading && (
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    position: 'relative',
                    alignItems: 'center',
                    borderRadius: '20px',
                    justifyContent: 'center',
                    backgroundColor: 'customColors.bodyBg',
                    margin: theme => theme.spacing(8, 8, 8, 8),
                    padding: theme => theme.spacing(8, 8, 8, 8)
                  }}
                >
                  <CircularProgress size={60} />
                </Box>
              )}

              {isError && (
                <Alert variant='outlined' severity='error'>
                  {t(errorMessage)}
                </Alert>
              )}

              <Slide in={open} direction='left' {...(open ? { timeout: 500 } : {})}>
                <Alert
                  action={
                    <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpen(false)}>
                      <Icon icon='tabler:x' />
                    </IconButton>
                  }
                >
                  {t(
                    'Your account has been successfully activated. 👇 Please click the button below to go to the login page.'
                  )}
                </Alert>
              </Slide>
            </Box>

            {open && (
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { mr: 1 } }}>
                <LinkStyled href='/login'>
                  <Icon fontSize='1.25rem' icon='tabler:chevron-left' />
                  <span>{t('Go to the login page')}</span>
                </LinkStyled>
              </Typography>
            )}
            {/* <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ color: 'text.secondary' }}>{t("Didn't get the mail")} ?</Typography>
              <Typography component={LinkStyled} href='/' onClick={e => e.preventDefault()} sx={{ ml: 1 }}>
                {t('Resend')}
              </Typography>
            </Box> */}
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}

VerifyEmailV2.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

VerifyEmailV2.guestGuard = true

export default VerifyEmailV2

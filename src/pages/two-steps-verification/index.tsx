// ** React Imports
import { ReactNode, ChangeEvent, useState, KeyboardEvent } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import Cleave from 'cleave.js/react'
import { useForm, Controller } from 'react-hook-form'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

// ** Custom Styled Component
import CleaveWrapper from 'src/@core/styles/libs/react-cleave'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Styles
import 'cleave.js/dist/addons/cleave-phone.us'
import { t } from 'i18next'

// ** Styled Components
const Img = styled('img')(({}) => ({}))

const TwoStepsIllustration = styled('img')(({ theme }) => ({
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
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}))

const CleaveInput = styled(Cleave)(({ theme }) => ({
  maxWidth: 48,
  textAlign: 'center',
  height: '48px !important',
  fontSize: '150% !important',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  '&:not(:last-child)': {
    marginRight: theme.spacing(2)
  },
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    margin: 0,
    WebkitAppearance: 'none'
  }
}))

const defaultValues: { [key: string]: string } = {
  val1: '',
  val2: '',
  val3: '',
  val4: '',
  val5: '',
  val6: ''
}
const TwoStepsV2 = () => {
  // ** State
  const [isBackspace, setIsBackspace] = useState<boolean>(false)

  // ** Hooks
  const router = useRouter()

  // ** Hooks
  const theme = useTheme()
  const {
    reset,
    control,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  // ** Vars
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const errorsArray = Object.keys(errors)

  // ** Hooks
  const auth = useAuth()

  const onSubmit = (data: { [key: string]: string }) => {
    auth.twoStepsVerification({ otp: Object.values(data).join('') }, () => {
      setError('allField', {
        type: 'manual',
        message: 'It is not valid'
      })
    }) // data

    console.log('data ::::: ', Object.values(data).join(''))
  }

  const resend = (e: any) => {
    e.preventDefault()
    reset()
    clearErrors('allField')
    auth.resendCode()
  }

  const handleChange = (event: ChangeEvent, onChange: (...event: any[]) => void) => {
    if (!isBackspace) {
      onChange(event)

      // @ts-ignore
      const form = event.target.form
      const index = [...form].indexOf(event.target)
      if (form[index].value && form[index].value.length) {
        form.elements[index + 1].focus()
      }
      event.preventDefault()
    }
    clearErrors('allField')
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Backspace') {
      setIsBackspace(true)

      // @ts-ignore
      const form = event.target.form
      const index = [...form].indexOf(event.target)
      if (index >= 1) {
        if (!(form[index].value && form[index].value.length)) {
          form.elements[index - 1].focus()
        }
      }
    } else {
      setIsBackspace(false)
    }
  }

  const renderInputs = () => {
    return Object.keys(defaultValues).map((val, index) => (
      <Controller
        key={val}
        name={val}
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <Box
            type='tel'
            value={value}
            autoFocus={index === 0}
            component={CleaveInput}
            onKeyDown={handleKeyDown}
            onChange={(event: ChangeEvent) => handleChange(event, onChange)}
            options={{ blocks: [1], numeral: true, numeralPositiveOnly: true }}
            sx={{ [theme.breakpoints.down('sm')]: { px: `${theme.spacing(2)} !important` } }}
          />
        )}
      />
    ))
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
          <TwoStepsIllustration
            alt='two-steps-illustration'
            src={`/images/pages/auth-v2-two-steps-illustration-${theme.palette.mode}.png`}
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
                {t('Two-Step Verification')} 💬
              </Typography>
              <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>
                {router.query.number &&
                  router.query.number &&
                  router.query.number.includes('@') &&
                  t('We have sent a verification code to your e-mail. Enter your code in the field below.')}
                {router.query.number &&
                  router.query.number &&
                  !router.query.number.includes('@') &&
                  t('We sent a verification code to your mobile. Enter the code from the mobile in the field below.')}
              </Typography>
              <Typography variant='h6'>{router.query.number && router.query.number}</Typography>
            </Box>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
              {t('Type your 6 digit security code')}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CleaveWrapper
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  ...(errorsArray.length && {
                    '& .invalid:focus': {
                      borderColor: theme => `${theme.palette.error.main} !important`,
                      boxShadow: theme => `0 1px 3px 0 ${hexToRGBA(theme.palette.error.main, 0.4)}`
                    }
                  })
                }}
              >
                {renderInputs()}
              </CleaveWrapper>
              {errorsArray.length ? (
                <FormHelperText sx={{ color: 'error.main', fontSize: theme => theme.typography.body2.fontSize }}>
                  {t('Please enter a valid OTP')}
                </FormHelperText>
              ) : null}
              <Button fullWidth type='submit' variant='contained' sx={{ mt: 2 }}>
                {t('Verify My Account')}
              </Button>
            </form>
            <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ color: 'text.secondary' }}>{t("Didn't get the code")}?</Typography>
              <Typography component={LinkStyled} href='/' onClick={resend} sx={{ ml: 1 }}>
                {t('Resend')}
              </Typography>
            </Box>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}

TwoStepsV2.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

TwoStepsV2.guestGuard = true

export default TwoStepsV2

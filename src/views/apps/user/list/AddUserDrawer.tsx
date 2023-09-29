// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'

import { FormHelperText } from '@mui/material'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types Imports
import { t } from 'i18next'
import UserService from 'src/french-tontine/logic/services/UserService'
import User from 'src/french-tontine/logic/models/User'
import { useEffect, useState } from 'react'
import Country from 'src/french-tontine/logic/models/Country'
import Role from 'src/french-tontine/logic/models/Role'
import Chip from 'src/@core/components/mui/chip'

interface UserData {
  _id?: number
  firstname: string
  lastname: string
  email: string
  phoneNumber: string
  phoneNumber2: string
  residenceCountryId: string
  residenceCity: string
  functionT: string
  roles: string[]
  password: string
}

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  onChange: () => void
  currentUser: null | User
  countries: Country[]
  roles: Role[]
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const schema = yup.object().shape({
  firstname: yup.string().required(() => t('First Name field is required')),
  lastname: yup.string().required(() => t('Last Name field is required')),
  email: yup
    .string()
    .email(() => t('Email must be a valid email') as string)
    .required(() => t('Email is a required field') as string),
  phoneNumber: yup.string().required(() => t('Phone number field is required')),
  residenceCity: yup.string().required(() => t('Le champ Ville est obligatoire')),
  functionT: yup.string().required(() => t('Le champ Fonction est obligatoire')),
  residenceCountryId: yup.string().required(() => t('Le champ Pays est obligatoire')),
  password: yup
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
  roles: yup
    .array()
    .min(1, () => t('Roles field must have at least 1 items'))
    .required(() => t('Roles field is required'))
})

const defaultValues: UserData = {
  firstname: '',
  lastname: '',
  email: '',
  phoneNumber: '',
  phoneNumber2: '',
  residenceCity: '',
  functionT: '',
  residenceCountryId: '',
  password: '',
  roles: []
}

const defaultInputValue = '-------------'

const SidebarAddUser = (props: SidebarAddUserType) => {
  // ** States
  const [showPassword, setShowPassword] = useState<boolean>(false)

  // Handle Password
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  // ** Props
  const { open, toggle, onChange, currentUser, countries, roles } = props

  const [id, setId] = useState<string>('-1')

  // ** Hooks
  const {
    reset,
    control,

    // setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    reset({
      firstname: currentUser !== null ? currentUser.firstname : '',
      lastname: currentUser !== null ? currentUser.lastname : '',
      email: currentUser !== null ? currentUser.email : '',
      phoneNumber: currentUser !== null ? currentUser.phoneNumber : '',
      phoneNumber2: currentUser !== null ? currentUser.phoneNumber2 : '',
      residenceCountryId:
        currentUser !== null && currentUser?.residenceCountry ? currentUser?.residenceCountry._id + '' : '',
      residenceCity: currentUser !== null ? currentUser.residenceCity : '',
      functionT: currentUser !== null ? currentUser.functionT : '',
      password: currentUser !== null ? 'Pass@1234567890' : '',
      roles: currentUser === null || currentUser.roles.length === 0 ? [] : currentUser.roles.map(role => role.name)
    })
    setId(currentUser !== null ? currentUser?._id : '-1')

    console.log(' currentUser ', currentUser)
  }, [open, currentUser])

  const onSubmit = (data: UserData) => {
    const userService = new UserService()

    const sendData: {
      firstname: string
      lastname: string
      email: string
      phoneNumber: string
      phoneNumber2: string
      residenceCity: string
      function: string
      residenceCountry?: any
      password: string
      roles: string[]
    } = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      phoneNumber: data.phoneNumber,
      phoneNumber2: data.phoneNumber2,
      residenceCity: data.residenceCity,
      function: data.functionT,
      password: data.password,
      roles: data.roles,
      residenceCountry: {}
    }

    if (data.residenceCountryId && data.residenceCountryId !== defaultInputValue) {
      sendData.residenceCountry = data.residenceCountryId
    }

    console.log(' sendData :: ', sendData)

    if (id === '-1') {
      userService
        .create(sendData)
        .then(rep => {
          if (rep) {
            onChange()
            reset()
            toggle() // UNIFIED Unified Trouble Shooter
          }
        })
        .catch(error => {
          console.log(' error ', error)

          if ((error.description as string).toLowerCase().includes('email')) {
            setError('email', {
              type: 'manual',
              message: t('This Email already exists') as string
            })
          } else if ((error.description as string).toLowerCase().includes('phone number')) {
            setError('phoneNumber', {
              type: 'manual',
              message: t('This Phone number already exists') as string
            })
          } else {
            setError('lastname', {
              type: 'manual',
              message: t('An error occurred, contact super-admin to fix it') as string
            })
          }
        })
    } else {
      const anotherRoles = sendData.roles.map(name => {
        const foundRole = roles.find((role: any) => role.name === name)
        const id: string = foundRole ? foundRole._id : '0'

        return id
      })

      console.log('sendData :: ', sendData) //

      userService
        .update({
          firstname: sendData.firstname,
          lastname: sendData.lastname,
          email: sendData.email,
          phoneNumber: sendData.phoneNumber,
          phoneNumber2: sendData.phoneNumber2,
          residenceCity: sendData.residenceCity,
          function: sendData.function,
          residenceCountry: sendData.residenceCountry,
          roles: anotherRoles,
          id
        })
        .then(rep => {
          if (rep) {
            onChange()
            reset()
            toggle()
          }
        })
        .catch(error => {
          console.log(' error ', error)

          if ((error.description as string).toLowerCase().includes('email')) {
            setError('email', {
              type: 'manual',
              message: t('This Email already exists') as string
            })
          } else if ((error.description as string).toLowerCase().includes('phone number')) {
            setError('phoneNumber', {
              type: 'manual',
              message: t('This Phone number already exists') as string
            })
          } else {
            setError('lastname', {
              type: 'manual',
              message: t('An error occurred, contact super-admin to fix it') as string
            })
          }
        })
    }
  }

  const handleClose = () => {
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h5'>{id === '-1' ? t('Add an user') : t('Update an user')}</Typography>
        <IconButton
          size='small'
          onClick={handleClose}
          sx={{
            p: '0.438rem',
            borderRadius: 1,
            color: 'text.primary',
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
            }
          }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='lastname'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label={t('Last Name')}
                onChange={onChange}
                placeholder='ADI-KPAKPABIA'
                error={Boolean(errors.lastname)}
                {...(errors.lastname && { helperText: errors.lastname.message })}
              />
            )}
          />

          <Controller
            name='firstname'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label={t('First Name')}
                onChange={onChange}
                placeholder='louise'
                error={Boolean(errors.firstname)}
                {...(errors.firstname && { helperText: errors.firstname.message })}
              />
            )}
          />

          <Controller
            name='email'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label={t('Email')}
                onChange={onChange}
                placeholder='adi.louise@gmail.com'
                error={Boolean(errors.email)}
                {...(errors.email && { helperText: errors.email.message })}
              />
            )}
          />

          <Controller
            name='phoneNumber'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <Box sx={{ mb: 4 }}>
                <FormHelperText style={{ fontSize: '13px', fontWeight: 'normal' }}>{t('Phone Number')}</FormHelperText>
                <PhoneInput
                  value={value}
                  onChange={onChange}
                  placeholder='33 5 28 49 36 66'
                  inputStyle={{
                    width: '100%',
                    height: '38px',
                    borderRadius: '5px'
                  }}
                  isValid={!errors.phoneNumber}
                />

                {errors.phoneNumber && (
                  <FormHelperText error style={{ fontSize: '13px' }}>
                    {errors.phoneNumber.message}
                  </FormHelperText>
                )}
              </Box>
            )}
          />

          <Controller
            name='phoneNumber2'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <Box sx={{ mb: 4 }}>
                <FormHelperText style={{ fontSize: '13px', fontWeight: 'normal' }}>
                  {t('Numéro de téléphone (2)')}
                </FormHelperText>
                <PhoneInput
                  value={value}
                  onChange={onChange}
                  placeholder='33 5 28 49 36 66'
                  inputStyle={{
                    width: '100%',
                    height: '38px',
                    borderRadius: '5px'
                  }}
                />
              </Box>
            )}
          />

          <Controller
            name='residenceCountryId'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                select
                fullWidth
                sx={{ mb: 4 }}
                label={t('Country')}
                error={Boolean(errors.residenceCountryId)}
                {...(errors.residenceCountryId && { helperText: errors.residenceCountryId.message })}
                SelectProps={{
                  value: value,
                  onChange: e => onChange(e)
                }}
              >
                <MenuItem value=''>{t('Select Country')}</MenuItem>

                {countries.map(residenceCountry => (
                  <MenuItem key={residenceCountry._id} value={residenceCountry._id}>
                    {residenceCountry.name}
                  </MenuItem>
                ))}

                {/* <MenuItem key={partnerIdValue} value={partnerIdValue}>
                  {partnerIdValue}
                </MenuItem> */}
              </CustomTextField>
            )}
          />

          <Controller
            name='residenceCity'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label={t('Ville')}
                onChange={onChange}
                placeholder='La ville du concerné'
                error={Boolean(errors.residenceCity)}
                {...(errors.residenceCity && { helperText: errors.residenceCity.message })}
              />
            )}
          />

          <Controller
            name='functionT'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label={t('Fonction')}
                onChange={onChange}
                placeholder='La fonction du concerné'
                error={Boolean(errors.functionT)}
                {...(errors.functionT && { helperText: errors.functionT.message })}
              />
            )}
          />

          <Controller
            name='roles'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomAutocomplete
                freeSolo
                multiple
                sx={{ mb: 4 }}
                options={roles.map(item => item.name)}
                value={value}
                onChange={(event, newValue) => {
                  onChange({ target: { value: newValue } })
                }}
                renderInput={params => (
                  <CustomTextField
                    {...params}
                    variant='filled'
                    label={t('Roles')}
                    placeholder='ADMIN'
                    error={Boolean(errors.roles)}
                    {...(errors.roles && { helperText: errors.roles.message })}
                  />
                )}
                renderTags={(value: string[], getTagProps) =>
                  value.map((option: string, index: number) => (
                    <Chip
                      label={option}
                      {...(getTagProps({ index }) as {})}
                      color='primary'
                      variant='outlined'
                      key={index}
                    />
                  ))
                }
              />
            )}
          />

          {id === '-1' && (
            <Controller
              name='password'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <CustomTextField
                  sx={{ display: 'flex', mb: 4 }}
                  fullWidth
                  autoFocus
                  label={t('Password')}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  placeholder='············'
                  error={Boolean(errors.password)}
                  type={showPassword ? 'text' : 'password'}
                  {...(errors.password && { helperText: errors.password.message })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                          <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />
          )}

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ mr: 3 }}>
              {t('Submit')}
            </Button>
            <Button variant='tonal' color='secondary' onClick={handleClose}>
              {t('Cancel')}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddUser

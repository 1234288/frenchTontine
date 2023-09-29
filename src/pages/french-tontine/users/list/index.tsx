// ** React Imports
import { useState, useEffect, useCallback } from 'react'

import { formatDateTime } from 'src/french-tontine/logic/utils/constant'

// ** MUI Imports
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'
import { SelectChangeEvent } from '@mui/material/Select'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { CircularProgress } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Table Components Imports

import { t } from 'i18next'
import User from 'src/french-tontine/logic/models/User'
import UserService from 'src/french-tontine/logic/services/UserService'
import Role from 'src/french-tontine/logic/models/Role'
import RoleService from 'src/french-tontine/logic/services/RoleService'
import Country from 'src/french-tontine/logic/models/Country'
import CountryService from 'src/french-tontine/logic/services/CountryService'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import TableHeader from 'src/views/apps/user/list/TableHeader'
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'
import { promiseFunction } from 'src/french-tontine/views/utils/general'

interface UserStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: User
}

const userStatusObj: UserStatusType = {
  activated: 'success',
  pending: 'warning',
  disabled: 'secondary',
  rejected: 'error',
  validated: 'success'
}

const statusObject: { [key: string]: string } = {
  activated: 'Activated',
  pending: 'Pending',
  disabled: 'Disabled',
  rejected: 'Rejected',
  validated: 'Validated'
}

interface UserRoleType {
  [key: string]: { icon: string; color: string }
}

// ** renders client column
const userRoleObj: UserRoleType = {
  super_admin: { icon: 'tabler:device-laptop', color: 'info' },
  agency: { icon: 'tabler:circle-check', color: 'success' },
  editor: { icon: 'tabler:edit', color: 'secondary' },
  direction: { icon: 'tabler:chart-pie-2', color: 'primary' },
  admin: { icon: 'tabler:user', color: 'warning' },
  tontineur: { icon: 'tabler:user-check', color: 'error' },
  member: { icon: 'tabler:user-heart', color: 'warning' }
}

// ** renders client column
const renderUser = (row: User) => {
  if (row.avatar && row.avatar.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={'primary'}
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
      >
        {getInitials(row.lastname + ' ' + row.firstname)}
      </CustomAvatar>
    )
  }
}

const userService = new UserService()
const roleService = new RoleService()
const countryService = new CountryService()

const UserList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [roleId, setRoleId] = useState<string>('')
  const [countryId, setCountryId] = useState<string>('')
  const [roles, setRoles] = useState<Role[]>([])
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(false)
  const [comfirmationMessage, setComfirmationMessage] = useState<string>('')
  const [comfirmationFunction, setComfirmationFunction] = useState<() => void>(() => console.log(' .... '))
  const [open, setOpen] = useState<boolean>(false)

  const [users, setUsers] = useState<User[]>([])

  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [currentUser, setCurrentUser] = useState<null | User>(null)

  const handleRolesChange = () => {
    roleService.readAll().then((rep: any) => {
      // const queryLowered = value.toLowerCase()

      if (rep) {
        // const filteredData = (rep as Role[]).filter(role => role.name.toLowerCase().includes(queryLowered))
        setRoles(rep as Role[])

        console.log('roles ::: ', rep)
      }
    })
  }

  const handleCountriesChange = () => {
    countryService.readAll().then((rep: any) => {
      // const queryLowered = value.toLowerCase()

      if (rep) {
        // const filteredData = (rep as Role[]).filter(role => role.name.toLowerCase().includes(queryLowered))
        setCountries(rep as Country[])
      }
    })
  }

  const handleChange = () => {
    userService.readAll().then((rep: any) => {
      const queryLowered = value.toLowerCase()

      console.log('User Service rep : ', rep)

      if (rep) {
        const users = rep.map((user: { [key: string]: any }) => {
          return { ...user, functionT: user.function, id: user._id }
        })

        const filteredData = users.filter((user: User) => {
          const countryIdClone = user.residenceCountry !== null ? user.residenceCountry._id : '0'

          // residenceCountry.name
          const fullName = user.lastname + ' ' + user.firstname

          return (
            (fullName.toLowerCase().includes(queryLowered) ||
              user.email.toLowerCase().includes(queryLowered) ||
              user.phoneNumber.toLowerCase().includes(queryLowered) ||
              user.phoneNumber2.toLowerCase().includes(queryLowered) ||
              user.residenceCity.toLowerCase().includes(queryLowered) ||
              user.functionT.toLowerCase().includes(queryLowered) ||
              (user.residenceCountry && user.residenceCountry.name.toLowerCase().includes(queryLowered)) ||
              user.status.toLowerCase().includes(queryLowered) ||
              user.roles.some((role: Role) => role.name.toLowerCase().includes(queryLowered))) &&
            countryIdClone === (countryId || countryIdClone) &&
            user.status === (status || user.status) &&
            user.roles.some((role: Role) => role._id === roleId || (roleId === '' && role._id === role._id))
          )
        })

        setUsers(filteredData as User[])
        setCurrentUser(null)
      }
    })
  }

  useEffect(() => {
    handleRolesChange()
    handleCountriesChange()
  }, [])

  useEffect(() => {
    handleChange()
  }, [status, countryId, roleId, value])

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  // const handleCountryChange = useCallback((e: SelectChangeEvent<unknown>) => {
  //   setCountryId(e.target.value as string)
  // }, [])

  const handleStatusChange = useCallback((e: SelectChangeEvent<unknown>) => {
    setStatus(e.target.value as string)
  }, [])

  const handleRoleIdChange = useCallback((e: SelectChangeEvent<unknown>) => {
    setRoleId(e.target.value as string)
  }, [])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  const handleCreateUser = () => {
    setCurrentUser(null)
    toggleAddUserDrawer()
  }

  const handleUpdateUser = (agency: User) => {
    setCurrentUser(agency)
    toggleAddUserDrawer()
  }

  const disableUser = async (user: User) => {
    let rep: any = false
    setLoading(true)

    try {
      await promiseFunction(
        async () => {
          rep = await userService.disableUser(user._id)
        },
        'Utilisateur est désactivé avec succès.'

        // 'This just happened',
        // 10000
      )
    } catch (error) {
      console.error('Package activation error:', error)
    }

    console.log('rep :------------------------ ', rep)

    if (rep) {
      console.log('rep :++++++++++++++++++++++++ ', rep)
      handleChange()
    }
    setLoading(false)
    handleClose()
  }

  const handleClickOpenDisableUserUser = (user: User) => {
    setComfirmationMessage('Êtes-vous sûr de vouloir désactiver cet abonné ?')
    setComfirmationFunction(() => () => disableUser(user))
    setOpen(true)
  }

  const activateUser = async (user: User) => {
    let rep: any = false
    setLoading(true)

    try {
      await promiseFunction(
        async () => {
          rep = await userService.activateUser(user._id)
        },
        'Utilisateur est activé avec succès.'

        // 'This just happened',
        // 10000
      )
    } catch (error) {
      console.error('Package activation error:', error)
    }

    console.log('rep :------------------------ ', rep)

    if (rep) {
      console.log('rep :++++++++++++++++++++++++ ', rep)
      handleChange()
    }
    setLoading(false)
    handleClose()
  }

  const handleClickOpenActivateUserUser = (user: User) => {
    setComfirmationMessage('Êtes-vous sûr de vouloir activer cet abonné ?')
    setComfirmationFunction(() => () => activateUser(user))
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  return (
    <Grid container spacing={6.5}>
      {/* <ActionsDialog actionText={actionText} open={open} onClose={handleClose} onValid={handleValid} /> */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title={t('Search Filters')} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue='Select Role'
                  SelectProps={{
                    value: roleId,
                    displayEmpty: true,
                    onChange: e => handleRoleIdChange(e)
                  }}
                >
                  <MenuItem value=''>{t('Select Role')}</MenuItem>

                  {roles?.map(role => (
                    <MenuItem key={role._id} value={role._id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue='Sélectionner un statut'
                  SelectProps={{
                    value: status,
                    displayEmpty: true,
                    onChange: e => handleStatusChange(e)
                  }}
                >
                  <MenuItem value=''>{t('Sélectionner un statut')}</MenuItem>
                  <MenuItem value='activated'>{t('Activated')}</MenuItem>
                  <MenuItem value='pending'>{t('Pending')}</MenuItem>
                  <MenuItem value='disabled'>{t('Disabled')}</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <CustomAutocomplete
                  freeSolo
                  sx={{ mb: 4 }}
                  options={countries}
                  id='autocomplete-size-medium'
                  getOptionLabel={option => {
                    // Handle both string and Country object cases
                    if (typeof option === 'string') {
                      return option // Return the string value directly
                    } else if ('name' in option) {
                      return option.name || '' // Return the country name if it exists
                    }

                    return '' // Return an empty string if the option is not a string or a valid Country object
                  }}
                  onChange={(event, newValue: any | Country) => {
                    console.log('newValue :::::: ', newValue)

                    setCountryId(newValue != null ? newValue._id : ('' as string))
                  }}
                  renderInput={params => <CustomTextField {...params} placeholder='Sélectionner un pays' />}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
          <TableHeader value={value} handleFilter={handleFilter} toggle={handleCreateUser} />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={users as never[]}
            columns={[
              {
                flex: 0.25,
                minWidth: 270,
                field: 'lastName',
                renderHeader: () => (
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: 500,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      fontSize: '0.8125rem'
                    }}
                  >
                    {t('User')}
                  </Typography>
                ),
                renderCell: ({ row }: CellType) => {
                  const { email, firstname, lastname } = row

                  return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {renderUser(row)}
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                        <Typography
                          noWrap
                          sx={{
                            fontWeight: 500,
                            textDecoration: 'none',
                            color: 'text.secondary',
                            '&:hover': { color: 'primary.main' }
                          }}
                        >
                          {lastname + ' ' + firstname}
                        </Typography>
                        <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
                          {email}
                        </Typography>
                      </Box>
                    </Box>
                  )
                }
              },
              {
                flex: 0.25,
                minWidth: 150,
                field: 'functionT',
                renderHeader: () => (
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: 500,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      fontSize: '0.8125rem'
                    }}
                  >
                    {t('Fonction')}
                  </Typography>
                ),
                renderCell: ({ row }: CellType) => {
                  const { functionT } = row

                  return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                        <Tooltip title={functionT}>
                          <Typography
                            noWrap
                            sx={{
                              fontWeight: 500,
                              textDecoration: 'none',
                              color: 'secondary.main'
                            }}
                          >
                            {functionT}
                          </Typography>
                        </Tooltip>
                      </Box>
                    </Box>
                  )
                }
              },
              {
                flex: 0.25,
                minWidth: 120,
                field: 'residenceCountry.name',
                renderHeader: () => (
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: 500,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      fontSize: '0.8125rem'
                    }}
                  >
                    {t('Pays / Ville')}
                  </Typography>
                ),
                renderCell: ({ row }: CellType) => {
                  const { residenceCountry, residenceCity } = row

                  return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                        {residenceCountry && (
                          <Typography
                            noWrap
                            sx={{
                              fontWeight: 500,
                              textDecoration: 'none',
                              color: 'text.secondary',
                              '&:hover': { color: 'primary.main' }
                            }}
                          >
                            {residenceCountry.name}
                          </Typography>
                        )}
                        {residenceCity && (
                          <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
                            {residenceCity}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  )
                }
              },
              {
                flex: 0.25,
                minWidth: 150,
                field: 'phoneNumber',
                renderHeader: () => (
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: 500,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      fontSize: '0.8125rem'
                    }}
                  >
                    {t('Téléphone')}
                  </Typography>
                ),
                renderCell: ({ row }: CellType) => {
                  const { phoneNumber, phoneNumber2 } = row

                  return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                        <Typography
                          noWrap
                          sx={{
                            fontWeight: 500,
                            textDecoration: 'none',
                            color: 'secondary.main'
                          }}
                        >
                          {phoneNumber}
                        </Typography>
                        <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
                          {phoneNumber2}
                        </Typography>
                      </Box>
                    </Box>
                  )
                }
              },
              {
                flex: 0.15,
                field: 'roles',
                minWidth: 170,
                renderHeader: () => (
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: 500,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      fontSize: '0.8125rem'
                    }}
                  >
                    {t('Roles')}
                  </Typography>
                ),
                renderCell: ({ row }: CellType) => {
                  return (
                    <>
                      {row.roles.length && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CustomAvatar
                            skin='light'
                            sx={{ mr: 4, width: 30, height: 30 }}
                            color={(userRoleObj[row.roles[0].name.toLowerCase()].color as ThemeColor) || 'primary'}
                          >
                            <Icon icon={userRoleObj[row.roles[0].name.toLowerCase()].icon} />
                          </CustomAvatar>
                          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                            {row.roles.length && row.roles[0].name}
                          </Typography>
                        </Box>
                      )}
                    </>
                  )
                }
              },
              {
                flex: 0.1,
                minWidth: 120,
                field: 'status',
                renderHeader: () => (
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: 500,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      fontSize: '0.8125rem'
                    }}
                  >
                    {t('Status')}
                  </Typography>
                ),
                renderCell: ({ row }: CellType) => {
                  return (
                    <>
                      <CustomChip
                        rounded
                        skin='light'
                        size='small'
                        label={t(statusObject[row.status] as string)}
                        color={userStatusObj[row.status]}
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </>
                  )
                }
              },
              {
                flex: 0.1,
                minWidth: 190,
                field: 'accountActivatedAt',
                renderHeader: () => (
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: 500,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      fontSize: '0.8125rem'
                    }}
                  >
                    {t("Date d'entrée")}
                  </Typography>
                ),
                renderCell: ({ row }: CellType) => {
                  return (
                    <>
                      {row.createdAt && (
                        <CustomChip
                          rounded
                          skin='light'
                          size='small'
                          label={row.createdAt && formatDateTime(row.createdAt)}
                          color={'info'}
                          sx={{ textTransform: 'capitalize' }}
                        />
                      )}
                    </>
                  )
                }
              },
              {
                flex: 0.1,
                minWidth: 100,
                sortable: false,
                field: 'actions',
                renderHeader: () => (
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: 500,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      fontSize: '0.8125rem'
                    }}
                  >
                    {t('Actions')}
                  </Typography>
                ),
                renderCell: ({ row }: CellType) => (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Tooltip title={t('Update User')}>
                      <IconButton
                        size='small'
                        sx={{ color: 'text.primary' }}
                        onClick={() => {
                          handleUpdateUser(row)
                        }}
                      >
                        <Box sx={{ display: 'flex', color: theme => theme.palette.warning.main }}>
                          <Icon icon='tabler:edit' />
                        </Box>
                      </IconButton>
                    </Tooltip>

                    {row.status == 'activated' && (
                      <Tooltip title={t('Désactiver ce compte')}>
                        <IconButton
                          size='small'
                          onClick={() => {
                            handleClickOpenDisableUserUser(row)
                          }}
                        >
                          <Box sx={{ display: 'flex', color: theme => theme.palette.error.main }}>
                            <Icon icon='tabler:user-off' />
                          </Box>
                        </IconButton>
                      </Tooltip>
                    )}

                    {row.status == 'disabled' && (
                      <Tooltip title={t('Activer ce compte')}>
                        <IconButton
                          size='small'
                          onClick={() => {
                            handleClickOpenActivateUserUser(row)
                          }}
                        >
                          <Box sx={{ display: 'flex', color: theme => theme.palette.success.main }}>
                            <Icon icon='tabler:user-check' />
                          </Box>
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                )
              }
            ]}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>

      {addUserOpen && (
        <AddUserDrawer
          open={addUserOpen}
          toggle={toggleAddUserDrawer}
          onChange={handleChange}
          currentUser={currentUser}
          roles={roles as Role[]}
          countries={countries}
        />
      )}

      <Dialog
        open={open}
        disableEscapeKeyDown
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleClose()
          }
        }}
      >
        <DialogTitle id='alert-dialog-title'>{t('Confirmation')}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>{t(comfirmationMessage)}</DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleClose} color='error' variant='outlined'>
            {t('Cancel')}
          </Button>
          <Button
            onClick={() => comfirmationFunction()}
            color='success'
            variant='outlined'
            sx={loading ? { paddingRight: '23px', paddingLeft: '23px' } : {}}
          >
            {!loading && t('Yes')}

            {loading && <CircularProgress size={17} color='success' />}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default UserList

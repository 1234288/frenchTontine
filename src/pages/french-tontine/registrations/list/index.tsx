import Box from "@mui/material/Box";
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid"
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { t } from "i18next";
import { useCallback, useEffect, useState } from "react";
import CustomAutocomplete from "src/@core/components/mui/autocomplete";
import CustomTextField from "src/@core/components/mui/text-field";
import Country from "src/french-tontine/logic/models/Country";
import CountryService from 'src/french-tontine/logic/services/CountryService';
import InscriptionService from 'src/french-tontine/logic/services/InscriptionService';
import TableHeader from "src/views/apps/registrations/TableHeader";
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from "src/@core/utils/get-initials";
import CustomChip from 'src/@core/components/mui/chip'
import IconButton from "@mui/material/IconButton";
import { formatDateTime } from "src/french-tontine/logic/utils/constant";
import Icon from 'src/@core/components/icon'
import { promiseFunction } from "src/french-tontine/views/utils/general";
import { ThemeColor } from "src/@core/layouts/types";
import Inscription from "src/french-tontine/logic/models/Inscription";
import AddUserDrawer from "src/views/apps/user/list/AddUserDrawer";
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import CircularProgress from "@mui/material/CircularProgress";
import Button from '@mui/material/Button'
import { InputAdornment, TextField } from '@mui/material'





interface CellType {
    row: Inscription
}



interface InscriptionStatusType {
    [key: string]: ThemeColor
}


const userStatusObj: InscriptionStatusType = {
    pending: 'warning',
    rejected: 'error',
    validated: 'success'
}

const statusObject: { [key: string]: string } = {
    pending: 'Pending',
    rejected: 'Rejected',
    validated: 'Validated'
}

const renderInscription = (row: Inscription) => {
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


const countryService = new CountryService()
const inscriptionService = new InscriptionService()

let reason = ''

const RegistrationList = () => {

    const [status, setStatus] = useState<string>('')
    const [countryId, setCountryId] = useState<string>('')
    const [countries, setCountries] = useState<Country[]>([])
    const [functions, setFunctions] = useState<Function[]>([])
    const [inscription, setInscription] = useState<Inscription[]>([])
    const [value, setValue] = useState<string>('')
    const [currentInscription, setCurrentInscription] = useState<null | Inscription>(null)
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
    const [comfirmationMessage, setComfirmationMessage] = useState<string>('')
    const [comfirmationFunction, setComfirmationFunction] = useState<() => void>(() => console.log(' .... '))
    const [open, setOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)
    const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
    const [isReject, setIsReject] = useState(false)
    const [rejectionReason, setRejectionReason] = useState<string>('')



    const handleStatusChange = useCallback((e: SelectChangeEvent<unknown>) => {
        setStatus(e.target.value as string)
    }, [])




    useEffect(() => {
        handleCountriesChange()
    }, [])


    useEffect(() => {
        handleChange()
    }, [status, countryId, value])

    const handleFilter = useCallback((val: string) => {
        setValue(val)
    }, [])

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
        inscriptionService.readAll().then((rep: any) => {
            const queryLowered = value.toLowerCase()

            console.log('Inscription Service rep : ', rep)

            if (rep) {
                const inscriptions = rep.map((inscription: { [key: string]: any }) => {
                    return { ...inscription, functionT: inscription.function, id: inscription._id }
                })

                const filteredData = inscriptions.filter((inscription: Inscription) => {
                    const countryIdClone = inscription.residenceCountry !== null ? inscription.residenceCountry._id : '0'

                    // residenceCountry.name
                    const fullName = inscription.lastname + ' ' + inscription.firstname

                    return ((fullName.toLowerCase().includes(queryLowered) ||
                        inscription.email.toLowerCase().includes(queryLowered) ||
                        inscription.phoneNumber.toLowerCase().includes(queryLowered) ||
                        inscription.phoneNumber2.toLowerCase().includes(queryLowered) ||
                        inscription.residenceCity.toLowerCase().includes(queryLowered) ||
                        inscription.functionT.toLowerCase().includes(queryLowered) ||
                        (inscription.residenceCountry &&
                            inscription.residenceCountry.name.toLowerCase().includes(queryLowered)) ||
                        inscription.status.toLowerCase().includes(queryLowered)) &&
                        countryIdClone === (countryId || countryIdClone) &&
                        inscription.status === (status || inscription.status)

                    )


                })

                setInscription(filteredData as Inscription[])
                setCurrentInscription(null)
            }
        })
    }




    const rejectRegistration = async (inscription: Inscription) => {
        let rep: any = false
        setLoading(true)

        try {
            await promiseFunction(
                async () => {
                    console.log('rejectionReason ::: ', reason)

                    rep = await inscriptionService.rejectRegistration(inscription._id, reason) // https://www.youtube.com/shorts/aQkDw5AOLdw // https://www.youtube.com/shorts/MvcsA2AnN00
                },
                "L'inscription est rejetée avec succès."

                // 'This just happened',
                // 10000
            )
        } catch (error) {
            console.error('ERREUR : ', error)
        }

        console.log('rep :------------------------ ', rep)

        if (rep) {
            console.log('rep :++++++++++++++++++++++++ ', rep)
            handleChange()

            setIsReject(false)
            setRejectionReason('')
        }
        setLoading(false)
        handleClose()
    }


    const validateRegistration = async (inscription: Inscription) => {
        let rep: any = false
        setLoading(true)

        try {
            await promiseFunction(
                async () => {
                    rep = await inscriptionService.validateRegistration(inscription._id)
                },
                "L'inscription est validée avec succès. \nUn compte a été créé pour ce tontineur."

                // 'This just happened',
                // 10000
            )
        } catch (error) {
            console.error('ERREUR : ', error)
        }

        console.log('rep :------------------------ ', rep)

        if (rep) {
            console.log('rep :++++++++++++++++++++++++ ', rep)
            handleChange()
        }
        setLoading(false)
        handleClose()
    }


    const handleClickOpenValidateRegistration = (inscription: Inscription) => {
        setComfirmationMessage('Êtes-vous sûr de vouloir valider cette inscription ?')
        setComfirmationFunction(() => () => validateRegistration(inscription))
        setOpen(true)
    }
    const handleClickOpenRejectRegistration = (inscription: Inscription) => {
        setIsReject(true)
        setComfirmationMessage('Êtes-vous sûr de vouloir rejeter cette inscription ?')
        setComfirmationFunction(() => () => rejectRegistration(inscription))
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

                            <Grid item lg={6} md={6} sm={6} xs={12}>
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
                                    <MenuItem value='validated'>{t('Validated')}</MenuItem>
                                    <MenuItem value='pending'>{t('Pending')}</MenuItem>
                                    <MenuItem value='rejected'>{t('Rejected')}</MenuItem>
                                </CustomTextField>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={12}>
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
                    <TableHeader value={value} handleFilter={handleFilter} />
                    <DataGrid
                        autoHeight
                        rowHeight={62}
                        rows={inscription as never[]}
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
                                        {t('tontineur')}
                                    </Typography>
                                ),
                                renderCell: ({ row }: CellType) => {
                                    const { email, firstname, lastname } = row

                                    return (
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            {renderInscription(row)}
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
                                field: 'additionalInformation',
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
                                        {t('info complémentaires')}
                                    </Typography>
                                ),
                                renderCell: ({ row }: CellType) => {
                                    return (
                                        <>
                                            {row.additionalInformation}
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
                                        {t("Date d'inscription")}
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
                                        {row.status !== 'validated' && row.status !== 'rejected' && (
                                            <Tooltip title={t("Valider l'inscription")}>
                                                <IconButton
                                                    size='small'
                                                    sx={{ color: 'text.primary' }}
                                                    onClick={() => {
                                                        handleClickOpenValidateRegistration(row)
                                                    }}
                                                >
                                                    <Box sx={{ display: 'flex', color: theme => theme.palette.success.main }}>
                                                        <Icon icon='tabler:thumb-up' />
                                                    </Box>
                                                </IconButton>
                                            </Tooltip>
                                        )}

                                        {row.status !== 'validated' && row.status !== 'rejected' && (
                                            <Tooltip title={t("Rejeter l'inscription")}>
                                                <IconButton
                                                    size='small'
                                                    sx={{ color: 'text.primary' }}
                                                    onClick={() => {
                                                        // resetPassword(row)
                                                        handleClickOpenRejectRegistration(row)
                                                    }}
                                                >
                                                    <Box sx={{ display: 'flex', color: theme => theme.palette.error.main }}>
                                                        <Icon icon='tabler:thumb-down' />
                                                    </Box>
                                                </IconButton>
                                            </Tooltip>
                                        )}

                                        {row.status === 'rejected' && (
                                            <Tooltip title={row.rejectionReason}>
                                                <Typography
                                                    noWrap
                                                    sx={{
                                                        fontWeight: 500,
                                                        letterSpacing: '1px',
                                                        textTransform: 'uppercase',
                                                        fontSize: '0.8125rem',
                                                        color: theme => theme.palette.error.main
                                                    }}
                                                >
                                                    {row.rejectionReason}
                                                </Typography>
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
                    {isReject && (
                        <>
                            <DialogContentText sx={{ mt: 1, color: theme => theme.palette.error.main }}>
                                {t('Si oui, veuillez bien indiquer ci-dessous la raison du refus.')}
                            </DialogContentText>

                            <CustomTextField
                                fullWidth
                                multiline
                                minRows={5}
                                value={rejectionReason}
                                sx={{ mb: 1, mt: 5, '& .MuiInputBase-root.MuiFilledInput-root': { alignItems: 'baseline' } }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <Icon fontSize='1.25rem' icon='tabler:message' />
                                        </InputAdornment>
                                    )
                                }}
                                inputProps={{
                                    maxlength: '180',
                                    characterLimit: 180
                                }}
                                label={t('Motif du rejet')}
                                onChange={e => {
                                    reason = e.target.value
                                    setRejectionReason(e.target.value)
                                }}
                                placeholder='Insuffisance de ...'
                            />

                            <div style={{ textAlign: 'right', marginTop: '1px' }}>
                                {rejectionReason.length}/180 {t('caractères')}
                            </div>
                        </>
                    )}
                </DialogContent>
                <DialogActions className='dialog-actions-dense'>
                    <Button onClick={handleClose} color='error' variant='outlined'>
                        {t('Cancel')}
                    </Button>
                    <Button
                        disabled={(!isReject === false && rejectionReason !== '') || isReject === false ? false : true}
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

export default RegistrationList;
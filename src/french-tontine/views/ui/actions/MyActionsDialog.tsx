// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { t } from 'i18next'
import { CircularProgress } from '@mui/material'
import { useState } from 'react'

const MyActionsDialog = ({
  comfirmationMessage,
  open = false,
  onClose,
  comfirmationFunction
}: {
  comfirmationMessage: string
  open: boolean
  onClose: () => void
  comfirmationFunction: () => void
}) => {
  const [loading, setLoading] = useState(false)

  const handleOnClickYes = async () => {
    setLoading(true)

    await comfirmationFunction()

    setLoading(false)
  }

  return (
    <Dialog
      open={open}
      disableEscapeKeyDown
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          onClose()
        }
      }}
    >
      <DialogTitle id='alert-dialog-title'>{t('Confirmation')}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>{t(comfirmationMessage)}</DialogContentText>
      </DialogContent>
      <DialogActions className='dialog-actions-dense'>
        <Button onClick={onClose} color='error' variant='outlined'>
          {t('Cancel')}
        </Button>
        <Button
          onClick={handleOnClickYes}
          color='success'
          variant='outlined'
          sx={loading ? { paddingRight: '23px', paddingLeft: '23px' } : {}}
        >
          {!loading && t('Yes')}

          {loading && <CircularProgress size={17} color='success' />}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default MyActionsDialog

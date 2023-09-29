// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Link from 'next/link'
import { t } from 'i18next'

const Illustration = styled('img')(({ theme }) => ({
  right: 20,
  bottom: 0,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    right: 5,
    width: 110
  }
}))

const CashCollectCongratulations = () => {
  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h5' sx={{ mb: 0.5 }}>
          {t('Weekly transactions')} 🎉
        </Typography>
        <Typography sx={{ mb: 2, color: 'text.secondary' }}>{t('The turnover of the week')}</Typography>
        <Typography variant='h5' sx={{ mb: 0.75, color: 'primary.main' }}>
          25.000.955 Francs CFA
        </Typography>

        <Button component={Link} href='/french-tontine/transactions/list/' variant='contained'>
          {t('View Transactions')}
        </Button>
        <Illustration width={80} alt='congratulations john' src='/images/cards/congratulations-john.png' />
      </CardContent>
    </Card>
  )
}

export default CashCollectCongratulations

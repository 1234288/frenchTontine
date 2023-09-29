import Box from '@mui/material/Box'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

interface TableHeaderProps {
    value: string
    handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
    // ** Props
    const {  handleFilter, value } = props

    return (
        <Box
            sx={{
                p: 5,
                pb: 3,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                // flexDirection: 'row-reverse',
                justifyContent: 'space-between'
            }}
        >
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <CustomTextField
                    value={value}
                    sx={{ mr: 6, mb: 2 }}
                    placeholder='Rechercher une inscription'
                    onChange={e => handleFilter(e.target.value)}
                />
            </Box>
        </Box>
    )
}

export default TableHeader
import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/material/styles'
import { deepPurple } from '@mui/material/colors'

const useStyles = makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default useStyles;
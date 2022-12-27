import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles'

export default makeStyles(() => ({

    mainContainer: {
        padding: useTheme().spacing(2),
    },

    paper: {
        // padding: useTheme().spacing(2),
        marginTop: useTheme().spacing(2),
      },
    
    avatar: {
      '&:hover': {
        opacity: [0.9, 0.8, 0.7],
      },
    },

    input: {
      display: 'none',
    },

    addButton: {
        position: 'fixed',
        alignSelf: 'flex-end',
        bottom: useTheme().spacing(2),
        right: useTheme().spacing(2),
      },
  }));
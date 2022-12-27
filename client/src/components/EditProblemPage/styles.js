import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
        },
      },
      paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(3),
      },
      form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      },
      fileInput: {
        width: '97%',
        margin: '10px 0',
      },
      buttonSubmit: {
        marginTop: 20,
        marginBottom: 10,
      },
      container: {
        padding: theme.spacing(2),
        height: "500px",
      },

      editor: {
        height: "400px",
        resize: "vertical",
      },

      testBox: {
        margin: 20,
      }

  }));
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

export default makeStyles(() => ({
  mainContainer: {
    paddingTop: "20px",
    display: "flex",
    marginBottom: "85px",
  },

  addButton: {
    position: "fixed",
    alignSelf: "flex-end",
    bottom: useTheme().spacing(2),
    right: useTheme().spacing(2),
  },
}));

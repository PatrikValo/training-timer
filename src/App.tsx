import React, { useEffect, useState } from "react";
import ClockPage from "./pages/clockPage";
import {
  Container,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Theme,
  createStyles,
  MuiThemeProvider,
  createMuiTheme,
  Switch,
  CssBaseline,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import {
  getIsLight,
  getTotalTime,
  storeIsLight,
  storeTotalTime,
} from "./core/storage";
import SettingDialog from "./components/settingDialog";
import { indigo } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  })
);

const ourLightTheme = {
  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#d32f2f",
    },
  },
};

const ourDarkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#d32f2f",
    },
    background: {
      default: "rgba(0, 0, 0, 0.87)",
    },
  },
});

function App() {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [totalTime, setTotalTime] = useState<number>(getTotalTime());
  const [isLight, setIsLight] = useState<boolean>(getIsLight());

  const muiTheme = isLight
    ? createMuiTheme(ourLightTheme)
    : createMuiTheme(ourDarkTheme);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (tT: number) => {
    storeTotalTime(tT);
    setTotalTime(getTotalTime());
  };

  const handleChangeTheme = () => {
    storeIsLight(!isLight);
    setIsLight(getIsLight());
  };

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Timer
            </Typography>
            <div>
              <Switch
                checked={isLight}
                color="default"
                onChange={handleChangeTheme}
              />
              <IconButton
                color="inherit"
                aria-label="menu"
                onClick={handleOpen}
              >
                <SettingsIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <Container style={{ height: "calc(100vh - 150px)" }}>
          <ClockPage totalTime={totalTime} />
        </Container>
        <SettingDialog
          open={open}
          totalTime={totalTime}
          onClose={handleClose}
          onChange={handleChange}
        />
      </div>
    </MuiThemeProvider>
  );
}

export default App;

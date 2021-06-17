import { useState } from "react";
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
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import { getTotalTime, storeTotalTime } from "./core/storage";
import SettingDialog from "./components/settingDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  })
);

function App() {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [totalTime, setTotalTime] = useState<number>(getTotalTime());

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

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Timer
          </Typography>
          <div>
            <IconButton color="inherit" aria-label="menu" onClick={handleOpen}>
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
  );
}

export default App;

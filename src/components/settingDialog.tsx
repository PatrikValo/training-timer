import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import { FunctionComponent } from "react";
import { msToTime, timeToMs } from "../utils/util";

export interface SettingDialogProps {
  totalTime: number;
  open: boolean;
  onClose: () => void;
  onChange: (totalTime: number) => void;
}

const SettingDialog: FunctionComponent<SettingDialogProps> = ({
  open,
  totalTime,
  onClose,
  onChange,
}) => {
  const { hours, minutes, seconds } = msToTime(totalTime);

  const handleChange = (event: any) => {
    if (event.target.id === "hours") {
      const h: number = event.target.value;
      onChange(timeToMs({ hours: h, seconds, minutes }));
    }

    if (event.target.id === "minutes") {
      const m: number = event.target.value;
      onChange(timeToMs({ hours, seconds, minutes: m }));
    }

    if (event.target.id === "seconds") {
      const s: number = event.target.value;
      onChange(timeToMs({ hours, seconds: s, minutes }));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Time of one loop</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Here you can change duration of the one loop.
        </DialogContentText>
        <Grid container>
          <Grid item xs={4}>
            <TextField
              value={hours}
              margin="dense"
              id="hours"
              label="Hours"
              type="number"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              value={minutes}
              margin="dense"
              id="minutes"
              label="Minutes"
              type="number"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              value={seconds}
              margin="dense"
              id="seconds"
              label="Seconds"
              type="number"
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingDialog;

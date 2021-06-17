import { FunctionComponent, Fragment } from "react";
import { Time } from "../core";
import { Typography, TypographyProps } from "@material-ui/core";

export interface ClockTypographyProps extends TypographyProps {
  time: Time;
}

function twoSize(num: number): string {
  if (num > 9) {
    return "" + num;
  }

  return "0" + num;
}

const ClockTypography: FunctionComponent<ClockTypographyProps> = ({
  time,
  children,
  ...other
}) => {
  const { hours: h, minutes: m, seconds: s } = time;
  const f = twoSize;

  return (
    <Fragment>
      <Typography {...other}>
        {children}
        {`${f(h)}:${f(m)}:${f(s)}`}
      </Typography>
    </Fragment>
  );
};

export default ClockTypography;

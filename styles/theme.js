import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import { blue, grey, orange, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: orange,
    secondary: grey,
  },
});

export default theme;

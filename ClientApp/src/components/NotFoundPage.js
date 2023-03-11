import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { Paper } from "@mui/material";

const NotFound = () => (
  <Box display="flex" alignitems="center">
    <Paper display="flex" alignitems="center">
      <Box display="flex" alignitems="center">
        <img
          alt="Error 404: Page not found"
          src="https://img.freepik.com/free-vector/404-error-background-with-balloons-flat-style_23-2147761279.jpg?t=st=1656531726~exp=1656532326~hmac=5388e053225bb953b922d6c4dadb0afe78e9baad684e7bc94dda4b0b3059af7e&w=826"
        />
      </Box>
    </Paper>
  </Box>
);

export default NotFound;

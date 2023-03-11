import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", flexGrow: 1,  alignItems: "center" }}>
      <Paper
        sx={{ justifyContent: "center", alignItems: "center", padding: 10 }}>
        <Box>
          <Typography>Loading data</Typography>
        </Box>
        <Box>
          <CircularProgress size={60} sx={{ mt: 4, ml: 2 }} />
        </Box>
      </Paper>
    </Box>
  );
}

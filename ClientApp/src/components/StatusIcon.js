import React from "react";
import Stack from "@mui/material/Stack";
import DoneIcon from "@mui/icons-material/Done";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const CompletedStatus = 3;

const StatusIcon = (props) => {
  return props.status === CompletedStatus ? (
    <Stack direction="row" sx={{ alignItems: "center" }}>
      <DoneIcon color="success" fontSize="large" sx={{ height: 40, mr: 0.5 }} />
      <Typography variant="body1">Completed</Typography>
    </Stack>
  ) : (
    <Stack spacing={0.5} direction="row" sx={{ alignItems: "center" }}>
      <CircularProgress size={30} sx={{ mr: 0.5 }} color="secondary" />
      <Typography variant="body1">Processing..</Typography>
    </Stack>
  );
};

export default StatusIcon;

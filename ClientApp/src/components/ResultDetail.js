import React, { useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import {
  Chart,
  PieSeries,
  Tooltip,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import { EventTracker, HoverState } from "@devexpress/dx-react-chart";
import StatusIcon from "./StatusIcon";
import authService from "./api-authorization/AuthorizeService";
import UploadService from "../services/UploadService";
import Loading from "../components/Loading.js";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "../components/DeleteDialog.js";

async function getImageData(imageId) {
  var token = await authService.getAccessToken();
  return new Promise((resolve) => {
    return resolve(UploadService.getImageDetails(imageId, token));
  });
}

function getChartData(imageData) {
  return [
    { prediction: "Benign", area: imageData.predictionScores[0] * 100 },
    { prediction: "Malignant", area: imageData.predictionScores[1] * 100 },
  ];
}

export default function ImageResult(props) {
  const [imageData, setImageData] = useState([]);
  const [openDialog, setDialogOpen] = useState(false);
  let history = useHistory();

  useEffect(() => {
    getImageData(props.match.params.imageId).then((data) => {
      data.chartData = getChartData(data);
      setImageData(data);
    });
  }, [props.match.params.imageId]);

  function openDeleteDialog() {
    setDialogOpen(true);
  }

  function onDialogClose() {
    setDialogOpen(false);
  }

 const  onDelete = (imageId) => {
    setDialogOpen(false);
    history.goBack();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      {imageData.length === 0 ? (
        <Loading />
      ) : (
        <Grid container spacing={1} sx={{ flexGrow: 1 }}>
          <DeleteDialog
            open={openDialog}
            onClose={onDialogClose}
            onDelete={onDelete}
            imageId={props.match.params.imageId}
          />

          <Grid container spacing={1}>
            <Grid item xs={12} md={3} sx={{ flexGrow: 1, mt: 1 }}>
              <Card sx={{ minWidth: 150, display: "flex", flexGrow: 1 }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Photo
                  </Typography>
                  <img
                    alt="loading"
                    height={140}
                    width={150}
                    src={imageData.originalImageUrl}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={9} sx={{ mt: 1 }}>
              <Card sx={{ minWidth: 150, flexGrow: 1 }}>
                {imageData.chartData != null && (
                  <Box display="flex" sx={{ flexGrow: 1 }}>
                    <CardContent display="flex" sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="div">
                        Result
                      </Typography>
                      <Box display="flex" justifyContent="center">
                        <Chart
                          data={imageData.chartData}
                          height={140}
                          width={280}
                        >
                          <PieSeries
                            valueField="area"
                            argumentField="prediction"
                          />
                          <EventTracker />
                          <Animation />
                          <HoverState />
                          <Legend />
                          <Tooltip />
                        </Chart>
                      </Box>
                    </CardContent>
                  </Box>
                )}
              </Card>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={1}
            sx={{ flexGrow: 1, mt: 0.2 }}
            alignItems="stretch"
          >
            <Grid item xs={12} md={3} style={{ display: "flex" }}>
              <Card sx={{ minWidth: 150, flexGrow: 1, display: "flex" }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Status
                  </Typography>
                  <StatusIcon status={imageData.status} />
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={3} style={{ display: "flex" }}>
              <Card sx={{ minWidth: 150, flexGrow: 1, display: "flex" }}>
                <CardContent display="flex" justify-content="center">
                  <Typography gutterBottom variant="h5" component="div">
                    Reference
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    {imageData.reference}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={3} style={{ display: "flex" }}>
              <Card sx={{ minWidth: 150, flexGrow: 1, display: "flex" }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Body part
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    {imageData.bodyPart}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={3} style={{ display: "flex" }}>
              <Card sx={{ minWidth: 150, flexGrow: 1, display: "flex" }}>
                <CardContent display="flex" justify-content="center">
                  <Typography gutterBottom variant="h5" component="div">
                    Result
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    {imageData.predictionLabel}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={1}
            alignItems="stretch"
            sx={{ flexGrow: 1, mt: 0.2 }}
          >
            <Grid item xs={12} md={3} style={{ display: "flex" }}>
              <Card sx={{ minWidth: 150, flexGrow: 1, display: "flex" }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Actions
                  </Typography>
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    size="large"
                    onClick={() => openDeleteDialog()}
                  >
                    <DeleteIcon fontSize="inherit" />{" "}
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={3} style={{ display: "flex" }}>
              <Card sx={{ minWidth: 150, flexGrow: 1, display: "flex" }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Upload time
                  </Typography>
                  {new Date(imageData.uploadedTime).toLocaleString()}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={3} style={{ display: "flex" }}>
              <Card sx={{ minWidth: 150, flexGrow: 1, display: "flex" }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Processed time
                  </Typography>
                  {new Date(imageData.processedTime).toLocaleString()}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={3} style={{ display: "flex" }}>
              <Card sx={{ minWidth: 150, flexGrow: 1, display: "flex" }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Completed time
                  </Typography>
                  {new Date(imageData.completedTime).toLocaleString()}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

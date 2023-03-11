import React, { Component } from "react";
import { Paper } from "@mui/material";
import { Box } from "@mui/material";
import { Stack } from "@mui/material";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import AppStatsService from "../services/AppStatsService.js";
import Grid from "@mui/material/Grid";

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);

    this.state = { appStats: {} };
  }

  async componentDidMount() {
    var response = await AppStatsService.getStats();

    this.setState({
      appStats: response,
    });
  }

  render() {
    return (
      <Box>
        <Box sx={{ mt: 3 }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            sx={{
              flexGrow: 1,
            }}
            spacing={1}
          >
            <Grid item md={3} xs={12} display="flex">
              <Card>
                <CardMedia
                  component="img"
                  height="90"
                  image="https://ik.imagekit.io/skinnnyskin/Icons/health-service_E65FzjHiM.png?ik-sdk-version=javascript-1.4.3&updatedAt=1657136349034"
                  alt="health services"
                  sx={{ objectFit: "contain", mt: 1 }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    What's all about?
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    AI Mole Screening is like an exam not for you but for your
                    moles or birthmarks. It lets you do the skin screening at
                    the comfort of your home with just a photo.{" "}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item md={3} xs={12} display="flex">
              <Card sx={{ flexGrow: 1 }}>
                <CardMedia
                  component="img"
                  height="90"
                  image="https://ik.imagekit.io/skinnnyskin/Icons/machine-learning_bptitwV5z.png?ik-sdk-version=javascript-1.4.3&updatedAt=1657136525976"
                  alt="machine learning"
                  sx={{ objectFit: "contain", mt: 1 }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    How does it work?
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    It can predict the probability of skin cancer in a given
                    photo using machine learning algorithms trained on thousands
                    of images.{" "}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item md={3} xs={12} display="flex">
              <Card>
                <CardMedia
                  component="img"
                  height="90"
                  image="https://ik.imagekit.io/skinnnyskin/Icons/probability_yx5xqCESJ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1657136894954"
                  alt="probability "
                  sx={{ objectFit: "contain", mt: 1 }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    What it can't do?
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Skin screen chesks the marks for cancer but it <b>CANNOT</b>{" "}
                    diagnose cancer. A test called biopsy can give you the final
                    diagnose.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item md={3} xs={12} display="flex">
              <Card>
                <CardMedia
                  component="img"
                  height="90"
                  image="https://ik.imagekit.io/skinnnyskin/Icons/photo_tnIarAWn4.png?ik-sdk-version=javascript-1.4.3&updatedAt=1657137423100"
                  alt="probability "
                  sx={{ objectFit: "contain", mt: 1 }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Give it a try!
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Give it a try by uploading a photo on the section. Not
                    convinced? Here are some stats we are really proud of.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" href="/upload">
                    {" "}
                    Upload{" "}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          sx={{
            flexGrow: 1,
            mt: 1
          }}
          spacing={1}
        >
          <Grid item md={3} xs={12} display="flex">
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Accuracy
                </Typography>
                <Typography variant="h3" color="text.secondary">
                  {this.state.appStats.accuracy}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Accuracy of the machine learning model calculated during the
                  training process.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={3} xs={12} display="flex">
            <Card sx={{ maxWidth: 380 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Results
                </Typography>
                <Typography variant="h3" color="text.secondary">
                  {this.state.appStats.resultsCount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total number of photos for which we had an result.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={3} xs={12} display="flex">
            <Card sx={{ maxWidth: 380 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Medium result time
                </Typography>
                <Typography variant="h3" color="text.secondary">
                  {this.state.appStats.averageResponse}s
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  The medium duration (in seconds) from uploading of the photo
                  until we have the result.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={3} xs={12} display="flex">
            <Card sx={{ maxWidth: 380 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Training a lot
                </Typography>
                <Typography variant="h3" color="text.secondary">
                  2940
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pictures were used for training in the machine learning process.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

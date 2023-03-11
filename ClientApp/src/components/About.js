import React from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import GitHubIcon from "@mui/icons-material/GitHub";
import { blue } from "@mui/material/colors";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function About(props) {
    return (
      <Box>
        <Box sx={{ flexGrow: 1 }}>
          <Card sx={{ padding: 1, flexGrow: 1 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                About
              </Typography>
              <Typography variant="body1" color="text.secondary">
                The aim of the project is to spread awareness about the
                importance of early diagnosis of skin cancer. An early diagnosis
                of cancer will increase the chances of cure.
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flexGrow: 1, mt: 3 }}>
          <Card sx={{ padding: 1 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Master's thesis
              </Typography>
              <Typography variant="body1" color="text.secondary">
                The project was author's master thesis presented at the Faculty
                of Electronics, Telecommunication and Technology Information
                from Cluj - Napoca in the 2022.
              </Typography>
              <Typography variant="body1" color="text.secondary">
               Developed between january 2021 - july 2022.
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flexGrow: 1, mt: 3 }}>
          <Card sx={{ padding: 1, flexGrow: 1 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Author
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Tivadar Ionut
              </Typography>
              <Typography variant="body1" color="text.secondary">
                .NET Software Engineer with over 5y experience developing
                desktop and web application.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                <GitHubIcon
                  fontSize="medium"
                  sx={{ color: blue[700], mr: 0.1 }}
                />
                <a href="https://github.com/itivadar"> github.com/itivadar</a>
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                <EmailIcon
                  fontSize="medium"
                  sx={{ color: blue[700], mr: 0.1 }}
                />
                <a href="mailto:mind.twist02@gmail.com"> mind.twist02@gmail </a>
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                <InstagramIcon
                  fontSize="medium"
                  sx={{ color: blue[700], mr: 0.1 }}
                />
                <a href="https://www.instagram.com/t.ionutandrei/">
                  {" "}
                  t.ionutandrei{" "}
                </a>
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flexGrow: 1, mt: 3 }}>
          <Card sx={{ padding: 1 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Attribution
              </Typography>
              <Typography variant="body1" color="text.secondary">
                For machine learning it uses the photos of skin moles from the
                HAM10000 database.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                The images from the home page are designed by the freepik.com.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    );
}
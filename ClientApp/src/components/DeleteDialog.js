import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import authService from "./api-authorization/AuthorizeService";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import UploadService from "../services/UploadService";

export default function DeleteDialog(props) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [imageId, setImageId] = React.useState(null);

  useEffect(() => {
    setDialogOpen(props.open);
  }, [props.open]);

  useEffect(() => {
    setImageId(props.imageId);
  }, [props.imageId]);

  function handleClose() {
    props.onClose();
    setDialogOpen(false);
  }

  function handleSuccess(imageId) {
    props.onDelete(imageId);
  }

  function handleDeleteRequest() {
    deleteImage(imageId);
    setDialogOpen(false);
  }

  async function deleteImage(imageId) {
    var token = await authService.getAccessToken();

    UploadService.deleteImage(imageId, token).then((response) => {
      if (response.ok === true) {
        handleSuccess(imageId);
      }
    });
  }

  return (
    <Dialog
      open={dialogOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to delete this image?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          It would not appear in any search and you will not able to see the
          result if you choose to delete.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleDeleteRequest()}> Yes</Button>
        <Button autoFocus onClick={() => handleClose()}>
          {" "}
          No{" "}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

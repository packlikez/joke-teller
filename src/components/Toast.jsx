import React from "react";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

// Props--------------
// onOpen: fn
// onClose: fn
// type: success|error

const Toast = (props) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.onClose();
  };

  return (
    <Snackbar open={props.isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        elevation={6}
        variant="filled"
        severity={props.type || "success"}
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;

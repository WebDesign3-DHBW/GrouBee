import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Avatar, Button, Dialog, DialogActions, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    maxWidth: 500,
    height: "100%",
    padding: theme.spacing(2),
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    padding: 0,
    paddingTop: 20,
  },
  button: {
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

export default function ProfilePopup({ open, close }) {
  const classes = useStyles();
  const [nameValue, setNameValue] = useState();

  // aus octo waffle
  //   handleUpload = e => {
  //     if (e.target.files[0] && e.target.files[0] !== this.state.image) {
  //       const image = e.target.files[0];
  //       this.setState(
  //         () => ({ image }),
  //         () => {
  //           const { image } = this.state;
  //           const uploadTask = storage.ref(`profileImages/${image.name}`).put(image);
  //           uploadTask.on(
  //             "state_changed",
  //             snapshot => {
  //               const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
  //               this.setState({ progress });
  //             },
  //             error => {
  //               console.log(error);
  //             },
  //             () => {
  //               storage
  //                 .ref("profileImages")
  //                 .child(image.name)
  //                 .getDownloadURL()
  //                 .then(imageUrl => {
  //                   this.setState({ imageUrl }, () => {
  //                     db.collection("Users")
  //                       .doc(this.props.registeredUserId)
  //                       .update({ profileImageUrl: this.state.imageUrl });
  //                   });
  //                 });
  //             }
  //           );
  //         }
  //       );
  //     }
  //   };

  const handleChange = (event, newValue) => {
    setNameValue(newValue);
  };

  return (
    <Dialog open={open} onClose={close}>
      <div className={classes.root}>
        <Avatar alt="Avatar" src="https://flerka.github.io/personal-blog/img/avatar-icon.png" />
        <Button>Bild ändern</Button>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="textfield"
          fullWidth
          value={nameValue}
          onChange={handleChange}
        />
        <DialogActions className={classes.buttons}>
          <Button onClick={close} className={classes.button}>
            Schließen
          </Button>
          <Button color="primary" onClick={handleChange} className={classes.button}>
            Speichern
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}

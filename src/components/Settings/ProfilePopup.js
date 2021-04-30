import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  Slide,
  Snackbar,
  TextField,
} from "@material-ui/core";
import { getCurrentUserData } from "../../firebase/getCurrentUserData";
import { updateCurrentUserData, updateUserName } from "../../firebase/updateCurrentUserData";
import MuiAlert from "@material-ui/lab/Alert";
import { storage } from "../../index";

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
  profileImage: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

export default function ProfilePopup({ open, close }) {
  const classes = useStyles();
  const [userName, setUserName] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState();
  const [progress, setProgress] = useState(0);

  // load user data in state
  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true);
      const currentUserData = await getCurrentUserData();
      setUserName(currentUserData.userName);
      setImageUrl(currentUserData.profileImage);
      setIsLoading(false);
      console.log("infinite loop warning!");
    };
    loadUserData();
  }, []);

  const handleChange = (event) => {
    setUserName(event.target.value);
  };

  const handleSave = async () => {
    if (userName) {
      const changes = {
        userName,
        imageUrl,
      };
      await updateCurrentUserData(imageUrl ? { ...changes, imageUrl } : changes);
    } else {
      setSnackbarContent({
        message: "Dein Name darf nicht leer sein.",
        status: "error",
        open: true,
      });
    }
  };

  async function saveUserNameToDB() {
    updateCurrentUserData({ userName });
    setSnackbarContent({
      message: "Du hast deinen Nutzernamen erfolgreich geändert!",
      status: "success",
      open: true,
    });
  }

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setImageUrl(image);
      const uploadTask = storage.ref(`profileImages/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("profileImages")
            .child(image.name)
            .getDownloadURL()
            .then((imageUrl) => {
              setImageUrl(imageUrl);
            });
        }
      );
    }
  };

  return (
    <>
      {snackbarContent?.open && (
        <Snackbar
          open={snackbarContent.open}
          autoHideDuration={5000}
          onClose={() =>
            setSnackbarContent((prevState) => {
              return { ...prevState, open: false };
            })
          }
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          TransitionComponent={Slide}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            className={classes.snackbar}
            severity={snackbarContent.status}
            onClose={() =>
              setSnackbarContent((prevState) => {
                return { ...prevState, open: false };
              })
            }
          >
            {snackbarContent.message}
          </MuiAlert>
        </Snackbar>
      )}
      <Dialog open={open} onClose={close}>
        <div className={classes.root}>
          <Avatar alt="Avatar" src={imageUrl} className={classes.profileImage} />
          <Button onChange={handleUpload}>
            Bild ändern
            <input type="file" style={{ display: "none" }} accept="image/*" />
          </Button>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="textfield"
            fullWidth
            value={userName}
            onChange={handleChange}
          />
          <DialogActions className={classes.buttons}>
            <Button onClick={close} className={classes.button}>
              Schließen
            </Button>
            <Button color="primary" onClick={handleSave} className={classes.button}>
              Speichern
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}

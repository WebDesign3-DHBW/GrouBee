import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  Slide,
  Snackbar,
  TextField,
} from "@material-ui/core";
import { getCurrentUserData } from "../../firebase/getCurrentUserData";
import { updateCurrentUserData } from "../../firebase/updateCurrentUserData";
import MuiAlert from "@material-ui/lab/Alert";
import { storage } from "../../index";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
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

  buttonProgress: {
    position: "absolute",
    top: "35%",
    left: "35%",
  },

  avatarContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  wrapper: {
    position: "relative",
    height: "100%",
  },

  profileImage: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginBottom: theme.spacing(1),
  },
}));

export default function ProfilePopup({ open, close }) {
  const classes = useStyles();
  const [userName, setUserName] = useState();
  const [profileImage, setProfileImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState();
  const [progress, setProgress] = useState(0);

  // load user data in state
  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true);
      const currentUserData = await getCurrentUserData();
      setUserName(currentUserData.userName);
      setProfileImage(currentUserData.profileImage);
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
        profileImage,
      };
      await updateCurrentUserData(profileImage ? { ...changes, profileImage } : changes);
      close();
    } else {
      setSnackbarContent({
        message: "Dein Name darf nicht leer sein.",
        status: "error",
        open: true,
      });
    }
  };

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setProfileImage(image);
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
            .then((profileImage) => {
              setProfileImage(profileImage);
            });
        }
      );
      setSnackbarContent({
        message: "Dein Bild wird hochgeladen. Vergiss nicht zu speichern!",
        status: "success",
        open: true,
      });
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
          <div className={classes.avatarContainer}>
            <div className={classes.wrapper}>
              <Avatar alt="Avatar" src={profileImage} className={classes.profileImage} />
              {progress < 100 && progress > 0 && (
                <CircularProgress size={24} className={classes.buttonProgress} />
              )}
            </div>
            <Button onChange={handleUpload} component="label">
              Bild ändern
              <input type="file" style={{ display: "none" }} accept="image/*" />
            </Button>
          </div>
          {isLoading ? (
            <>
              <Skeleton variant="rect" className={classes.textfield} height={48} animation="wave" />
            </>
          ) : (
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="textfield"
              fullWidth
              defaultValue={userName}
              onChange={handleChange}
            />
          )}
          <DialogActions className={classes.buttons}>
            <Button onClick={close} className={classes.button}>
              Schließen
            </Button>
            <Button
              color="primary"
              onClick={handleSave}
              className={classes.button}
              disabled={progress < 100 && progress > 0}
            >
              Speichern
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}

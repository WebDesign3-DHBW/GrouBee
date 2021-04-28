import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    button: {
        display: "flex",
        justifyContent: "space-between",
        padding: 0,
    }
})


export default function JoinGroup() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <DialogContentText>
                Gib deinen Gruppencode ein, um einer Gruppe beizutreten
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Gruppencode"
                type="textfield"
                fullWidth
            />
            <DialogActions className={classes.button}>
                <Button onClick={handleClose} color="lightgrey">
                    Abbrechen
                </Button>

                <Button onClick={handleClose} color="primary">
                    Beitreten
                </Button>
            </DialogActions>

        </div>
    );
}
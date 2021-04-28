import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, FormHelperText } from '@material-ui/core';

const useStyles = makeStyles({
    button: {
        display: "flex",
        justifyContent: "space-between",
        padding: 20,
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
            <DialogActions className={classes.abbrechen}>

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
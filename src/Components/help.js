import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';


function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
    outline: 'none',
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
          <Paper className="help2 "style={{minWidth:'18.3em',padding:'0.2em',cursor:'pointer'}} onClick={handleOpen}>
      <h2 >Help</h2>
          </Paper>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
              <div className="intro2"><img src="https://maps.google.com/mapfiles/ms/icons/red-dot.png" alt="red point" /><h3>signifies the start of the trip</h3></div>
              <div  className="intro2"><img src="https://maps.google.com/mapfiles/ms/icons/blue-dot.png" alt="red point" /><h3>points sampled at once per second displaying the speed of the car</h3></div>
              <div  className="intro2"><img src="https://maps.google.com/mapfiles/ms/icons/pink-dot.png" alt="red point" /><h3>signifies the end of the trip</h3></div>
              <h4>Click on any red mark,and click the simulation button to get started!</h4>
              <button onClick={handleClose}>Got it !</button>
              <p style={{color:'lightgrey'}}>&#169;<a href="https://nickkarvounakhs.netlify.com" style={{textDecoration:'none'}} target="_blank" rel="noopener noreferrer"> Karvounakis Nikos </a></p>
        </div>
      </Modal>
    </div>
  );
}

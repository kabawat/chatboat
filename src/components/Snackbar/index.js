import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
const ToastSnackbar = ({ handalClose, data }) => {
    const { show, vertical, horizontal, message, type, duration } = data;
    function SlideTransition(props) {
        return <Slide {...props} direction="up" />;
    }

    return (
        <Snackbar open={show} autoHideDuration={duration} anchorOrigin={{ vertical: "top", horizontal: 'center' }} TransitionComponent={SlideTransition} onClose={handalClose}>
            <Alert onClose={handalClose} severity={type} variant="filled" sx={{ width: '100%' }} >
                {message}
            </Alert>
        </Snackbar>
    )
}

export default ToastSnackbar

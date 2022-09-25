import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CallIcon from '@mui/icons-material/Call';
import { send } from 'emailjs-com'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Capstone Fitness Ltd
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();
function ContactPage(props) {

    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const openAlertDialog = () => {
        setOpen(true);
    };

    const handleClose = () => { //close dialog box
        setOpen(false);
    };

    const [toSend, setToSend] = useState({
        from_name: '',
        to_name: '',
        number: '',
        email: '',
        message: '',
        reply_to: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data.get('description'))
        setToSend({ from_name: data.get('name'), to_name: 'Capstone Admin', number: data.get('number'), email: data.get('email'), message: data.get('description'), reply_to: 'reply to' })
        console.log(toSend)
        send('service_v1yms9g', 'template_xyovbdd', toSend, 'BZDMgWPp4yzOEfhNZ')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setMessage("Message successfully sent. It may take up to 2 business days for a reply.")
                console.log(message)
                openAlertDialog();
            }, (err) => {
                console.log('FAILED...', err);
            });
            try {
                fetch("http://capstonefitnessbackend-env.eba-izrrrwby.ap-southeast-2.elasticbeanstalk.com/api/messages/", {
                  method: "POST",
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    userId: 0,
                    description: data.get('description'),
                    email: data.get('email'),
                    name: data.get('name'),
                    number: data.get('number'),
                  })
                }).then(res => {
                  return res.json();
                }).then(response => {
                  console.log('Successfully added message to database')
                })
                  .catch(error => {
                    console.log(error.message);
                  });
          
              } catch (error) {
                console.log(error.message)
              }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#2E3B55' }}>
                        <CallIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Contact Us
                    </Typography>
                    <Typography component="h1" variant="subtitle1">
                        Leave your details and your enquiry below.
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="number"
                                    label="Contact Number"
                                    name="number"
                                    autoComplete="phone-number"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name='description'
                                    id="description"
                                    label="Description"
                                    placeholder="Leave a message..."
                                    multiline
                                />
                            </Grid>
                            <Grid item xs={12}>

                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            style={{ background: '#2E3B55' }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
                <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Alert Dialog"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            </Container>

        </ThemeProvider>
    );
}

export default ContactPage;
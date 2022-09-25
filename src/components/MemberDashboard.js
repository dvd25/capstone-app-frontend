import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { useContext } from "react";
import { CustomContext } from "../context/Context";

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
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

export default function MemberDashboard() {

    //if unauthenticated will redirect users to sign in page
    const { currentUserInfo, setCurrentUserInfo} = useContext(CustomContext);

    //alert dialog to notify users that their signout is successful
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const openAlertDialog = () => {
        setOpen(true);
    };
    const handleClose = () => { //close dialog box
        setOpen(false);
    };

    //dialog post form
    const [openForm, setOpenForm] = React.useState(false);
    const handleClickOpenForm = () => {
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const email = data.get('email').length === 0 ? currentUserInfo.email : data.get('email');
        const password = data.get('password').length === 0 ? currentUserInfo.password : data.get('password');
        const firstName = data.get('firstName').length === 0 ? currentUserInfo.firstName : data.get('firstName');
        const lastName = data.get('lastName').length === 0 ? currentUserInfo.lastName : data.get('lastName');

        try {
          fetch(`http://capstonefitnessbackend-env.eba-izrrrwby.ap-southeast-2.elasticbeanstalk.com/api/users/${currentUserInfo.id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: email,
              password: password,
              firstName: firstName,
              lastName: lastName,
              membership: currentUserInfo.membership,
              role: currentUserInfo.role
            })
          }).then(res => {
            if(!res.ok) throw new Error(res.status);
            else return res.json();
          }).then(response => {
            let updatedUserInfo = response;
            updatedUserInfo['creationDate'] = currentUserInfo.creationDate
            setCurrentUserInfo(updatedUserInfo);
            setMessage('Successfully updated your details')
            handleCloseForm();
            openAlertDialog();
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
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Your Dashboard
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Hi, you are now signed as {currentUserInfo.firstName + " " + currentUserInfo.lastName}
                        </Typography>
  
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="lg">
                    {/* End hero unit */}
                    {/* User details  */}
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} md={4} >
                            <Card
                                sx={{ textAlign: 'left', maxHeight: '100%', display: 'flex', flexDirection: 'column' }}
                            >
                                <CardContent sx={{ flexGrow: 1 }} >
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Your Details
                                    </Typography>
                                    <Typography>
                                        Name: {currentUserInfo.firstName} {currentUserInfo.lastName}
                                    </Typography>
                                    <Typography>
                                        Email: {currentUserInfo.email}
                                    </Typography>
                                    <Typography>
                                        Club ID: {currentUserInfo.id}
                                    </Typography>
                                    <Typography>
                                        Current Plan: {currentUserInfo.membership}
                                    </Typography>
                                    <Typography>
                                        Join Date: {currentUserInfo.creationDate}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        type="submit"
                                        onClick={handleClickOpenForm}
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        style={{ background: '#2E3B55' }}
                                    >
                                        Edit Details
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} >
                            <Card
                                sx={{ maxHeight: '100%', display: 'flex', flexDirection: 'column' }}
                            >
                                <CardContent sx={{ flexGrow: 1 }} >
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Browse Plans
                                    </Typography>
                                    <Typography>
                                        You can contact us directly or browse new plans below.
                                    </Typography>

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        style={{ background: '#2E3B55' }}
                                        component={NavLink} to='/pricing'
                                    >
                                        Go to plans
                                    </Button>
                                </CardContent>
                            </Card>


                        </Grid>
                        <Grid item xs={12} sm={6} md={4} >
                            <Card
                                sx={{ maxHeight: '100%', display: 'flex', flexDirection: 'column' }}
                            >
                                <CardContent sx={{ flexGrow: 1 }} >
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Book an appointment
                                    </Typography>
                                    <Typography>
                                        You can contact us directly or make a booking online.
                                    </Typography>

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        style={{ background: '#2E3B55' }}
                                    >
                                        Book appointment
                                    </Button>
                                </CardContent>
                            </Card>


                        </Grid>
                    </Grid>
                </Container>
                {/* alerts user that they have successfully signed out */}
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
                {/* dialog for updating user details */}
                <Dialog open={openForm}  onClose={handleCloseForm}>
                    <DialogTitle></DialogTitle>
                    <DialogContent>
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
                                <Typography component="h1" variant="h5">
                                    Edit Details
                                </Typography>
                                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="given-name"
                                                name="firstName"
                                                required
                                                fullWidth
                                                defaultValue={currentUserInfo.firstName}
                                                id="firstName"
                                                label="First Name"
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="lastName"
                                                defaultValue={currentUserInfo.lastName}
                                                label="Last Name"
                                                name="lastName"
                                                autoComplete="family-name"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="email"
                                                defaultValue={currentUserInfo.email}
                                                label="Email Address"
                                                name="email"
                                                autoComplete="email"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                autoComplete="new-password"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 1 }}
                                        style={{ background: '#2E3B55' }}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        onClick={handleCloseForm}
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 1, mb: 2 }}
                                        style={{ background: '#f44336' }}
                                    >
                                        Cancel
                                    </Button>


                                </Box>
                            </Box>
                        </Container>
                    </DialogContent>
                </Dialog>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>

                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >

                </Typography>
                <Copyright />
            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
}
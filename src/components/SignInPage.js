import * as React from 'react';
import { useState } from 'react';
import { useContext} from 'react';
import { CustomContext } from "../context/Context";
import { Navigate, NavLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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

export default function SignInSide() {

 
  //authentication check, will be used in the dashboard pages through context.
  const {authenticated, setAuthenticated, setCurrentUserInfo} = useContext(CustomContext)
  const [role, setRole] = useState("");

  //for handling modal
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const openAlertDialog = () => {
    setOpen(true);
  };
  const handleClose = () => { //close dialog box
    setOpen(false);
  };

  //On submit will post to the server to sign in
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget); //input form data

    try {
      fetch("http://localhost:8080/api/users/login", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              email: data.get('email'),
              password: data.get('password'),

          })
      }).then(res => {
          return res.json();
        }).then(response => {
          if (response.signedIn === "true"){ //isAuthorized state true if signIn is true
            setAuthenticated(true);
            setRole(response.userInfo.role)
            setCurrentUserInfo(response.userInfo)
          }
          if (response.message === 'Email not found') {
            setMessage('Email not found, maybe you would like to sign in instead?')
            openAlertDialog();
            return;
          }
          if (response.message === 'Incorrect Password') {
            setMessage('Incorrect Password')
            openAlertDialog();
            return;
          }
        })
        .catch(error => {
          console.log(error.message);
        });

    } catch (error) {
      console.log(error.message)
    }
  };

  if (authenticated === true) { //if authorized redirect user to their dashboard
    if(role === "customer"){
      return <Navigate replace to="/dashboard" />;
    }
    if(role === "admin"){
      return <Navigate replace to="/admin-dashboard" />;
    }
  } 

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#2E3B55' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ background: '#2E3B55' }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item xs>
                  <Link component={NavLink} to="/register" href="#" variant="body2">
                    {"Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
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
    </ThemeProvider>
  );
}
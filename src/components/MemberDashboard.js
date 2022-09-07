import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
                            Hi User, this is your dashboard where you can do various actions.
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >   
                            <Button type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                style={{ background: 'orange' }}>Sign out</Button>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="lg">
                    {/* End hero unit */}
                    {/* User details  */}
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} md={4} >
                            <Card
                                sx={{ maxHeight: '100%', display: 'flex', flexDirection: 'column' }}
                            >
                                <CardContent sx={{ flexGrow: 1 }} >
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Your Details
                                    </Typography>
                                    <Typography>
                                        Name: David Hoang
                                    </Typography>
                                    <Typography>
                                        Email: david@capstonefitness.com
                                    </Typography>
                                    <Typography>
                                        Current Plan: Free
                                    </Typography>
                                    <Typography>
                                        Billing Date: None
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        type="submit"
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
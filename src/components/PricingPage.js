import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { CustomContext } from "../context/Context";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';


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

const tiers = [
    {
        title: 'Basic',
        price: '49.99',
        description: [
            '24/7 access to main floor',
            'Initial PT consultation',
        ],
        buttonText: 'Change',
        buttonVariant: 'outlined',
    },
    {
        title: 'Standard',
        subheader: 'Most popular',
        price: '79.99',
        description: [
            '24/7 Access to all facilities',
            '2 personal training sessions',
            '4 group events a month',
        ],
        buttonText: 'Change',
        buttonVariant: 'contained',
    },
    {
        title: 'Premium',
        price: '159.99',
        description: [
            '24/7 Access to all facilities',
            'Weekly PT Sessions',
            'Unlimited group events',
            'Bring a guest',
            'Limited edition starter pack',
        ],
        buttonText: 'Change',
        buttonVariant: 'outlined',
    },
];



function PricingContent() {

    const navigate = useNavigate();

    const { currentUserInfo } = useContext(CustomContext);
    return (
        <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />

            {/* Hero unit */}
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Pricing Plans
                </Typography>

                <Typography variant="h5" align="center" color="text.secondary" component="p">
                    Different membership plans to suit your needs and goals. Contact us directly if you still need something more personalised.
                </Typography>
                <Button type="submit" onClick={() => navigate(-1)}
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                style={{ background: 'orange' }}>Back to dashboard</Button>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="md" component="main">
                <Typography variant="h5" align="center" color="text.secondary" component="p">
                    CURRENT PLAN: {currentUserInfo.membership.toUpperCase()}
                </Typography>
                <Grid container spacing={5} alignItems="flex-end">
                    {tiers.map((tier) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid
                            item
                            key={tier.title}
                            xs={12}
                            sm={tier.title === 'Enterprise' ? 12 : 6}
                            md={4}
                        >
                            <Card>
                                <CardHeader
                                    title={tier.title}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{ align: 'center' }}
                                    action={tier.title === 'Pro' ? <StarIcon /> : null}
                                    subheaderTypographyProps={{
                                        align: 'center',
                                    }}
                                    sx={{
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'light'
                                                ? theme.palette.grey[200]
                                                : theme.palette.grey[700],
                                    }}
                                />
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'baseline',
                                            mb: 2,
                                        }}
                                    >
                                        <Typography component="h2" variant="h3" color="text.primary">
                                            ${tier.price}
                                        </Typography>
                                        <Typography variant="h6" color="text.secondary">
                                            /mo
                                        </Typography>
                                    </Box>
                                    <ul>
                                        {tier.description.map((line) => (
                                            <Typography
                                                component="li"
                                                variant="subtitle1"
                                                align="center"
                                                key={line}
                                            >
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardActions>
                                    <Button fullWidth variant={tier.buttonVariant}>
                                        {tier.buttonText}
                                    </Button>
                                </CardActions>
                            </Card>

                        </Grid>
                    ))}
                    
                </Grid>
            </Container>
            {/* Footer */}
            <Container
                maxWidth="md"
                component="footer"
                sx={{
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                    mt: 8,
                    py: [3, 6],
                }}
            >
                <Copyright sx={{ mt: 5 }} />
            </Container>
            {/* End footer */}
        </React.Fragment>
    );
}

export default function Pricing() {
    return <PricingContent />;
}
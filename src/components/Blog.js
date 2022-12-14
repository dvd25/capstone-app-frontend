import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './blog-components/Header';
import MainFeaturedPost from './blog-components/MainFeaturedPost';
import FeaturedPost from './blog-components/FeaturedPost';
import Main from './blog-components/Main';
import Sidebar from './blog-components/Sidebar';
import Footer from './blog-components/Footer';


const sections = [
  { title: 'Locations', url: '#' },
  { title: 'Trainers', url: '#' },
  { title: 'Our Culture', url: '#' },
  { title: 'About us', url: '#' },
  { title: 'Politics', url: '#' },

];

const mainFeaturedPost = {
  title: 'Capstone Fitness',
  description:
    "We have World Class Trainers, Facilities and Equipments.",
  image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  imageText: 'main image description',
  linkText: '',
};

const featuredPosts = [
  {
    title: 'Featured Event',
    date: 'Nov 12',
    description:
      'We have a new group training crossfit event every Saturday morning free for our premium members.',
    image: 'https://images.unsplash.com/photo-1580086319619-3ed498161c77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
    imageLabel: 'Image Text',
  },
  {
    title: 'Current Deals',
    date: 'September 2',
    description:
      'No joining fee for the whole of September. Call or come in to enquire with our friendly staff for more information.',
    image: 'https://images.unsplash.com/photo-1485727749690-d091e8284ef3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    imageLabel: 'Image Text',
  },
];

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

const theme = createTheme();

export default function Blog() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Capstone" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={2}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Main title="Latest News"/>
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Images are from Unsplash and used a MUI blog template as the base for this landing page."
      />
    </ThemeProvider>
  );
}

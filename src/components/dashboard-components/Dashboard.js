import * as React from 'react';
import axios from 'axios'
import { useEffect, useReducer } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Chart from './Chart';
import ActiveMembers from './MembersCard';
import Orders from './TasksTable';
import TasksCard from './TasksCard';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Capstone Fitness
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const mdTheme = createTheme();

function DashboardContent() {

  const initialState = {
    loading: true, //true when loading and no data in post
    tasks: [], //empty
    error: ''
  }
  
  const taskReducer = (taskState, action) => { // reducer function for fetching api
    switch (action.type) {
      case 'FETCH_SUCCESS':
        return {
          loading: false,
          tasks: action.payload,
          error: ''
        }
      case 'FETCH_ERROR':
        return {
          loading: false,
          tasks: {},
          error: 'Something went wrong'
        }
      default:
        return {
          tasks: {}
        }
    }
  }
  const userReducer = (userState, action) => { // reducer function for fetching api
    switch (action.type) {
      case 'FETCH_SUCCESS':
        return {
          loading: false,
          tasks: action.payload,
          error: ''
        }
      case 'FETCH_ERROR':
        return {
          loading: false,
          tasks: {},
          error: 'Something went wrong'
        }
      default:
        return {
          tasks: {}
        }
    }
  }

  const [taskState, taskDispatch] = useReducer(taskReducer, initialState) //useReducer hook for api call
  const [userState, userDispatch] = useReducer(userReducer, initialState) //useReducer hook for api call
  //fetching all tasks to use for all the child components
  useEffect(() => {
    const TASK_API_URL = 'http://localhost:8080/api/tasks/'
    const USER_API_URL = 'http://localhost:8080/api/users/'

    const fetchTaskData = () => {
      try {
        axios.get(TASK_API_URL)
          .then(response => {
            taskDispatch({ type: "FETCH_SUCCESS", payload: (response.data) })
            console.log("Fetch All Tasks Successful")
          })
          .catch(error => {
            taskDispatch({ type: "FETCH_ERROR" })
          })
      } catch (error) {
        console.log("error", error);
      }
    };
    //fetches all users
    const fetchUserData = () => {
      try {
        axios.get(USER_API_URL)
          .then(response => {
            userDispatch({ type: "FETCH_SUCCESS", payload: (response.data) })
            console.log("Fetch All Users Successful")
            console.log(response.data)
          })
          .catch(error => {
            userDispatch({ type: "FETCH_ERROR" })
          })
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchTaskData();
    fetchUserData();
  }, [])
  //console.log(userState)
  const TASK_CARD_PROPS = {tasks: taskState.tasks, users: userState.tasks}
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <ActiveMembers users={userState.tasks}/>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <TasksCard data={TASK_CARD_PROPS}/>
                </Paper>
              </Grid>
              {/* Total Tasks */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}

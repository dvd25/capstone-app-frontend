import * as React from 'react';
import { useContext } from 'react';
import { CustomContext } from "../../context/Context";
import Typography from '@mui/material/Typography';
import Title from './Title';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Container from '@mui/material/Container';
import DialogTitle from '@mui/material/DialogTitle';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

//Opens a dialogue for creating a new task

const categories = [
  {
    value: 'customer',
  },
  {
    value: 'employee',
  }
];

const status = [
  {
    value: 'unassigned',
  },
  {
    value: 'pending',
  },
  {
    value: 'accepted',
  },
  {
    value: 'started',
  },
  {
    value: 'completed',
  }
];

const priorityArray = [1, 2, 3, 4, 5]

function TasksCard(props) {
  //for managing the drop down menus in the task edit form
  const [currentCategory, setCurrentCategory] = React.useState('');
  const [currentStatus, setCurrentStatus] = React.useState('');
  const [currentDescription, setCurrentDescription] = React.useState('');
  const [currentPlaceholder, setCurrentPlaceholder] = React.useState('');
  const [currentComments, setCurrentComments] = React.useState('');
  const [currentPriority, setCurrentPriority] = React.useState('');
  const [currentAssignee, setCurrentAssignee] = React.useState('');

  const handleCategoryChange = (event) => {
    setCurrentCategory(event.target.value);
  };

  const handleStatusChange = (event) => {
    setCurrentStatus(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setCurrentDescription(event.target.value);
  };

  const handleCommentsChange = (event) => {
    setCurrentComments(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setCurrentPriority(event.target.value);
  };

  const handleAssigneeChange = (event) => {
    setCurrentAssignee(event.target.value);
  };

  //dialog post form
  const [openForm, setOpenForm] = React.useState(false);

  const handleClickOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const { setFetchCallCount } = useContext(CustomContext) //context hook to trigger api call from parent component
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(currentAssignee)
    console.log(currentDescription)
    // const category = data.get('category')
    // console.log(category)
    // const password = data.get('password')
    // const firstName = data.get('firstName')
    // const lastName = data.get('lastName')
    
    try {
      fetch(`http://localhost:8080/api/tasks`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: currentCategory,
          description: currentDescription,
          comments: currentComments,
          status: currentStatus,
          assignedTo : currentAssignee,
          priority: currentPriority
        })
      }).then(res => {
        if (!res.ok) throw new Error(res.status);
        else return res.json();
      }).then(response => {
        console.log("Task created successfuly")
        setFetchCallCount(prevState => prevState + 1);
        handleCloseForm();

      })
        .catch(error => {
          console.log(error.message);
        });

    } catch (error) {
      console.log(error.message)
    }
  };
  
    
  return (
    <React.Fragment>
      <Title>Total Tasks</Title>
      <Typography component="p" variant="h4">
        {/* Length of tasks */}
        {props.data.tasks.length}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        as of {new Date().getDate()}-{new Date().getMonth()}-{new Date().getFullYear()}
      </Typography>
      <div>
        <Button variant="outlined" onClick={handleClickOpenForm}>Add new task</Button>
      </div>
      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle></DialogTitle>
        <DialogContent>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                Create New Task
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="outlined-select-category"
                      select
                      fullWidth
                      value={currentCategory}
                      label="Category"
                      onChange={handleCategoryChange}
                      helperText="Category"
                    >
                      {categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="outlined-select-status"
                      name="status"
                      select
                      fullWidth
                      label="Status"
                      helperText="Status"
                      value={currentStatus}
                      onChange={handleStatusChange}
                    >
                      {status.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="outlined-select-priority"
                      name="priority"
                      select
                      fullWidth
                      label="Priority"
                      value={currentPriority}
                      onChange={handlePriorityChange}
                      helperText="Priority"
                    >
                      {priorityArray.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="outlined-select-assignee"
                      name="assignTo"
                      select
                      fullWidth
                      value={currentAssignee}
                      onChange={handleAssigneeChange}
                      label="Assign To"
                      helperText="Assign To"
                    >
                      {props.data.users.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          ID: {option.id} | {option.firstName}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="filled-textarea-description"
                      label="Description"
                      placeholder={currentPlaceholder}
                      multiline
                      onChange={handleDescriptionChange}
                      value={currentDescription}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="filled-textarea-comments"
                      label="Notes"
                      placeholder="Notes..."
                      multiline
                      onChange={handleCommentsChange}
                      value={currentComments}
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
                  Create
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
    </React.Fragment>
  );
}

export default TasksCard;
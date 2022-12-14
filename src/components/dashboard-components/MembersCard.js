import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Title from './Title';
import Button from '@mui/material/Button';



export default function ActiveMembers(props) {

  const navigate = useNavigate()

  function handleClick (event) {
    navigate('/manage-members')
  }

  return (
    <React.Fragment>
      <Title>Active Members</Title>
      <Typography component="p" variant="h4">
        {props.users.length}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
      as of {new Date().getDate()}-{new Date().getMonth()}-{new Date().getFullYear()}
      </Typography>
      <div>
        <Button variant="outlined" onClick={() => handleClick()}>Manage All Members</Button>
      </div>
    </React.Fragment>
  );
}

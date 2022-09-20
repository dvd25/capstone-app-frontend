import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import Button from '@mui/material/Button';

function handleClickOpenForm (event) {
  event.preventDefault();
}

export default function ActiveMembers(props) {
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
        <Button variant="outlined" onClick={() => handleClickOpenForm()}>Manage All Members</Button>
      </div>
    </React.Fragment>
  );
}

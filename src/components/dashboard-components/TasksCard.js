import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function TasksCard() {
  return (
    <React.Fragment>
      <Title>Total Tasks</Title>
      <Typography component="p" variant="h4">
        16
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
      as of {new Date().getDate()}-{new Date().getMonth()}-{new Date().getFullYear()}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View All Tasks
        </Link>
      </div>
    </React.Fragment>
  );
}
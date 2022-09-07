import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function ActiveMembers() {
  return (
    <React.Fragment>
      <Title>Active Members</Title>
      <Typography component="p" variant="h4">
        255
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
      as of {new Date().getDate()}-{new Date().getMonth()}-{new Date().getFullYear()}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View All Members
        </Link>
      </div>
    </React.Fragment>
  );
}

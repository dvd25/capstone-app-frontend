import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Title from './Title';
import Button from '@mui/material/Button';



export default function MessagesCard(props) {

  const navigate = useNavigate()

  function handleClick (event) {
    navigate('/messages')
  }

  return (
    <React.Fragment>
      <Title>Total Messages</Title>
      <Typography component="p" variant="h4">
        {3}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
      as of {new Date().getDate()}-{new Date().getMonth()}-{new Date().getFullYear()}
      </Typography>
      <div>
        <Button variant="outlined" onClick={() => handleClick()}>Go to Message Center</Button>
      </div>
    </React.Fragment>
  );
}

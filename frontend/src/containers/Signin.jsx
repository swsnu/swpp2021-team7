import React, {useEffect} from 'react';
import {
  Container,
  CssBaseline,
  TextField,
  Box,
  Grid,
  Link,
  Button
} from '@mui/material';
import logo from '../image/256w/자산 1_256.png';
import { withRouter } from 'react-router';
import axios from 'axios';


function Signin(props) {
  async function postData(json) {
    try {
      props.testAxios ? props.testAxios() : await axios.post('/account/signin/', json, {
        headers:{
          'Content-type': 'application/json'
        }
      });
      props.testAxios ? alert("Success") : props.history.push('/');
    } catch(err) {
      alert('Email or Password does not exist');
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
      email: data.get('email'),
      password: data.get('password'),
    };
    data = JSON.stringify(data);
    postData(data);
  };

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img 
              src={logo}
              style={{margin: 20}}
          /> 
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link 
                    style={{textDecoration: 'none', color: 'gray'}} 
                    href="/sign/join" 
                    variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default withRouter(Signin);

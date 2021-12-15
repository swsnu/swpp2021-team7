import React from 'react';
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


function Signup(props) {
  async function postData(json) {
    try {
      const response = await axios.post('/account/signup/', json, {
        headers: {
          'Content-type': 'application/json'
        }
      });
      alert('Sign Up Complete!');
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    if (data.get('password') === data.get('password_check')) {
      data = {
        email: data.get('email'),
        first_name: data.get('first_name'),
        last_name: data.get('last_name'),
        password: data.get('password'),
      };
      data = JSON.stringify(data);
      postData(data);
      props.history.push('/sign/login');
    } else {
      alert('Two passwords are different! Please Check')
    }
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
            style={{ margin: 20 }}
          />
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="Fisrt Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password_check"
                  label="Re-enter Password"
                  type="password"
                  id="password_check"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              JOIN
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  style={{ textDecoration: 'none', color: 'gray' }}
                  href="/sign/login"
                  variant="body2"
                >
                  Already have account? Sign In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default withRouter(Signup);
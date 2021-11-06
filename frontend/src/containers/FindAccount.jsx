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

function FindAccount(props) { 
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
        email: data.get('email'),
        });
        props.history.push('/sign/login');
    };

    return(
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
                        </Grid>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        FIND ACCOUNT
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link 
                                    style={{textDecoration: 'none', color: 'gray'}} 
                                    href="/sign/login" 
                                    variant="body2"
                                >
                                Do you already know password? Sign In
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </React.Fragment>
  );
}

export default withRouter(FindAccount);
import React, { Component } from 'react';

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import { withRouter } from 'react-router';

import { grey } from '@mui/material/colors';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#ffffff',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });

class SearchIdol extends Component {
    constructor(props){
        super(props);
        this.keyPress = this.keyPress.bind(this);
    }
    redirectSearchResult = () => {
        this.props.history.push('/video/search');
    }
    keyPress(e){
        if(e.keyCode == 13){
           this.redirectSearchResult();
           // put the login here
        }
     }
    render() {
        return (
            <Container 
                className={this.props.className}
                maxWidth="sm">
                    <Stack direction="row" spacing={1}
                            justifyContent="center"
                            alignItems="center"
                            width="100%"
                            marginTop="32px"
                            marginBottom="32px">

                    <TextField
                        id="input-with-icon-textfield"
                        label={this.props.hint}
                        width="100%"
                        onKeyDown={this.keyPress} 
                        onChange={this.props.changeInput}
                        InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                            <SearchIcon
                                sx={{ color: '#b3e5fc' }}/>
                            </InputAdornment>
                        ),
                        }}
                        variant="standard"
                        sx={{ label: {color:'#ffffff'}, input: { color: '#ffffff' } }}
                        color="primary" focused
                        fullWidth
                        />
                    </Stack>
                </Container>
        )
    }
}

export default withRouter(SearchIdol);

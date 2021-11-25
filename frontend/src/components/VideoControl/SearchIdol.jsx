import React, { Component } from 'react';

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import { withRouter } from 'react-router';


class SearchIdol extends Component {
    constructor(props){
        super(props);
        this.keyPress = this.keyPress.bind(this);
    }
    redirectSearchResult = () => {
        this.props.history.push('/video/search');
    }
    keyPress(e){
        //if(e.keyCode == 13){
           this.redirectSearchResult();
           // put the login here
        //}
     }
    render() {
        return (
            <Container maxWidth="sm">
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
                        InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                            <SearchIcon/>
                            </InputAdornment>
                        ),
                        }}
                        variant="standard"
                        />
                    </Stack>
                </Container>
        )
    }
}

export default withRouter(SearchIdol);

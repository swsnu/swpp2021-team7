import React, { Component } from 'react';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import Pagination from '@mui/material/Pagination';
import { withStyles } from "@material-ui/core/styles";

import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';

import IdolItem from '../components/VideoControl/IdolItem';
import SearchIdol from '../components/VideoControl/SearchIdol';


export default class VideoSearching extends Component {
    render() {
        return (
            <React.Fragment>
                <Container maxWidth="sm">
                    <img
                        width="200px"
                        src="/images/vidol_text_512.png"/>
                </Container>
                <SearchIdol></SearchIdol>
                <Container maxWidth="sm">
                    <List sx={{
                        width: '100%',
                        bgcolor: 'background.paper',
                        position: 'relative',
                    }}>
                        <IdolItem num="1" active={"active"} name="V" icon="/images/BTS_V.jpg"></IdolItem>
                        <IdolItem num="2" active={"active"} name="IU" icon="/images/IU.jpg"></IdolItem>
                        <IdolItem num="3" active={"non-active"} name="SinB" icon="/images/girlfriend_sinbi.jpeg"></IdolItem>
                        <IdolItem num="4" active={"active"} name="Joy" icon="/images/redbelvet_joy.jpeg"></IdolItem>
                    </List>
                </Container>
                
            </React.Fragment>
        )
    }
}

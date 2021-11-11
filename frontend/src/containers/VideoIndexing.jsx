import React, { Component } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

import SearchIdol from '../components/VideoControl/SearchIdol';
import ChooseType from '../components/VideoControl/ChooseType';

class VideoIndexing extends Component {
    cutScene(e){

    }
    extractParts(e){

    }
    render() {
        return (
            <React.Fragment>
                <Container maxWidth="sm">
                    <img
                        width="200px"
                        src="/images/vidol_text_512.png"/>
                </Container>
                <SearchIdol
                    hint="Youtube link url"></SearchIdol>
                <Container maxWidth="sm">
                    <ChooseType></ChooseType>
                </Container>
            </React.Fragment>
        )
    }
}

export default VideoIndexing
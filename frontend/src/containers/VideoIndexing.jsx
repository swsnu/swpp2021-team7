import React, { Component } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

import SearchIdol from '../components/VideoControl/SearchIdol';

class VideoIndexing extends Component {
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
                    <Stack direction="row" spacing={2}
                        justifyContent="center"
                        alignItems="center">
                        <Button variant="outlined">
                            Cut scenes
                        </Button>
                        <Button variant="contained">
                            Extract My Idol Parts
                        </Button>
                    </Stack>
                </Container>
            </React.Fragment>
        )
    }
}

export default VideoIndexing
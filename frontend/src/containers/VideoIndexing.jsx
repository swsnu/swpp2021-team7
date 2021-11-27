import React, { Component } from 'react';
import Container from '@mui/material/Container';
import SearchIdol from '../components/VideoControl/SearchIdol';
import ChooseType from '../components/VideoControl/ChooseType';

class VideoIndexing extends Component {

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
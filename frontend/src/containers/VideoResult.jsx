import React, { Component } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import YoutubeVideo from '../components/VideoControl/YoutubeVideo';
import IdolSelector from '../components/VideoControl/IdolSelector';
import Timeline from '../components/VideoControl/Timeline';


export default class VideoResult extends Component {
    
    render() {
        
        return (
            <React.Fragment>
                <Container maxWidth="sm">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <YoutubeVideo></YoutubeVideo>
                        </Grid>
                        <Grid item xs={12}>
                            <IdolSelector></IdolSelector>
                        </Grid>
                        
                    </Grid>
                    </Box>
                </Container>
                <Container maxWidth="sm">
                    <Grid item xs={12}>
                        <Timeline
                            color={"#007aff"}
                            time={[4,10,12,4,102]}/>
                        <Timeline
                            color={"#ff7aff"}
                            time={[4,10,12,4,102]}/>
                            
                    </Grid>
                </Container>
            </React.Fragment>
        )
    }
}
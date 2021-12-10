import React, { Component } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import YoutubeVideo from '../components/VideoControl/YoutubeVideo';
import IdolSelector from '../components/VideoControl/IdolSelector';
import Timeline from '../components/VideoControl/Timeline';

import LinearProgressWithLabel from '../components/VideoControl/VideoLoading';

import { withRouter } from 'react-router';
import axios from 'axios';

import "./VideoResult.css";

const CutScene = 1001;
const FaceRecognition = 1002;
class VideoResult extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            type : 0,
            loading : true,
            progress : 10,
            video : "",
            selectedIdol : []
        }
    }
    handlingLoad(){
        const timer = setInterval(() => {
            this.setState({"progress" : ((this.state.progress >= 100 ? 10 : this.state.progress + 10))});
            if(this.state.progress >= 100 ){
                clearInterval(timer);
                this.setState({"loading" : false});
            }
          }, 800);
          return () => {
            clearInterval(timer);
          }
    }
    componentDidMount(){
        this.handlingLoad();
        const params = new URLSearchParams(this.props.location.search);
        const video = params.get('video');
        this.setState({"video":video});
    }
    render() {
        
        return (
            <>
                {this.state.loading && (
                <Container 
                    className="video-loading-container loading-middle">
                    <div
                        className="video-loading-box">
                        <p
                            className="video-loading-title">
                                Vidol AI is processing the video file and 
                                going to generate video clips soon.
                        </p>
                        <LinearProgressWithLabel value={this.state.progress} />
                    </div>
                </Container>
                )}
                <Container 
                    className="video-loading-container video-loading--background"></Container>
                <React.Fragment>
                    <Container maxWidth="sm">
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <YoutubeVideo
                                    videoUrl={this.state.video}></YoutubeVideo>
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
            </>
        )
    }
}

export default withRouter(VideoResult);
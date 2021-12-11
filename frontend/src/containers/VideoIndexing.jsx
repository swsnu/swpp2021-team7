import React, { Component } from 'react';
import Container from '@mui/material/Container';
import SearchIdol from '../components/VideoControl/SearchIdol';
import ChooseType from '../components/VideoControl/ChooseType';
import StyledBreadCrumb from '../components/VideoControl/StyledBreadCrumb';

import YoutubeVideo from '../components/VideoControl/YoutubeVideo';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import AutofpsSelectOutlinedIcon from '@mui/icons-material/AutofpsSelectOutlined';
import SafetyDividerOutlinedIcon from '@mui/icons-material/SafetyDividerOutlined';

import { withRouter } from 'react-router';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
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

import { lightBlue } from '@mui/material/colors';

import './VideoIndexing.css';

class VideoIndexing extends Component {
    constructor(props){
        super(props);
        this.state = {type : "FACE", url:""};
        this.changeInput = this.changeInput.bind(this);
    }
    handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }
    getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    matchYoutubeUrl(url) {
        var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if(url.match(p)){
            return url.match(p)[1];
        }
        return false;
    }
    changeInput(event){
        event.preventDefault();
        let value = event.target.value;
        if(this.matchYoutubeUrl(value.trim())){
            let id = this.getParameterByName('v',value.trim());
            if(id != null){
                this.setState({url:id.trim()});
            }else{
                this.setState({url:false});
            }
        }else{
            this.setState({url:false});
        }
    }
    render() {
        return (
            <React.Fragment>
                <img
                className="background-image"
                width="100%"
                src="/images/video-background.jpg"
                />
                <Container maxWidth="sm">
                    <img
                        width="200px"
                        src="/images/vidol_text_512.png"/>
                </Container>
                <Container maxWidth="sm">
                    <h2
                    className="vidol-search--title">
                        Generate your video clips
                    </h2>
                    <h3
                    className="vidol-search--title">
                        Find the video by Youtube link and generate video clips with VIDOL AI
                    </h3>
                </Container>
                <Container
                    className="breadcrumbs"
                    maxWidth="sm">
                <Breadcrumbs
                        separator={<ArrowRightAltIcon 
                            sx={{ color: '#b3e5fc' }}
                            fontSize="small" />}
                        aria-label="breadcrumb">
                        <StyledBreadCrumb
                        component="a"
                        //href="#"
                        label="Video upload"
                        icon={<OndemandVideoOutlinedIcon fontSize="small" />}
                        />
                        <StyledBreadCrumb 
                            component="a" 
                            href="#" 
                            label="find Idols"
                            icon={<SafetyDividerOutlinedIcon fontSize="small"/>} />
                        <StyledBreadCrumb 
                            component="a" 
                            href="#" 
                            label="Get results"
                            icon={<AutofpsSelectOutlinedIcon fontSize="small"/>} />
                </Breadcrumbs>
                </Container>
                <SearchIdol
                    className="search-inputs"
                    changeInput={this.changeInput}
                    color={lightBlue[500]}
                    hint="Youtube link url"></SearchIdol>
                {this.state.url && (<Container 
                    className="preview-video"
                    maxWidth="sm">
                    <YoutubeVideo
                        videoUrl={this.state.url}></YoutubeVideo>
                </Container>
                )}
                <Container maxWidth="sm">
                    <ChooseType
                        isView={(this.state.url)? true : false}></ChooseType>
                </Container>
            </React.Fragment>
        )
    }
}

export default withRouter(VideoIndexing);
import React, { Component } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';

import { styled } from '@mui/material/styles';

import YoutubeVideo from '../components/VideoControl/YoutubeVideo';
import IdolSelector from '../components/VideoControl/IdolSelector';
import Timeline from '../components/VideoControl/Timeline';

import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

import LinearProgressWithLabel from '../components/VideoControl/VideoLoading';

import { withRouter } from 'react-router';
import axios from 'axios';

import StyledBreadCrumb from '../components/VideoControl/StyledBreadCrumb';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import AutofpsSelectOutlinedIcon from '@mui/icons-material/AutofpsSelectOutlined';
import SafetyDividerOutlinedIcon from '@mui/icons-material/SafetyDividerOutlined';

import "./VideoResult.css";

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

const CutScene = 1001;
const FaceRecognition = 1002;

const TYPE_YOUTUBE = 100
const TYPE_FILE = 200
class VideoResult extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: 0,
            loading: true,
            progress: 10,
            video: "",
            selectedIdol: [],
            selectedIdolInfo: [

            ],
            detectList: []
        }
    }
    async getBySearchMemberId(id) {
        try {
          const response = await axios.get(`search-result/member/${id}/`);
          this.setSearchResult(response.data);
        } catch(err) {
          
        }
    }
    async getVideoScene(video) {
        try {
          const response = await axios.post(`video/scene/`,{
              type : TYPE_YOUTUBE,
              target : video,
              option : {}
          });
          this.setSceneResult(response.data);
        } catch(err) {
          this.setState({"loading" : false});
        }
    }
    async getFaceRecognition(video, selected_idol) {

        try {
          const response = await axios.post(`video/recognition/`,{
              type : TYPE_YOUTUBE,
              target : video,
              option : {
                  idol : selected_idol
              }
          });
          this.setFaceRecognitionResult(response.data);
        } catch(err) {          
          this.setState({"loading" : false});
        }
    }
    setSearchResult(data) {
        if (Object.keys(data).includes("basicInfo")) {
            this.setState({ "selectedIdolInfo": [...this.state.selectedIdolInfo, data.basicInfo] });
        }
    }
    setFaceRecognitionResult(data) {
        this.setState({ detectList: data });
        this.setState({ "loading": false });
    }
    setSceneResult(data){   
        this.setState({detectList : data});
        this.setState({"loading" : false});
    }
    handlingLoad() {
        const timer = setInterval(() => {
            this.setState({ "progress": ((this.state.progress >= 100 ? 10 : this.state.progress + 10)) });
            if (this.state.progress >= 100) {
                clearInterval(timer);

            }
        }, 200);
        return () => {
            
        }
    }
    componentDidMount() {
        this.handlingLoad();
        const params = new URLSearchParams(this.props.location.search);

        let video = params.get('video');
        let type = params.get('type');
        let idols = params.get('idol');
        if (!video || !type) {
            this.props.history.push("/video");
            return;
        }
        type = parseInt(type);
        if (type == FaceRecognition && !idols) {
            this.props.history.push("/video/search?video=" + video + "&type=" + FaceRecognition);
            return;
        }
        let selected_idol = new Array();
        if (type == FaceRecognition) {
            let idol_list = idols.split(",");


            idol_list.forEach(el => {

                if (!isNaN(parseInt(el))) {
                    selected_idol.push(parseInt(el));
                }
            });
            this.setState({"selectedIdol":selected_idol});
            selected_idol.forEach(id => {
                this.getBySearchMemberId(id);
            });
        }

        this.setState({ "video": video, "type": type });


        if (type == CutScene) {
            this.getVideoScene(video);
        } else {
            this.getFaceRecognition(video, selected_idol);
        }
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
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Container maxWidth="sm">
                            <img
                                width="200px"
                                src="/images/vidol_text_512.png" />
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
                                    href="#"
                                    label="Video upload"
                                    icon={<OndemandVideoOutlinedIcon fontSize="small" />}
                                />
                                <StyledBreadCrumb
                                    component="a"
                                    href="#"
                                    label="find Idols"
                                    icon={<SafetyDividerOutlinedIcon fontSize="small" />} />
                                <StyledBreadCrumb
                                    component="a"
                                    href="#"
                                    label="Get results"
                                    icon={<AutofpsSelectOutlinedIcon fontSize="small" />} />
                            </Breadcrumbs>
                        </Container>
                    </Grid>
                    <Grid item xs={(this.state.type == FaceRecognition) ? 8 : 12}>
                        <YoutubeVideo
                            videoUrl={this.state.video}></YoutubeVideo>
                    </Grid>
                    {(this.state.type == FaceRecognition) ? (
                        <>
                            <Grid item xs={4}>
                                <div
                                    className="idol-selector-box">
                                    <p className="title">Options</p>
                                    <div className="idol-selector-box-row">
                                        <div className="option-title">
                                            <span className="option-title">
                                                Idols
                                            </span>
                                        </div>
                                        <div className="option-list">
                                            <Paper
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    flexWrap: 'wrap',
                                                    listStyle: 'none',
                                                    p: 0.5,
                                                    m: 0,
                                                    bgcolor: "#222222",
                                                    height: "48px"
                                                }}
                                                component="ul"
                                            >
                                                {this.state.selectedIdolInfo.length > 0 ? this.state.selectedIdolInfo.map((item, key) => {

                                                    return (
                                                        <ListItem key={key}
                                                            className="test-listitem">
                                                            <Chip
                                                                key={key}
                                                                sx={{ color: "#ffffff" }}
                                                                avatar={<Avatar alt="Natacha" src={item.thumbnail} />}
                                                                label={item.info.name.kor + ' ' + item.info.name.eng}
                                                                onDelete={(e) => this.handleDelete(item)}
                                                            />
                                                        </ListItem>
                                                    )
                                                }) : <></>
                                                }
                                            </Paper>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12}>

                                {this.state.selectedIdolInfo.length > 0 && this.state.selectedIdolInfo.length == this.state.detectList.length ? this.state.selectedIdolInfo.map((item, key) => {
                                    return (
                                        <Timeline
                                            key={key}
                                            type={FaceRecognition}
                                            icon={item.thumbnail}
                                            color={"#007aff"}
                                            time={this.state.detectList[key]} />
                                    )
                                }) : <></>
                                }
                            </Grid>
                        </>
                    ) : (
                        <Grid item xs={12}>
                            <Timeline
                                type={CutScene}
                                color={"#007aff"}
                                time={this.state.detectList} />
                        </Grid>
                    )}
                </Grid>

            </>
        )
    }
}

export default withRouter(VideoResult);
import React, { Component } from 'react';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button'

import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

import IdolItem from '../components/VideoControl/IdolItem';
import SearchIdol from '../components/VideoControl/SearchIdol';
import StyledBreadCrumb from '../components/VideoControl/StyledBreadCrumb';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import AutofpsSelectOutlinedIcon from '@mui/icons-material/AutofpsSelectOutlined';
import SafetyDividerOutlinedIcon from '@mui/icons-material/SafetyDividerOutlined';

import LinearProgressWithLabel from '../components/VideoControl/VideoLoading';

import "./VideoSearching.css";
import { touchRippleClasses } from '@mui/material';
import { withRouter } from 'react-router';

const CutScene = 1001;
const FaceRecognition = 1002;

import axios from 'axios';
const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));
class VideoSearching extends Component {

    constructor(props){
        super(props);
        this.state = {
            type : 0,
            query : "",
            loading : true,
            progress : 10,
            video: "",
            submitDone : true,
            searchResult : [{
                'id': 1, 
            'name': {
                'kor':"뷔",
                'eng':"V"
            },
            'isGroup': false, 
            'thumbnail':"/images/BTS_V.jpg",
            'hasModel' : true
            }],
            selectedIdol : []
        }
        this.searchQuery = this.searchQuery.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleIdols = this.handleIdols.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.nextStep = this.nextStep.bind(this);
    }
    nextStep(event){
        
        if(!this.state.video || this.state.video.length == 0){
            this.props.history.push("/video");
            return;
        }
        let idols = "";
        this.state.selectedIdol.forEach((el) => {
            idols += (el.id+",");
        });
        this.props.history.push("/video/result?video="+this.state.video+"&type="+FaceRecognition+"&idol="+idols);
    }
    handlingLoad(){
        const timer = setInterval(() => {
            this.setState({"progress" : ((this.state.progress >= 100 ? 10 : this.state.progress + 10))});
            if(this.state.progress >= 100 ){
                clearInterval(timer);
                this.setState({"loading" : false});
            }
          }, 200);
          return () => {
            //clearInterval(timer);
          }
    }

    async getBySearchKeyword(keyword) {
        try {
          const response = await axios.get(`search-result/search/${keyword}/`);
          this.setSearchResult(response.data);
        } catch(err) {
          //console.error(err);
        }
    }
    handleIdols(item){
        
        if(item.hasModel && !this.state.selectedIdol.includes(item)){
            this.setState({selectedIdol:[...this.state.selectedIdol, item]});
        }else{
            let newArray = this.state.selectedIdol.slice();
            newArray.splice(newArray.indexOf(item),1)
            this.setState({selectedIdol:newArray});
            
        }
    }
    handleDelete(item){
        let newArray = this.state.selectedIdol.slice();
        newArray.splice(newArray.indexOf(item),1)
        this.setState({selectedIdol:newArray});
    }
    setSearchResult(list){
        this.setState({searchResult : list});
    }
    searchQuery(event){
        this.setState({query:event.target.value});
    }
    handleSubmit(event){
        event.preventDefault();
        const keyword = this.state.query;
        this.getBySearchKeyword(keyword);
        this.setState({submitDone:true});
    };
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
                                Choose your Idols from Vidol database.
                        </p>
                        <LinearProgressWithLabel value={this.state.progress} />
                    </div>
                </Container>
                )}
                <Container 
                    className="video-loading-container video-loading--background"></Container>
                <React.Fragment>
                    <Container maxWidth="sm">
                        <img
                            width="200px"
                            src="/images/vidol_text_512.png"/>
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
                            icon={<SafetyDividerOutlinedIcon fontSize="small"/>} />
                        <StyledBreadCrumb 
                            component="a" 
                            href="#" 
                            label="Get results"
                            icon={<AutofpsSelectOutlinedIcon fontSize="small"/>} />
                </Breadcrumbs>
                </Container>
                    <Container component="form" 
                            onSubmit={this.handleSubmit} 
                            noValidate 
                            maxWidth="sm"
                            sx={{ mt: 1 }}
                            display="flex"
                            width={500}>
                        <SearchIdol
                            changeInput={this.searchQuery}
                            hint="Keywords (searching Idols)"></SearchIdol>
                    </Container>
                    <Paper
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0.5,
                            m: 0,
                            bgcolor:"#222222",
                            height :  "48px"
                        }}
                        component="ul"
                        >
                        {this.state.selectedIdol.length > 0 ? this.state.selectedIdol.map((item) => {
                                            
                                            return (
                                                <ListItem key={item.key}>
                                                    <Chip
                                                    key={item.key}
                                                    sx={{color:"#ffffff"}}
                                                    avatar={<Avatar alt="Natacha" src={item.thumbnail} />}
                                                    label={item.name.kor + ' ' + item.name.eng}
                                                    onDelete={(e) => this.handleDelete(item)}
                                                    />
                                                </ListItem>
                                        )}) : <></>
                                }
                    </Paper>
                    <Container maxWidth="sm">
                        <List sx={{
                            width: '100%',
                            bgcolor: '#222222',
                            position: 'relative',
                        }}>

                            {   
                                this.state.submitDone && (
                                    <Box xs={{mt:10}}>
                                        <Typography sx={{color:"#ffffff"}}
                                            variant="h6"> Search Result </Typography>
                                        {this.state.searchResult ? this.state.searchResult.map((item) => {
                                            return (<IdolItem 
                                                        onClick={(e) => {this.handleIdols(item)}}
                                                        name={item.name.kor + ' ' + item.name.eng} 
                                                        num={item.id} key={item.id} 
                                                        icon={item.thumbnail} active={item.hasModel}/>)
                                        }) : "Loading..."
                                        } 
                                    </Box>
                                )
                            }
                        </List>
                    </Container>
                    <Container maxWidth="sm">
                        <Button 
                            className="TEST-BUTTON"
                            onClick={this.nextStep}
                            sx={{color:"#ffffff",textTransform:"none"}}
                            variant="contained" 
                            disabled={this.state.selectedIdol.length == 0}
                            >
                            Get video clips of Idols 
                        </Button>
                    </Container>
                </React.Fragment>
            </>
        )
    }
}

export default withRouter(VideoSearching);
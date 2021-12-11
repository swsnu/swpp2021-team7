
import React, { Component } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { withRouter } from 'react-router';

import { lightBlue } from '@mui/material/colors';

import "./ChooseType.css";

const CutScene = 1001;
const FaceRecognition = 1002;
class ChooseType extends Component {
    constructor(props){
        super(props);
        //this.cutScene = this.cutScene.bind(this);
        //this.cutextractParts = this.extractParts.bind(this);
    }
    cutScene(){
        this.props.history.push('/video/result?video='+this.props.urlString+"&type="+CutScene);
    }
    extractParts(){
        this.props.history.push('/video/search?video='+this.props.urlString+"&type="+FaceRecognition);
    }
    render() {
        return (
            <Stack direction="row" spacing={2}
                justifyContent="right"
                alignItems="right">
                <Button id="CutScene" 
                    disabled={!this.props.isView}
                    onClick={() => this.cutScene()} 
                    variant="outlined"
                    sx={{ 
                        textTransform: 'none',
                        color: '#b3e5fc',
                        borderColor: '#b3e5fc' }}>
                    Cut scenes
                </Button>
                <Button id="ExtractPart" 
                    onClick={() => this.extractParts()} 
                    disabled={!this.props.isView}
                    variant="contained"
                    sx={{ 
                        textTransform: 'none',
                        backgroundColor: '#b3e5fc',
                        color: '#004ba0' }}>
                    Extract My Idol Parts
                </Button>
            </Stack>
        );
    }
}

export default withRouter(ChooseType);

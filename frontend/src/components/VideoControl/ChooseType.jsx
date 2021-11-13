
import React, { Component } from 'react';
import {
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Chip
} from '@mui/material';

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { withRouter } from 'react-router';


class ChooseType extends Component {
    constructor(props){
        super(props);
        //this.cutScene = this.cutScene.bind(this);
        //this.cutextractParts = this.extractParts.bind(this);
    }
    cutScene(){
        this.props.history.push('/video/result');
    }
    extractParts(){
        this.props.history.push('/video/search');
    }
    render() {
        return (
            <Stack direction="row" spacing={2}
                justifyContent="center"
                alignItems="center">
                <Button id="CutScene" onClick={() => this.cutScene()} variant="outlined">
                    Cut scenes
                </Button>
                <Button id="ExtractPart" onClick={() => this.extractParts()} variant="contained">
                    Extract My Idol Parts
                </Button>
            </Stack>
        )
    }
}

export default withRouter(ChooseType);

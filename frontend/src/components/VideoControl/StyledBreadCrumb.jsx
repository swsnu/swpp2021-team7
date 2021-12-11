import React, { Component } from 'react';
import Link from '@mui/material/Link';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
// import YouTube from 'react-youtube';
import Container from '@mui/material/Container';

export default class StyledBreadcrumb extends Component{
    render(){
            return (
                <Chip 
                    icon={this.props.icon} 
                    label={this.props.label}
                    variant="outlined"
                    sx={{ 
                        // cursor: 'pointer',
                        borderColor  : '#b3e5fc',
                        padding : "16px",
                        color: '#b3e5fc' }}
                    color="primary" />
            );
    }
} 
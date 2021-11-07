import React, { Component } from 'react';
import {
    Typography,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
} from '@mui/material';

export default class SearchResult extends Component {
    render() {
        return (
            <React.Fragment>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar sx={{
                        flexGrow : 1,
                        height: '50%'
                        }}>
                        <Avatar alt="IU" src="/images/IU.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        sx={{
                            flexGrow : 10,
                        }}
                        primary={
                            <Typography 
                                component="span"
                                sx={{ 
                                    fontSize : 26
                                }}>
                                    {this.props.name}
                            </Typography>
                        }
                    />
                </ListItem>
            </React.Fragment>
        )
    }
}
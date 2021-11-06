import React, { Component } from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

export default class MyComment extends Component {
    render() {
        return (
            <React.Fragment>
                <ListItem>
                    <ListItemText
                        sx={{ display: 'block'}}
                        primary="Idol : V"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {"Writer : TEST1 / DATE : 2021-11-03"}
                                </Typography>
                                <Typography
                                    sx={{ display: 'block' }}
                                    component="span"
                                    variant="body1"
                                    color="text.primary"
                                >
                                    {"Comment content"}
                                </Typography>
                            </React.Fragment>
                        }

                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </React.Fragment>
        )
    }
}
import React, { Component } from 'react';
import {
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography
} from '@mui/material';


export default class RankItem extends Component {
    render() {
        return (
            <React.Fragment>
                <ListItem alignItems="flex-start">
                    <ListItemText
                        sx={{
                            flexGrow : 0.5,
                            marginTop : 2
                        }}
                        primary={this.props.rank}
                        dense
                    />
                    <ListItemAvatar sx={{
                        flexGrow : 1,
                        height: '50%'
                        }}>
                        <Avatar alt="Remy Sharp" src="/images/BTS_V.jpg" />
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
                <Divider sx={{marginLeft : 0}} variant="inset" component="li" />
            </React.Fragment>
        )
    }
}

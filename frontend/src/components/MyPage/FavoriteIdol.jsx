import React, { Component } from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

export default class FavoriteIdol extends Component {
    render() {
        return (
            <React.Fragment>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/images/BTS_V.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="V"
                    />
                    <Button variant="outlined">cancel</Button>
                </ListItem> 
                <Divider variant="inset" component="li" />
            </React.Fragment>
        )
    }
}

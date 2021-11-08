import React, { Component } from 'react';
import {
    Typography,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
} from '@mui/material';
import { withRouter } from 'react-router';

class SearchResult extends Component {
    handleClick = () => {
        this.props.history.push('/search/1');
    }

    render() {
        return (
            <React.Fragment>
                <ListItem alignItems="flex-start" onClick={this.handleClick}>
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

export default withRouter(SearchResult);
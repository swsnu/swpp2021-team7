import React, { Component } from 'react';
import {
    Typography,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Chip,
} from '@mui/material';
import { withRouter } from 'react-router';

class SearchResult extends Component {
    handleClick = () => {
        this.props.history.push('/search/group/1');
    }

    render() {
        return (
            <React.Fragment>
                <ListItem alignItems="flex-start" onClick={this.handleClick}>
                    <ListItemAvatar sx={{
                        flexGrow : 1,
                        height: '50%'
                        }}>
                        <Avatar alt="Red Velvet" src="https://pbs.twimg.com/media/E85o_8MVgAM58Gd.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        sx={{
                            flexGrow : 10,
                        }}
                        primary={
                            <Chip color="primary" label = {this.props.name} />
                        }
                    />
                </ListItem>
            </React.Fragment>
        )
    }
}

export default withRouter(SearchResult);
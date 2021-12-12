import React, { Component } from 'react';
import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Chip,
} from '@mui/material';
import { withRouter } from 'react-router';

class SearchResult extends Component {
    handleClick = () => {
        this.props.history.push(`/search/${this.props.isGroup ? 'group' : 'member'}/${this.props.id}`);
    }

    render() {
        return (
            <React.Fragment>
                <ListItem alignItems="flex-start" onClick={this.handleClick}>
                    <ListItemAvatar sx={{
                        flexGrow : 1,
                        height: '50%'
                        }}>
                        <Avatar alt={this.props.name} src={this.props.thumbnail} />
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
import React, { Component } from 'react';
import {
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Chip
} from '@mui/material';
import { withRouter } from 'react-router';


class IdolItem extends Component {
    constructor(props){
        super(props);
        console.log(props);
    }
    redirectSearchResult = () => {
        this.props.history.push('/video/result');
    }

    render() {
        return (
            <React.Fragment>
                <ListItem alignItems="flex-start" onClick={this.handleClick}>
                    <ListItemText
                        sx={{
                            flexGrow : 0.5,
                            marginTop : 2
                        }}
                        primary={this.props.num}
                        dense
                    />
                    <ListItemAvatar sx={{
                        flexGrow : 1,
                        height: '50%'
                        }}>
                        <Avatar alt="Remy Sharp" src={this.props.icon} />
                    </ListItemAvatar>
                    <ListItemText
                        sx={{
                            flexGrow : 10,
                        }}
                        primary={<Chip onClick={()=>this.redirectSearchResult()} clickable label={this.props.name} />}
                    />
                </ListItem>
                <Divider sx={{marginLeft : 0}} variant="inset" component="li" />
            </React.Fragment>
        )
    }
}

export default withRouter(IdolItem);

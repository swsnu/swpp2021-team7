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
import "./IdolItem.css";

class IdolItem extends Component {
    constructor(props){
        super(props);
    }
    redirectSearchResult = () => {
        //this.props.history.push('/video/result');
    }

    render() {
        return (
            <div
                onClick={this.props.onClick}
                className="idol-items">
                <ListItem 
                    id="IDOL-ITEM"
                    className={(this.props.active == "active") ? "" : "not-ready"}
                    alignItems="flex-start" onClick={this.handleClick}>
                    <ListItemText
                        sx={{
                            flexGrow : 0.5,
                            marginTop : 2,
                            color: "#ffffff"
                        }}
                        primary={this.props.num}
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
                            color: "#ffffff"
                        }}
                        primary={<Chip 
                            sx={{
                                color: "#ffffff"
                            }}onClick={()=>this.redirectSearchResult()} clickable label={this.props.name} />}
                    />
                </ListItem>
                {(this.props.active == "active") ? 
                "" : 
                <p
                    className="not-ready-p">Not Supported. Would You Request Support?</p>}
                <Divider sx={{marginLeft : 0}} variant="inset" component="li" />
            </div>
        )
    }
}

export default withRouter(IdolItem);

import React, { Component } from 'react';
import {
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Chip,
    Button
} from '@mui/material';
import { withRouter } from 'react-router';
import "./IdolItem.css";
import axios from 'axios';

class IdolItem extends Component {
    constructor(props){
        super(props);
    }
    redirectSearchResult = () => {
        //this.props.history.push('/video/result');
    }

    handleRequestClick = async () => {
        try {
            this.props.testPost ? this.props.testPost() : await axios.post("/search-result/request-support/", {"name": this.props.name});
            alert(`Successfully submitted. We would make [${this.props.name}] available shortly.`)
        } catch {
            alert("Excessive requests in short time. Request again after a while.");
        }
    }

    render() {
        return (
            <div
                onClick={this.props.active ? this.props.onClick : null}
                className="idol-items" style={{cursor: this.props.active ? "pointer" : "unset"}}>
                <ListItem 
                    id="IDOL-ITEM"
                    className={(this.props.active) ? "" : "not-ready"}
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
                {(!this.props.active) && <>
                <p className="not-ready-p">Not Supported. Would You Request Support?</p>
                <Button variant="outlined" color="error" onClick={this.handleRequestClick} id="requestBtn">Request Support</Button>
                </>}
                <Divider sx={{marginLeft : 0}} variant="inset" component="li" />
            </div>
        )
    }
}

export default withRouter(IdolItem);

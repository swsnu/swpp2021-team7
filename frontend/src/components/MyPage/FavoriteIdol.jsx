import React, { Component } from 'react';
import {
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Button,
    Chip
} from '@mui/material';
import { withRouter } from 'react-router';



class FavoriteIdol extends Component {
    cancelFavoriteIdol = () => {
        console.log("cancelFavoriteIdol")
    }

    redirectSearchResult = () => {
        this.props.history.push(`/search/${this.props.isGroup ? "group/" : ""}1`);
    }

    render() {
        return (
            <React.Fragment>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={this.props.img} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={<Chip onClick={() => this.redirectSearchResult()} clickable label={`${this.props.name.kor} ${this.props.name.eng}`} color="primary" />}
                    />
                    <Button onClick={() => { this.cancelFavoriteIdol() }} variant="contained">cancel</Button>
                </ListItem>
                <Divider variant="inset" component="li" />
            </React.Fragment>
        )
    }
}

export default withRouter(FavoriteIdol);


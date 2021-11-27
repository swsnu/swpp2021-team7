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
import axios from 'axios';


class FavoriteIdol extends Component {
    cancelFavoriteIdol = () => {
        axios.delete(`mypage/idols/${this.props.type}/${this.props.id}/`)
            .then(function (res) {
                window.location.reload();
            })
            .catch(function (errros) {
                console.log("error occur in delete favorite idol")
            })
    }

    redirectSearchResult = () => {
        this.props.history.push(`/search/${this.props.type}/${this.props.idolId}`);
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


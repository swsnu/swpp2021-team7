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
        this.props.history.push('/search/1');
    }

    render() {
        return (
            <React.Fragment>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="https://img.insight.co.kr/static/2019/01/31/700/18nd52ajs5z4750u7p6f.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={<Chip onClick={()=>this.redirectSearchResult()} clickable label={`강슬기 (Seulgi)`} color="primary"/>}
                    />
                    <Button onClick={() => {this.cancelFavoriteIdol()}} variant="contained">cancel</Button>
                </ListItem>
                <Divider variant="inset" component="li" />
            </React.Fragment>
        )
    }
}

export default withRouter(FavoriteIdol);


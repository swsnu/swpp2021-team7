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
                        <Avatar alt="Remy Sharp" src="/images/BTS_V.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={<Chip onClick={()=>this.redirectSearchResult()} clickable label={`뷔 (V)`} />}
                        secondary={<Chip onClick={()=>this.redirectSearchResult()} clickable label={'방탄소년단 (BTS)'} color="primary"/>}
                    />
                    <Button onClick={() => {this.cancelFavoriteIdol()}} variant="contained">cancel</Button>
                </ListItem>
                <Divider variant="inset" component="li" />
            </React.Fragment>
        )
    }
}

export default withRouter(FavoriteIdol);


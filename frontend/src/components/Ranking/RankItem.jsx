import React, { Component } from 'react';
import {
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Chip
} from '@mui/material';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'

class RankItem extends Component {
    redirectSearchResult = () => {
        this.props.push('/search/1')
    }

    render() {
        return (
            <React.Fragment>
                <ListItem alignItems="flex-start">
                    <ListItemText
                        sx={{
                            flexGrow : 0.5,
                            marginTop : 2
                        }}
                        primary={this.props.rank}
                        dense
                    />
                    <ListItemAvatar sx={{
                        flexGrow : 1,
                        height: '50%'
                        }}>
                        <Avatar alt="Remy Sharp" src="/images/BTS_V.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        sx={{
                            flexGrow : 10,
                        }}
                        primary={<Chip onClick={()=>this.redirectSearchResult()} clickable label={`뷔 (V)`} />}
                        secondary={<Chip onClick={()=>this.redirectSearchResult()} clickable label={'방탄소년단 (BTS)'} color="primary"/>}
                    />
                </ListItem>
                <Divider sx={{marginLeft : 0}} variant="inset" component="li" />
            </React.Fragment>
        )
    }
}

export default connect(null, { push })(RankItem)
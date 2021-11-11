import React, { Component } from 'react';
import {
    ListItem,
    Divider,
    ListItemText,
    Typography,
    Chip
} from '@mui/material';

import { connect } from 'react-redux';
import { push } from 'connected-react-router'

class MyComment extends Component {
    redirectSearchResult = () => {
        this.props.push('/search/1')
    }

    render() {
        return (
            <React.Fragment>
                <ListItem>
                    <ListItemText
                        sx={{ display: 'block' }}
                        primary={<Chip key="1" onClick={() => this.redirectSearchResult()} clickable label={`강슬기 (Seulgi)`} color="primary"/>}
                        secondary={
                            <React.Fragment>
                                <div style={{ marginTop: "10px" }}></div>
                                <Chip label={`USERNAME : TEST1`} />
                                <Chip label={`DATE : 2021-11-08`} />
                                <div style={{ marginTop: "10px" }}></div>
                                <Typography
                                    sx={{ display: 'block' }}
                                    component="span"
                                    variant="body1"
                                    color="text.primary"
                                >
                                    {"Comment content"}
                                </Typography>
                            </React.Fragment>
                        }

                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </React.Fragment>
        )
    }
}

export default connect(null, { push })(MyComment)
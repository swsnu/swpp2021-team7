import React, { Component } from 'react';
import {
    ListItem,
    Divider,
    ListItemText,
    Typography,
    Chip
} from '@mui/material';
import moment from 'moment'

import { connect } from 'react-redux';
import { push } from 'connected-react-router'

class MyComment extends Component {
    redirectSearchResult = () => {
        this.props.push(`/search/${this.props.type}/${this.props.idolId}`)
    }

    render() {
        return (
            <React.Fragment>
                <ListItem>
                    <ListItemText
                        sx={{
                            display: 'block',
                            '& .MuiListItemText-secondary': {
                                marginTop: '10px'
                            }
                        }}
                        primary={<Chip
                            component="span"
                            key="1" onClick={() => this.redirectSearchResult()}
                            clickable
                            label={`${this.props.name.kor} ${this.props.name.eng}`}
                            color="primary" />}
                        secondary={
                            <React.Fragment>
                                <Chip component="span" label={`DATE : ${moment(this.props.createAt).format("YYYY-MM-DD / HH:mm:ss")}`} />
                                <Typography
                                    sx={{ display: 'block' }}
                                    component="span"
                                    variant="body1"
                                    color="text.primary"
                                >
                                    {`${this.props.content}`}
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
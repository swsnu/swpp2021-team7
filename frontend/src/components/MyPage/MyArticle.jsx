import React, { Component } from 'react';
import {ListItem, Button, Divider, ListItemText, Typography} from '@mui/material';


export default class MyArticle extends Component {
    deleteScrapedArticle = () => {
        console.log("click deleteScrapedArticle")
    }
    render() {
        return (
            <React.Fragment>
                <ListItem>
                    <ListItemText
                        sx={{ display: 'block'}}
                        primary={<a onClick={this.onClickScrapedArticle}>{"Title : Scrap1"}</a>}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {"link : https://miro.com/app/board/o9J_lsOtDfA=/"}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                    <Button variant="contained" onClick={()=>this.deleteScrapedArticle()}>delete</Button>
                </ListItem>
                <Divider variant="inset" component="li" />
            </React.Fragment>
        )
    }
}
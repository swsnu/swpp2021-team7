import React, { Component } from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


export default class MyArticle extends Component {
    onClickScrapedArticle = () => {
        console.log(this.props.history)
        console.log("click onClickScrapedArticle")
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
                    <Button variant="outlined">delete</Button>
                </ListItem>
                <Divider variant="inset" component="li" />
            </React.Fragment>
        )
    }
}
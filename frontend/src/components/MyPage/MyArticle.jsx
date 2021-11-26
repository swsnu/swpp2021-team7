import React, { Component } from 'react';
import {
    ListItem,
    Button,
    Divider,
    ListItemText,
    ListItemButton
} from '@mui/material';


export default class MyArticle extends Component {
    deleteScrapedArticle = () => {
        console.log("click deleteScrapedArticle")
    }
    render() {
        return (
            <React.Fragment>
                <ListItem>
                    <ListItemButton component="a" href={this.props.address}>
                        <ListItemText
                            primary={this.props.title}
                        />
                    </ListItemButton>
                    <Button variant="contained" onClick={() => this.deleteScrapedArticle()}>delete</Button>
                </ListItem>
                <Divider variant="inset" component="li" />
            </React.Fragment>
        )
    }
}
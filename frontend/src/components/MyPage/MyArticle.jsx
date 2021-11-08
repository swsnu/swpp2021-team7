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
                    <ListItemButton component="a" href="/">
                        <ListItemText
                            primary='타블로와 슬기, 빅나티, 노보가 함께한 라코스테 X 피너츠 협업 캠페인'
                        />
                    </ListItemButton>
                    <Button variant="contained" onClick={() => this.deleteScrapedArticle()}>delete</Button>
                </ListItem>
                <Divider variant="inset" component="li" />
            </React.Fragment>
        )
    }
}
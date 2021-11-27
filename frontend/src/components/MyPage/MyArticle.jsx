import React, { Component } from 'react';
import {
    ListItem,
    Button,
    Divider,
    ListItemText,
    ListItemButton
} from '@mui/material';
import axios from "axios"


export default class MyArticle extends Component {
    deleteScrapedArticle = () => {
        axios.delete(`mypage/articles/${this.props.type}/${this.props.id}`)
            .then(function (res) {
                window.location.reload();

            })
            .catch(function (errros) {
                console.log("error occur in delete scraps")
            })
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
import React, { Component } from 'react';
import List from '@mui/material/List';

import MyArticle from './MyArticle';
export default class MyArticleList extends Component {
    render() {
        return (
            <React.Fragment>
                <List sx={{
                    width: '100%',
                    bgcolor: 'background.paper', 
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 300,
                }}>
                    <MyArticle></MyArticle>
                    <MyArticle></MyArticle>
                    <MyArticle></MyArticle>
                    <MyArticle></MyArticle>
                    <MyArticle></MyArticle>
                    <MyArticle></MyArticle>

                </List>
            </React.Fragment>
        )
    }
}

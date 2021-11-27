import React, { Component } from 'react';
import List from '@mui/material/List';

import MyArticle from './MyArticle';
export default class MyArticleList extends Component {
    render() {
        let myArticleLists = []
        for (let scrap of this.props.scraps) {
            myArticleLists.push(<MyArticle
                key={scrap.id}
                id={scrap.id}
                type={scrap.type}
                title={scrap.title}
                address={scrap.address}
            ></MyArticle>)
        }
        return (
            <React.Fragment>
                <List sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 400,
                }}>
                    {/* <MyArticle></MyArticle>
                    <MyArticle></MyArticle>
                    <MyArticle></MyArticle>
                    <MyArticle></MyArticle>
                    <MyArticle></MyArticle>
                    <MyArticle></MyArticle> */}
                    {myArticleLists}

                </List>
            </React.Fragment>
        )
    }
}

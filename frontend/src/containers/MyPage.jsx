import React, { Component } from 'react';
import Container from '@mui/material/Container';

import FavoriteIdolList from '../components/MyPage/FavoriteIdolList';
import MyCommentList from '../components/MyPage/MyCommentList';
import MyArticleList from '../components/MyPage/MyArticleList';

export default class MyPage extends Component {
    render() {
        return (
            <React.Fragment>
                <Container maxWidth="sm">
                    <h1>My Idols</h1>
                    <FavoriteIdolList></FavoriteIdolList>
                </Container>
                <Container maxWidth="sm">
                    <h1>My Comments</h1>
                    <MyCommentList></MyCommentList>
                </Container>
                <Container maxWidth="sm">
                    <h1>My Scraps</h1>
                    <MyArticleList></MyArticleList>
                </Container>
            </React.Fragment>
        )
    }
}

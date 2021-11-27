import React, { Component } from 'react';
import {
    Container,
    Button,
    Menu,
    MenuItem,
} from '@mui/material'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import FavoriteIdolList from '../components/MyPage/FavoriteIdolList';
import MyCommentList from '../components/MyPage/MyCommentList';
import MyArticleList from '../components/MyPage/MyArticleList';

import axios from "axios"



export default class MyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            comments: [],
            idols: [],
            scraps: []
        }
    }

    componentDidMount() {
        const getMyCmts = axios.get('mypage/comments/')
        const getMyIdols = axios.get('mypage/idols/')
        const getMyScraps = axios.get('mypage/articles/')

        axios.all([getMyCmts, getMyIdols, getMyScraps]).then(axios.spread((...responses) => {
            this.setState({
                comments: responses[0].data,
                idols: responses[1].data,
                scraps: responses[2].data
            })

        })).catch(errors => {
            // console.log(errors)
        })


    }

    handleClick = (event) => {
        event.preventDefault()
        this.setState({
            anchorEl: event.currentTarget
        })
    };

    handleClose = () => {
        this.setState({
            anchorEl: null
        })
    };

    render() {
        const open = Boolean(this.state.anchorEl);
        return (
            <React.Fragment>
                <Container
                    sx={{
                        marginLeft: "0px",
                        width: "20%"
                    }}
                >
                    <Button
                        id="user-info-button"
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={this.handleClick}
                    >
                        <AccountCircleIcon fontSize="large" color="action"></AccountCircleIcon>
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={this.state.anchorEl}
                        open={open}
                        onClose={this.handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={this.handleClose}>TestUserName</MenuItem>
                        <MenuItem onClick={this.handleClose}>test@snu.ac.kr</MenuItem>
                    </Menu>
                </Container>
                <h1>My Page</h1>
                <div style={{ height: "20px" }}></div>
                <Container maxWidth="sm">
                    <h2>My Idols</h2>
                    <FavoriteIdolList idols={this.state.idols}></FavoriteIdolList>
                </Container>
                <div style={{ height: "20px" }}></div>
                <Container maxWidth="sm">
                    <h2>My Comments</h2>
                    <MyCommentList comments={this.state.comments}></MyCommentList>
                </Container>
                <div style={{ height: "20px" }}></div>
                <Container maxWidth="sm">
                    <h2>My Scraps</h2>
                    <MyArticleList scraps={this.state.scraps}></MyArticleList>
                </Container>
                <div style={{ height: "100px" }}></div>
            </React.Fragment>
        )
    }
}

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



export default function MyPage(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        event.preventDefault()
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


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
                    onClick={handleClick}
                >
                    <AccountCircleIcon fontSize="large" color="action"></AccountCircleIcon>
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>TestUserName</MenuItem>
                    <MenuItem onClick={handleClose}>test@snu.ac.kr</MenuItem>
                </Menu>
            </Container>
            <h1>My Page</h1>
            <div style={{ height: "20px" }}></div>
            <Container maxWidth="sm">
                <h2>My Idols</h2>
                <FavoriteIdolList></FavoriteIdolList>
            </Container>
            <div style={{ height: "20px" }}></div>
            <Container maxWidth="sm">
                <h2>My Comments</h2>
                <MyCommentList></MyCommentList>
            </Container>
            <div style={{ height: "20px" }}></div>
            <Container maxWidth="sm">
                <h2>My Scraps</h2>
                <MyArticleList></MyArticleList>
            </Container>
            <div style={{ height: "100px" }}></div>
        </React.Fragment>
    )
}

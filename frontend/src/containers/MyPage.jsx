import React, { Component } from 'react';
import Container from '@mui/material/Container';

import FavoriteIdolList from '../components/MyPage/FavoriteIdolList';
import MyCommentList from '../components/MyPage/MyCommentList';
import MyArticleList from '../components/MyPage/MyArticleList';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';


export default function MyPage(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
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
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <Typography
                        component="span"
                        variant="h6"
                        sx={{
                            color: 'rgba(0, 0, 0, 1)'
                        }}
                    >
                        INFO
                    </Typography>
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
            <Container maxWidth="sm">
                <h2>My Idols</h2>
                <FavoriteIdolList></FavoriteIdolList>
            </Container>
            <Container maxWidth="sm">
                <h2>My Comments</h2>
                <MyCommentList></MyCommentList>
            </Container>
            <Container maxWidth="sm">
                <h2>My Scraps</h2>
                <MyArticleList></MyArticleList>
            </Container>
        </React.Fragment>
    )
}

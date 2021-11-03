import React, { Component } from 'react';
import List from '@mui/material/List';

import FavoriteIdol from './FavoriteIdol';

export default class FavoriteIdolList extends Component {
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
                    <FavoriteIdol></FavoriteIdol>
                    <FavoriteIdol></FavoriteIdol>
                    <FavoriteIdol></FavoriteIdol>
                    <FavoriteIdol></FavoriteIdol>
                    <FavoriteIdol></FavoriteIdol>
                    <FavoriteIdol></FavoriteIdol>
                </List>
            </React.Fragment>
        )
    }
}

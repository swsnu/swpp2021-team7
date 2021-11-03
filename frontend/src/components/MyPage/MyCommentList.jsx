import React, { Component } from 'react';
import List from '@mui/material/List';

import MyComment from './MyComment';

export default class MyCommentList extends Component {
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
                    <MyComment></MyComment>
                    <MyComment></MyComment>
                    <MyComment></MyComment>
                    <MyComment></MyComment>
                    <MyComment></MyComment>
                    <MyComment></MyComment>
                </List>
            </React.Fragment>
        )
    }
}

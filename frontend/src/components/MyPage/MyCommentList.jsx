import React, { Component } from 'react';
import List from '@mui/material/List';

import MyComment from './MyComment';

export default class MyCommentList extends Component {
    render() {
        let myCmtLists = []
        for (let cmt of this.props.comments) {
            myCmtLists.push(<MyComment
                key={this.props.comments.indexOf(cmt)}
                content={cmt.content}
                idolId={cmt[cmt.type]}
                createAt={cmt.created_at}
                name={cmt.name}
                type={cmt.type}
            ></MyComment>)
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
                    {myCmtLists}
                </List>
            </React.Fragment>
        )
    }
}

import React, { useState } from "react";
import { Chip, ListItem, ListItemText, Input } from "@mui/material";

const Comment = ({ id, author, content, created_at, isMine, updateCmt, deleteCmt }) => {

    // const [likeClicked, setLikeClicked] = useState(false);
    const [editable, setEditable] = useState(false);
    const [contentVal, setContentVal] = useState(content);
    const onEdit = () => {
        if (editable) {
            updateCmt(id, contentVal)
        }
        setEditable(!editable)
    }
    const onDelete = () => {
        deleteCmt(id)
    }

    const cmtContent = editable ? <Input value={contentVal} onChange={e => setContentVal(e.target.value)}></Input> : <ListItemText primary={contentVal} style={{ marginLeft: "10px" }} />
    return <div className="comment">
        <ListItem>
            <Chip label={author} color="primary" />
            {cmtContent}
            {/* {!isMine && <Chip className="commentLikeBtn" label="❤️ Like" style={{marginRight: "10px"}} color="primary" variant={likeClicked ? "filled" : "outlined"} onClick={() => setLikeClicked(!likeClicked)}/>} */}
            {isMine &&
                <div className="edit-or-delete">
                    <Chip label="수정" onClick={onEdit} style={{ marginRight: "5px" }} color="primary" />
                    <Chip label="삭제" onClick={onDelete} style={{ marginRight: "5px" }} color="primary" />
                </div>}
            <Chip label={created_at} />
        </ListItem>
    </div>
}

export default Comment;
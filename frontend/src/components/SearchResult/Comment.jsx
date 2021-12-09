import React, { useState } from "react";
import { Chip, ListItem, ListItemText, } from "@mui/material";

const Comment = ({ author, content, created_at, isMine }) => {

    const [likeClicked, setLikeClicked] = useState(false);

    return <div className="comment">
        <ListItem>
            <Chip label={author} color="primary" />
            <ListItemText primary={content} style={{ marginLeft: "10px" }} />
            {/* {!isMine && <Chip className="commentLikeBtn" label="❤️ Like" style={{marginRight: "10px"}} color="primary" variant={likeClicked ? "filled" : "outlined"} onClick={() => setLikeClicked(!likeClicked)}/>} */}
            {isMine &&
                <div className="edit-or-delete">
                    <Chip label="수정" style={{ marginRight: "5px" }} color="primary" />
                    <Chip label="삭제" style={{ marginRight: "5px" }} color="primary" />
                </div>}
            <Chip label={created_at} />
        </ListItem>
    </div>
}

export default Comment;
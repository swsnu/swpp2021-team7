import React, { useState } from "react";
import { Chip, ListItem, ListItemText, } from "@mui/material";

const Comment = ({author, content, timestamp}) => {

    const [likeClicked, setLikeClicked] = useState(false);
    const isMine = author === "TEST1";

    return <ListItem>
            <Chip label={author} color="primary" />
            <ListItemText primary={content} style={{marginLeft: "10px"}} />
            {isMine ? null : likeClicked ? <Chip label="❤️ Like" style={{marginRight: "10px"}} color="primary" onClick={() => setLikeClicked(!likeClicked)}/> : 
                <Chip label="❤️ Like" style={{marginRight: "10px"}} color="primary" variant="outlined" onClick={() => setLikeClicked(!likeClicked)}/>}
            {isMine && 
            <>
                <Chip label="수정" style={{marginRight: "5px"}} color="primary"/>
                <Chip label="삭제" style={{marginRight: "5px"}} color="primary"/>
            </>}

            <Chip label={timestamp}/>
            
</ListItem>
}

export default Comment;
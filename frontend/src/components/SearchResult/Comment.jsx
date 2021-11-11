import React, { useState } from "react";
import { Chip, ListItem, ListItemText, } from "@mui/material";

const Comment = ({author, content, timestamp}) => {

    const [likeClicked, setLikeClicked] = useState(false);

    return <ListItem>
            <Chip label={author} color="primary" />
            <ListItemText primary={content} style={{marginLeft: "10px"}} />
            {likeClicked ? <Chip label="❤️ Like" style={{marginRight: "10px"}} color="primary" onClick={() => setLikeClicked(!likeClicked)}/> : 
                <Chip label="❤️ Like" style={{marginRight: "10px"}} color="primary" variant="outlined" onClick={() => setLikeClicked(!likeClicked)}/>}
            <Chip label={timestamp}/>
    {/* <Button variant="contained" onClick={() => alert("Successfully scraped!")}>수정삭제등등..</Button> */}
</ListItem>
}

export default Comment;
import React from "react";
import { Chip, ListItem, ListItemText, } from "@mui/material";

const Comment = ({author, content, timestamp}) => {

    return <ListItem>
            <Chip label={author} color="primary" />
            <ListItemText primary={content} style={{marginLeft: "10px"}} />
            <Chip label="❤️ Like" style={{marginRight: "10px"}} />
            <Chip label={timestamp}/>
    {/* <Button variant="contained" onClick={() => alert("Successfully scraped!")}>수정삭제등등..</Button> */}
</ListItem>
}

export default Comment;
import { Box } from "@mui/system";
import React from "react";
import Comment from "./Comment";

export default function Comments ({comments}) {

    return <div id="comments">
        <h2>Comments</h2>
        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            {comments.map((comment,i) => {
                return <Comment {...comment} key={i} />
            })}
        </Box>
    </div>
}
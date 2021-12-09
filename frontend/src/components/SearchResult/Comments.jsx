import { Box } from "@mui/system";
import React from "react";
import axios from 'axios';
import Comment from "./Comment";

export default function Comments({ comments, isGroup }) {
    const updateCmt = async (id, content) => {
        const res = await axios.put(
            `/search-result/${isGroup ? "group" : "member"}/comment/${id}/`,
            { content: content },
            {
                headers: {
                    'Content-type': 'application/json'
                }
            });
    }

    const deleteCmt = async (id) => {
        const res = await axios.delete(`/search-result/${isGroup ? "group" : "member"}/comment/${id}/`);
    }

    return <div id="comments">
        <h2>Comments</h2>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {comments.map((comment, i) => {
                return <Comment updateCmt={updateCmt} deleteCmt={deleteCmt} {...comment} key={i} />
            })}
        </Box>
    </div>
}
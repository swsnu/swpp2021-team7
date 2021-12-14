import React from "react";
import styled from "@emotion/styled";
import axios from 'axios';
import { useState } from 'react';
import { Button, TextField } from "@mui/material";

const CommentInput = ({ id, isGroup, setReload, reload, isLoggedIn }) => {
    const [input, setInput] = useState('');

    const onSubmit = async () => {
        if (!isLoggedIn) {
            alert("Please log in!");
            return;
        } else if (input.length == 0) {
            alert("Please fill the content!");
            return;
        }

        const res = await axios.post(
            `/search-result/comment/${isGroup ? "group" : "member"}/${id}/`,
            { content: input },
            {
                headers: {
                    'Content-type': 'application/json'
                }
            });
        setReload(!reload)
        setInput("")
    }

    return <CommentInputConatiner id="comment-input">
        <h4>Leave Comment!</h4>
        <TextButtonContainer>
            <TextField value={input} onInput={e => setInput(e.target.value)} sx={{ width: "50%" }} />
            <Button id="comment-submit" variant="contained" sx={{ marginLeft: "15px" }} onClick={onSubmit}>Submit</Button>
        </TextButtonContainer>
    </CommentInputConatiner>
}


const CommentInputConatiner = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 5px 0;
    background: #fff9c4;
    border: 1px;
    z-index: 1200;
`

const TextButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default CommentInput;

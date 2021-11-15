import React from "react";
import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";

const CommentInput = ({addComment}) => {

    const onSubmit = () => {
        addComment({author: "TEST1", content: "Comment content", timestamp: "just now"})
    }

    return <CommentInputConatiner id="comment-input">
        <h4>Leave Comment!</h4>
        <TextButtonContainer>
            <TextField sx={{width: "50%"}} />
            <Button id="comment-submit" variant="contained" sx={{marginLeft: "15px"}} onClick={onSubmit}>Submit</Button>
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

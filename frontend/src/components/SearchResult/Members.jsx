import { Avatar } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";

const Members = ({members}) => {

    return <MembersContainer>
        {members.map((member, i) => 
            <div key={i}>
                <Avatar key={i} src={member.image} sx={{marginX: "20px"}} component="a" href="/search/1" />
                {member.name}
            </div>)}
    </MembersContainer>
}

const MembersContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

export default Members;
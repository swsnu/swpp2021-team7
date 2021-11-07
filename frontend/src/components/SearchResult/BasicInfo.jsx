import { Avatar, Chip, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const BasicInfo = ({image, info: {name, group, birth, debut}, news}) => {

    return <Box sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
            <Avatar src={image} sx={{width: "40%", height: "auto"}} />

            <Box>
                <Stack direction="row" spacing={3} justifyContent="center">
                    <Chip label={`${name.kor} (${name.eng})`} />
                    <Chip label={group} clickable href="/group/1" component="a" color="primary" />
                </Stack>
                <div style={{marginTop: "30px"}}></div>
                <Stack direction="row" spacing={3} justifyContent="center">
                    <Chip label={birth} />
                    <Chip label={debut} />
                </Stack>
            </Box>
    </Box>
}

export default BasicInfo;
import { Avatar, Chip, List, ListItemButton, ListItemText, ListItem, Stack, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const BasicInfo = ({image, info: {name, group, birth, debut}, news}) => {

    return <>
        <Box sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
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

        <h3>Recent News</h3>
        <Box sx={{width: '100%', textAlign: "center"}}>
            {news.map((n,i) => {
                return <ListItem disablePadding key={i}>
                    <ListItemButton component="a" href={n.url}>
                        <ListItemText primary={n.title} />
                    </ListItemButton>
                    <Button variant="contained" onClick={() => alert("Successfully scraped!")}>Scrap</Button>
                </ListItem>
            })}
        </Box>
    </>
}

export default BasicInfo;
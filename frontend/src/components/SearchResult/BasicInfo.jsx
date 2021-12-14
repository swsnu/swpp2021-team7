import { Avatar, Chip, ListItemButton, ListItemText, ListItem, Stack, Button } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import Members from "./Members";

const BasicInfo = ({id, liked, loadedScraps, thumbnail, info: {name, groups, birth, debut, members}, news, isGroup, toggleLikeAsProp, toggleScrapAsProp}) => {

    const [like, setLike] = useState(liked);
    const [scraps, setScraps] = useState(loadedScraps);
    const [isLoading, setIsLoading] = useState(false);

    const toggleLike = () => {
        if (isLoading) {
            alert("Your last request is in progress!");
            return;
        }
        setIsLoading(true);

        axios.post(`/search-result/${isGroup ? "group" : "member"}/toggle-like/${id}/`)
        .then(() => {
            setLike(!like);
        })
        .catch(e => {
            if (e.response.status == 403) {
                alert("Please log in!");
            }
        });
        
        setIsLoading(false);
    }

    const toggleScrap = async (url, title) => {
        if (isLoading) {
            alert("Your last request is in progress!");
            return;
        }
        setIsLoading(true);
        axios.post(`/search-result/${isGroup ? "group" : "member"}/toggle-scrap/${id}/`, {url, title})
        .then((res) => {
            setScraps([...res.data]);
        })
        .catch(e => {
            if (e.response.status == 403) {
                alert("Please log in!");
            }
        });
        setIsLoading(false);
    }

    return <div id="basicInfo">
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Avatar src={thumbnail} sx={{width: "100px", height: "auto"}} />
            <div style={{width: "50px"}}></div>
            <Box>
                <Stack direction="row" spacing={3} justifyContent="center">
                    <Chip label={`${name.kor} ${name.eng ? `(${name.eng})` : ""}`} />
                    {!isGroup && <Chip label={groups[0].name} clickable href={`/search/group/${groups[0].id}`} component="a" color="primary" />}
                </Stack>
                <div style={{marginTop: "20px"}}></div>
                <Stack direction="row" spacing={3} justifyContent="center">
                    {!isGroup && birth && <Chip label={birth} />}
                    {debut && <Chip label={debut} /> }
                </Stack>
                <div style={{marginTop: "20px"}}></div>
                <Chip id="likeBtn" label={`❤️ Like ${name.eng || name.kor}`} color="primary" variant={like ? "filled" : "outlined"} onClick={toggleLikeAsProp || toggleLike}/>
            </Box>
        </Box>

        <div style={{marginTop: "20px"}}></div>
        {isGroup && <div id="members">
            <h3>Members</h3>
            <Members members={members} />
        </div>}

        <h3>Recent News</h3>
        <Box sx={{width: '100%', textAlign: "center"}}>
            {news.map((n,i) => {
                const scrapped = scraps.includes(n.url);
                return <ListItem disablePadding key={i}>
                    <ListItemButton component="a" href={n.url}>
                        <ListItemText primary={n.title} />
                    </ListItemButton>
                    <Button className="scrap" variant={scrapped ? "outlined" : "contained"} color="primary" onClick={toggleScrapAsProp || toggleScrap.bind(null, n.url, n.title)}>{scrapped ? "Cancel Scrap" : "Scrap"}</Button>
                </ListItem>
            })}
        </Box>
    </div>
}

export default BasicInfo;
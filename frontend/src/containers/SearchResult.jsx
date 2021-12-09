import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomGridRow from '../components/common/CustomGridRow';
import BasicInfo from '../components/SearchResult/BasicInfo';
import Tweets from '../components/SearchResult/Tweets';
import YoutubeVideos from '../components/SearchResult/YoutubeVideos';
import styled from "@emotion/styled";
import SharedVideos from '../components/SearchResult/SharedVideos';
import CommentInput from '../components/SearchResult/CommentInput';
import Comments from '../components/SearchResult/Comments';
import { groupDummy, memberDummy } from "../constants";
import { useParams } from 'react-router';
import axios from 'axios';

const SearchResult = (props) => {

    const [isLoading, setIsloading] = useState(true);
    const [data, setData] = useState({});
    const { isGroup } = props;
    const dummy = isGroup ? groupDummy : memberDummy;
    const { id } = useParams();

    const addComment = (newComment) => {
        let comments = data.comments;
        comments.push(newComment);
        let newData = data;
        newData.comments = comments;
        setData({...newData});
    }

    useEffect(async () => {
        const res = await axios.get(`/search-result/${isGroup ? "group" : "member"}/${id}`);
        setData({...res.data});
    }, []);

    useEffect(() => {
        if (Object.keys(data).length > 0) setIsloading(false);
    }, [data])

    if (isLoading) return <CircularProgress />
    return <SearchResultRoot>
        <CustomGridRow components={[<BasicInfo {...data.basicInfo} isGroup={isGroup} key="basicInfo" />, <Tweets key="tweets" tweets={data.tweets} />]} />
        <div style={{height: "30px"}}></div>
        <YoutubeVideos videos={data.youtubes} />
        <SharedVideos videos={data.shared} />
        <CommentInput addComment={addComment} />
        <Comments comments={data.comments} />
        <div style={{height: "150px"}}></div>
    </SearchResultRoot>
}

const SearchResultRoot = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export default SearchResult;
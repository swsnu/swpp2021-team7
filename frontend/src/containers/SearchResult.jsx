import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomGridRow from '../components/common/CustomGridRow';
import BasicInfo from '../components/SearchResult/BasicInfo';
import Tweets from '../components/SearchResult/Tweets';
import Youtube from '../components/SearchResult/Youtube';
import styled from "@emotion/styled";
import SharedVideos from '../components/SearchResult/SharedVideos';
import CommentInput from '../components/SearchResult/CommentInput';
import Comments from '../components/SearchResult/Comments';
import { groupDummy, memberDummy } from "../constants";
import { useParams } from 'react-router';

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

    useEffect(() => {
        // id 없으면 홈으로 리다이렉트
        // 있으면 이용해서 search api call
        setTimeout(() => {
            setData({...dummy})
            console.log(`loaded ${isGroup ? "group" : "member"} data`);
        }, 1000)
    }, []);

    useEffect(() => {
        if (Object.keys(data).length > 0) setIsloading(false);
    }, [data])

    if (isLoading) return <CircularProgress />
    return <SearchResultRoot>
        <CustomGridRow components={[<BasicInfo {...data.basicInfo} isGroup={isGroup} key="basicInfo" />, <Tweets key="tweets" tweets={data.tweets} />]} />
        <div style={{height: "30px"}}></div>
        <Youtube videos={data.youtubes} />
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
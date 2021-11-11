import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomGridRow from '../components/common/CustomGridRow';
import BasicInfo from '../components/SearchResult/BasicInfo';
import Twitter from '../components/SearchResult/Twitter';
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
        <CustomGridRow components={[<BasicInfo {...dummy.basicInfo} isGroup={isGroup} key="basicInfo" />, <Twitter key="twitter" tweets={dummy.tweets} />]} />
        <div style={{height: "30px"}}></div>
        <Youtube videos={dummy.youtubes} />
        <SharedVideos videos={dummy.shared} />
        <CommentInput />
        <Comments comments={dummy.comments} />
        <div style={{height: "150px"}}></div>
    </SearchResultRoot>
}

const SearchResultRoot = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export default SearchResult;
import React, { useEffect, useState } from 'react';
import CustomGridRow from '../components/common/CustomGridRow';
import BasicInfo from '../components/SearchResult/BasicInfo';
import Tweets from '../components/SearchResult/Tweets';
import YoutubeVideos from '../components/SearchResult/YoutubeVideos';
import styled from "@emotion/styled";
import CommentInput from '../components/SearchResult/CommentInput';
import Comments from '../components/SearchResult/Comments';
import { useParams } from 'react-router';
import axios from 'axios';
import Loader from '../components/common/Loader';

const SearchResult = (props) => {

    const [isLoading, setIsloading] = useState(true);
    const [data, setData] = useState({});
    const [reload, setReload] = useState(false);
    const { isGroup } = props;
    const { id } = useParams();

    useEffect(async () => {
        const res = await axios.get(`/search-result/${isGroup ? "group" : "member"}/${id}`);
        setData({ ...res.data });
    }, [reload]);

    useEffect(() => {
        if (Object.keys(data).length > 0) setIsloading(false);
    }, [data])

    if (isLoading) return <Loader script={"Crawling data.."} />
    return <SearchResultRoot>
        <CustomGridRow components={[<BasicInfo {...data.basicInfo} id={id} isGroup={isGroup} liked={data.liked} loadedScraps={data.scraps} isLoggedIn={data.isLoggedIn} key="basicInfo" />, <Tweets key="tweets" tweets={data.tweets} />]} />
        <div style={{ height: "30px" }}></div>
        <YoutubeVideos videos={data.youtubes} />
        <CommentInput id={id} isGroup={isGroup} setReload={setReload} reload={reload} isLoggedIn={data.isLoggedIn}/>
        {data.comments.length ? <Comments isGroup={isGroup} comments={data.comments} setReload={setReload} reload={reload} /> : null}
        <div style={{ height: "150px" }}></div>
    </SearchResultRoot>
}

const SearchResultRoot = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export default SearchResult;
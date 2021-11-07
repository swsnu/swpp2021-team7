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

const SearchResult = (props) => {

    const dummy = {
        basicInfo: {
            image: 'https://img.insight.co.kr/static/2019/01/31/700/18nd52ajs5z4750u7p6f.jpg',
            info: {name: {kor: '강슬기', eng: 'Seulgi'}, group: 'Red Velvet', birth: '1994.02.10', debut: '2014.08.01'},
            news: [ {title: '타블로와 슬기, 빅나티, 노보가 함께한 라코스테 X 피너츠 협업 캠페인', url: 'https://www.gqkorea.co.kr/2021/11/05/%ED%83%80%EB%B8%94%EB%A1%9C%EC%99%80-%EC%8A%AC%EA%B8%B0-%EB%B9%85%EB%82%98%ED%8B%B0-%EB%85%B8%EB%B3%B4%EA%B0%80-%ED%95%A8%EA%BB%98%ED%95%9C-%EB%9D%BC%EC%BD%94%EC%8A%A4%ED%85%8C-x-%ED%94%BC%EB%84%88/'},
                    {title: '레드벨벳 슬기, 러블리한 매력 폭발..인형이라 해도 믿겠어♥', url: 'https://entertain.naver.com/read?oid=112&aid=0003493956'},
                    {title: '아이린x슬기x예리, 방구석 핼러윈 파티 인증샷 공개', url: 'https://entertain.naver.com/read?oid=009&aid=0004872615'}]
        },
        tweets: [{author: 'gomseulgi', content: 'Seulgi is god', avatar: '/static/images/avatar/1.jpg'},
                {author: '휴먼히읗', content: "FINNALY TAEYONG AND SEULGI SINGING ROSE LIVE 😭😭", avatar: "/static/images/avatar/2.jpg"},
                {author: "슬기.zip", content: "#슬기zip 완벽 재현📸 2021 ver. 프링글슬기👶🏻 쥔님 방부제 미모 어떡해😆 옛날도 지금도 변함 없는 사실❗️#슬기 는 세상에서 제일 귀여운 존재💞 #NOW온에어 화요일 투슬✌🏻레전드 발라더 #2am 전격 방문🏡 감성 가득 슬기zip 절대 본방사수👀", avatar: "/static/images/avatar/3.jpg", image: "https://pbs.twimg.com/media/FDWz92hakAEnzFV?format=jpg&name=4096x4096"}],
        youtubes: [
            {uploadDate: '5 days ago', title: "2022 Red Velvet SEASON’S GREETINGS CONCEPT TRAILER #RedVelvet", thumbnail: 'https://i.ytimg.com/vi/cTjSbnA4WhI/hq2.jpg', url: 'https://youtube.com/shorts/cTjSbnA4WhI?feature=share'},
            {uploadDate: '1 month ago', title: "Red Velvet 레드벨벳 'Queendom' Compilation", thumbnail: 'https://i.ytimg.com/vi/i8wv1PWGFoo/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCO8nmPu2Nwrt6IvF_cvt9ws2kl2w', url: 'https://youtu.be/i8wv1PWGFoo'},
            {uploadDate: '2 months ago', title: "Red Velvet 레드벨벳 '다시, 여름 (Hello, Sunset)' Special VideoㅣRV Collection", thumbnail: "https://i.ytimg.com/vi/DDokLv2ujyk/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCfAQ0rcg8KK4im3SY8Ok_jdwIoWgz", url: "https://youtu.be/DDokLv2ujyk"},
        ],
        shared: [
            {uploader: 'seulseul', title: "[STATION X 0] 슬기(SEULGI)X신비(여자친구)X청하X소연 'Wow Thing' MV", thumbnail: 'https://i.ytimg.com/vi/KR5CtMLuiqQ/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC_9ZgdbeD0mNkN1VGoG2Vzd3U8IQ', url: 'https://youtu.be/KR5CtMLuiqQ'},
            {uploader: 'kang', title: "Red Velvet 레드벨벳 'Queendom' MV BehindㅣRV Collection", thumbnail: 'https://i.ytimg.com/vi/nbfJU8WkcO4/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDZJAE8Uq5Aae-pk352Ga7KBYXoBg', url: 'https://youtu.be/KR5CtMLuiqQ'},
            {uploader: 'rvfanboy', title: "Red Velvet 레드벨벳 'Queendom' MV", thumbnail: 'https://i.ytimg.com/vi/c9RzZpV460k/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAkifyd7qlRi1nUBuDnELaT-rxnLQ', url: 'https://youtu.be/KR5CtMLuiqQ'},
        ],
        comments: [
            {author: "seulgijjang", content: "will you guys buy the season greeting?", timestamp: "3 days ago"},
            {author: "cheodory", content: "sure;;", timestamp: "23 hours ago"},
            {author: "hihi", content: "i wanna go to the concert", timestamp: "1 hour ago"},
        ]
    }

    const [isLoading, setIsloading] = useState(true);
    const [data, setData] = useState({});
    const memberId = props.match.params?.id;

    useEffect(() => {
        // memberId 없으면 홈으로 리다이렉트
        // 있으면 이용해서 search api call
        setTimeout(() => {
            setData({...dummy})
            console.log('loaded member data');
        }, 1000)
    }, []);

    useEffect(() => {
        if (Object.keys(data).length > 0) setIsloading(false);
    }, [data])

    if (isLoading) return <CircularProgress />
    return <SearchResultRoot>
        <CustomGridRow components={[<BasicInfo {...dummy.basicInfo} key="basicInfo" />, <Twitter key="twitter" tweets={dummy.tweets} />]} />
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
import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomGridRow from '../components/common/CustomGridRow';
import BasicInfo from '../components/SearchResult.jsx/BasicInfo';
import Twitter from '../components/SearchResult.jsx/Twitter';
import Youtube from '../components/SearchResult.jsx/Youtube';

const SearchResult = (props) => {

    const dummy = {
        basicInfo: {
            image: 'https://img.insight.co.kr/static/2019/01/31/700/18nd52ajs5z4750u7p6f.jpg',
            info: {name: {kor: '강슬기', eng: 'Seulgi'}, group: 'Red Velvet', birth: '1994.02.10', debut: '2014.08.01'},
            news: [ {title: '타블로와 슬기, 빅나티, 노보가 함께한 라코스테 X 피너츠 협업 캠페인', url: 'https://www.gqkorea.co.kr/2021/11/05/%ED%83%80%EB%B8%94%EB%A1%9C%EC%99%80-%EC%8A%AC%EA%B8%B0-%EB%B9%85%EB%82%98%ED%8B%B0-%EB%85%B8%EB%B3%B4%EA%B0%80-%ED%95%A8%EA%BB%98%ED%95%9C-%EB%9D%BC%EC%BD%94%EC%8A%A4%ED%85%8C-x-%ED%94%BC%EB%84%88/'},
                    {title: '레드벨벳 슬기, 러블리한 매력 폭발..인형이라 해도 믿겠어♥', url: 'https://entertain.naver.com/read?oid=112&aid=0003493956'},
                    {title: '아이린x슬기x예리, 방구석 핼러윈 파티 인증샷 공개', url: 'https://entertain.naver.com/read?oid=009&aid=0004872615'}]
        },
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
    return <>
        <CustomGridRow components={[<BasicInfo {...dummy.basicInfo} key="basicInfo" />, <Twitter key="twitter" />]} />
        <Youtube />
    </>
}

export default SearchResult;
import React, { Component } from 'react';
import {
    ListItem,
    Button,
    Divider,
    ListItemText,
    ListItemButton
} from '@mui/material';


export default class MyArticle extends Component {
    deleteScrapedArticle = () => {
        console.log("click deleteScrapedArticle")
    }
    render() {
        return (
            <React.Fragment>
                <ListItem>
                    <ListItemButton component="a" href="https://www.gqkorea.co.kr/2021/11/05/%ED%83%80%EB%B8%94%EB%A1%9C%EC%99%80-%EC%8A%AC%EA%B8%B0-%EB%B9%85%EB%82%98%ED%8B%B0-%EB%85%B8%EB%B3%B4%EA%B0%80-%ED%95%A8%EA%BB%98%ED%95%9C-%EB%9D%BC%EC%BD%94%EC%8A%A4%ED%85%8C-x-%ED%94%BC%EB%84%88/">
                        <ListItemText
                            primary='타블로와 슬기, 빅나티, 노보가 함께한 라코스테 X 피너츠 협업 캠페인'
                        />
                    </ListItemButton>
                    <Button variant="contained" onClick={() => this.deleteScrapedArticle()}>delete</Button>
                </ListItem>
                <Divider variant="inset" component="li" />
            </React.Fragment>
        )
    }
}
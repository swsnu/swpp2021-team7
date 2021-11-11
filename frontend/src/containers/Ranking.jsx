import React, { Component } from 'react';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import Pagination from '@mui/material/Pagination';
import { withStyles } from "@material-ui/core/styles";

import RankItem from '../components/Ranking/RankItem';

const StyledPagination = withStyles({
    ul: {
      justifyContent : "center"
    }
  })(Pagination);


export default class Ranking extends Component {
    render() {
        return (
            <React.Fragment>
                <Container maxWidth="sm">
                    <h1>Ranking</h1>
                    <List sx={{
                        width: '100%',
                        bgcolor: 'background.paper',
                        position: 'relative',
                    }}>
                        <RankItem rank="1" name={{kor:"강슬기", eng:"Seulgi"}} isGroup={false} img={'https://img.insight.co.kr/static/2019/01/31/700/18nd52ajs5z4750u7p6f.jpg'}></RankItem>
                        <RankItem rank="2" name={{kor:"레드벨벳", eng:"Red Velvet"}} isGroup={true} img={'https://pbs.twimg.com/media/E85o_8MVgAM58Gd.jpg'}></RankItem>
                    </List>
                </Container>
                <Container maxWidth="sm">
                    <StyledPagination count={10} boundaryCount={3} shape="rounded" />
                </Container>
            </React.Fragment>
        )
    }
}

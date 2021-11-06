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
                        <RankItem rank="1" name="V"></RankItem>
                        <RankItem rank="2" name="bts_V"></RankItem>
                        <RankItem rank="3" name="방탄_V"></RankItem>
                        <RankItem rank="4" name="korea_V"></RankItem>
                        <RankItem rank="5" name="VV"></RankItem>
                    </List>
                </Container>
                <Container maxWidth="sm">
                    <StyledPagination count={10} boundaryCount={3} shape="rounded" />
                </Container>
            </React.Fragment>
        )
    }
}

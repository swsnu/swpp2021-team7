import React, { Component } from 'react';
import {
    Container,
    Box,
    Typography,
    List,
    Pagination,
} from '@mui/material';
import { withStyles } from "@material-ui/core/styles";
import Fire from "@mui/icons-material/LocalFireDepartment"
import RankItem from '../Ranking/RankItem';
import { withRouter } from 'react-router';

const StyledPagination = withStyles({
    ul: {
      justifyContent : "center"
    }
  })(Pagination);


class HotRankingList extends Component {
    handleClick = () => {
        this.props.history.push('/rank');
    }

    render() {
        return (
            <React.Fragment>
                <Container maxWidth="sm">
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="center"
                    >
                        <Fire sx={{color: 'red'}} onClick={this.handleClick}/>
                        <Typography id="go-rank-button" variant="h6" color="red" onClick={this.handleClick}> Hottest Idols </Typography>                    
                    </Box>
                    <List sx={{
                        width: '100%',
                        bgcolor: 'background.paper',
                        position: 'relative',
                    }}>
                        <RankItem rank="1" name={{kor:"강슬기", eng:"Seulgi"}} isGroup={false} img={'https://img.insight.co.kr/static/2019/01/31/700/18nd52ajs5z4750u7p6f.jpg'}></RankItem>
                        <RankItem rank="2" name={{kor:"레드벨벳", eng:"Red Velvet"}} isGroup={true} img={'https://pbs.twimg.com/media/E85o_8MVgAM58Gd.jpg'}></RankItem>
                    </List>
                </Container>
            </React.Fragment>
        )
    }
}

export default withRouter(HotRankingList);

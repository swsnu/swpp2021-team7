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
                        <Typography variant="h6" color="red" onClick={this.handleClick}> Hottest Idols </Typography>                    
                    </Box>
                    <List sx={{
                        width: '100%',
                        bgcolor: 'background.paper',
                        position: 'relative',
                    }}>
                        <RankItem rank="1" name="V"></RankItem>
                        <RankItem rank="2" name="bts_V"></RankItem>
                        <RankItem rank="3" name="방탄_V"></RankItem>
                    </List>
                </Container>
            </React.Fragment>
        )
    }
}

export default withRouter(HotRankingList);

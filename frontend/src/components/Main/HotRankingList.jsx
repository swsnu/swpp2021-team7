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

const StyledPagination = withStyles({
    ul: {
      justifyContent : "center"
    }
  })(Pagination);


export default class HotRankingList extends Component {
    render() {
        return (
            <React.Fragment>
                <Container maxWidth="sm">
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="center"
                    >
                        <Fire sx={{color: 'red'}}/>
                        <Typography variant="h6" color="red"> Hottest Idols </Typography>                    
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

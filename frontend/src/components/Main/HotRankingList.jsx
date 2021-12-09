import React, { Component } from 'react';
import {
    Container,
    Box,
    Typography,
    List,
    Pagination,
} from '@mui/material';
import Fire from "@mui/icons-material/LocalFireDepartment"
import RankItem from '../Ranking/RankItem';
import { withRouter } from 'react-router';

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
                        {      
                            this.props.data.idolInfos === undefined ?
                            "Loading..." : 
                            this.props.data.idolInfos.map((items, index) => {
                                return(<RankItem id={items.id} rank={index+1} name={items.name} type={items.type === "member"? "member" : "group"} img={items.address} key={index+1}></RankItem>)
                            }) 
                        }
                    </List>
                </Container>
            </React.Fragment>
        ) 
    }
}

export default withRouter(HotRankingList);

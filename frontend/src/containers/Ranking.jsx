import React, { Component } from 'react';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import Pagination from '@mui/material/Pagination';
import { withStyles } from "@material-ui/core/styles";
import axios from "axios"
import RankItem from '../components/Ranking/RankItem';

const StyledPagination = withStyles({
    ul: {
        justifyContent: "center"
    }
})(Pagination);


export default class Ranking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idolInfos: [],
            lastPage: 1
        }
    }
    getIdolInPage = (page) => {
        axios.get(`main/ranking/?page=${page}`)
            .then((res) => {
                this.setState({
                    idolInfos: res.data.idolInfos,
                    lastPage: res.data.lastPage
                })
            })
            .catch(error => {
                // console.log("ranking page error")
            })
    }

    componentDidMount() {
        this.getIdolInPage(1)
    }

    handleChangePage = (e, newPage) => {
        this.getIdolInPage(newPage)
    }

    render() {
        let rankings = []
        for (let idol of this.state.idolInfos) {
            rankings.push(<RankItem
                rank={this.state.idolInfos.indexOf(idol) + 1}
                key={this.state.idolInfos.indexOf(idol) + 1}
                id={idol.id}
                name={idol.name}
                type={idol.type}
                img={idol.address}>
            </RankItem>)
        }
        return (
            <React.Fragment>
                <Container maxWidth="sm">
                    <h1>Ranking</h1>
                    <List sx={{
                        width: '100%',
                        bgcolor: 'background.paper',
                        position: 'relative',
                    }}>
                        {rankings}
                    </List>
                </Container>
                <Container maxWidth="sm">
                    <StyledPagination
                        count={this.state.lastPage}
                        onChange={this.handleChangePage}
                        boundaryCount={0}
                        shape="rounded" />
                </Container>
            </React.Fragment>
        )
    }
}

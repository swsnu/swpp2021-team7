import React from 'react';
import {
    Container,
    CssBaseline,
    TextField,
    Box,
    Typography,
    IconButton,
    Grid,
    Link,
    Button
} from '@mui/material';
import logo from '../image/256w/자산 1_256.png';
import { withRouter } from 'react-router';
import Search from '@mui/icons-material/Search';
import HotRankingList from '../components/Main/HotRankingList';
import SearchResult from '../components/Main/SearchResult';
import axios from 'axios';

function Main({isTest=false, testAxios=null}) {
    const [submitDone, setSubmitDone] = React.useState(false);
    const [list, setList] = React.useState();
    const [rankingData, setRankingData] = React.useState({});
    const [searchResult, setSearchResult] = React.useState([]);

    async function getBySearchKeyword(keyword) {
        try {
          const response = testAxios ? testAxios() : await axios.get(`search-result/search/${keyword}/`);
          testAxios ? alert("Searched") : setSearchResult(response.data);
        } catch(err) {
          alert("Search failed");
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let keyword = new FormData(event.currentTarget);
        keyword = keyword.get('search-input');
        getBySearchKeyword(keyword);
        setSubmitDone(true);
    };

    const handleRequestClick = async () => {
        const name = isTest ? "test" : prompt("Enter the name of the idol you want to request support on:");
        try {
            testAxios ? testAxios() : await axios.post("/search-result/request-support/", {"name": name});
            alert(`Successfully submitted. We would make [${name}] available shortly.`);
        } catch {
            alert("Excessive requests in short time. Request again after a while.");
        }
    }
    

    React.useEffect(() => { 
        async function getRankingData() {
            const response = await axios.get('/main/ranking/');
            setRankingData(response.data);
        }
        getRankingData();
    }, [])


    React.useEffect(() => {
        if(rankingData !== {}) {
            setList(<HotRankingList data={rankingData}/>);
        }
    }, [rankingData])

    return (
        <React.Fragment>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img 
                        src={logo}
                        style={{margin: 20}}
                    /> 
                    <Box component="form" 
                        onSubmit={handleSubmit} 
                        noValidate 
                        sx={{ mt: 1 }}
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        width={500}
                    >
                        <Typography variant="h6" width={350}>
                            Search input
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="search-input"
                            label="Search Keyword"
                            name="search-input"
                            autoComplete="input"
                            autoFocus
                        />
                        <IconButton type="submit" sx={{margin: 1}}>
                            <Search id="search-button"/>    
                        </IconButton>
                    </Box>
                    <Box margin={1}>
                        <Grid item columnSpacing={1}>
                            <Button href="/search/group/2" variant="outlined"> {"#BTS"} </Button>
                            <Button href="/search/group/1" variant="outlined"> {"#Red Velvet"} </Button>
                            <Button href="/search/group/3" variant="outlined"> {"#BTOB"} </Button>
                        </Grid>
                    </Box>
                    <Box>
                        <Grid item columnSpacing={1}>
                            <Button href="/video" variant="contained" color="primary"> {"new! Generate video clips"} </Button>
                        </Grid>
                    </Box>
                    {   
                        submitDone && (
                            <Box xs={{mt:10}}>
                                <Typography variant="h6"> Search Result </Typography>
                                {searchResult.length == 0 && <>No idol found. Would you request support? <Button id="requestBtn" variant="outlined" color="error" onClick={handleRequestClick}>Request Support</Button></>}
                                {searchResult ? searchResult.map((item) => {
                                    return (<SearchResult name={item.name.kor + ' ' + item.name.eng} isGroup={item.isGroup} id={item.id} key={item.id} thumbnail={item.thumbnail}/>)
                                }) : "Loading..."
                                } 
                            </Box>
                        )
                    }
                    <Box
                        display="flex"
                        flexDirection="row"
                        sx={{mt:10}}
                    >
                        <Typography variant="h6" width={350}>
                            Ranking
                        </Typography>
                        {list ? list : "Loading..."}
                     </Box>
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default withRouter(Main);

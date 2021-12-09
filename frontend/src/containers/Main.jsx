import React from 'react';
import {
    Container,
    CssBaseline,
    TextField,
    Box,
    Typography,
    IconButton,
    Grid,
    Link
} from '@mui/material';
import logo from '../image/256w/자산 1_256.png';
import { withRouter } from 'react-router';
import Search from '@mui/icons-material/Search';
import HotRankingList from '../components/Main/HotRankingList';
import SearchResult from '../components/Main/SearchResult';
import axios from 'axios';

function Main() {
    const [submitDone, setSubmitDone] = React.useState(false);
    const [list, setList] = React.useState();
    const [rankingData, setRankingData] = React.useState({});

    async function postData(json) {
        try {
          const response = await axios.post('/account/signin/', json, {
            headers:{
              'Content-type': 'application/json'
            }
          });
          console.log(response);
          props.history.push('/')
        } catch(err) {
          alert('Email or Password does not exist')
          console.error(err);
        }
    }

    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setSubmitDone(true);
        // getRankingData();
        // console.log({
        // search: data.get('search-input'),
        // });
    };

    

    React.useEffect(() => { 
        async function getRankingData() {
            const response = await axios.get('/main/ranking/');
            setRankingData(response.data);
        }
        getRankingData();
    }, [])

    React.useEffect(() => {
        console.log(rankingData);
        if(rankingData !== {}) {
            setList(<HotRankingList data={rankingData}/>);
        }
        console.log(list)
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
                    <Box>
                        <Grid item columnSpacing={1}>
                            <Link href="/search" variant="body2"> {"#BTS"} </Link>
                            <Link href="/search" variant="body2"> {"#Red Velvet"} </Link>
                            <Link href="/search" variant="body2"> {"#BTOB"} </Link>
                        </Grid>
                    </Box>
                    <Box>
                        <Grid item columnSpacing={1}>
                            <Link href="/video" variant="body2"> {"new! Generate video clips"} </Link>
                        </Grid>
                    </Box>
                    {   
                        submitDone && (
                            <Box xs={{mt:10}}>
                                <Typography variant="h6"> Search Result </Typography>
                                <SearchResult name="레드벨벳 Red Velvet" />
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
                        {/* <HotRankingList data={rankingData} /> */}
                        {/* {
                            (rankingData === {}) ? "Loading..." :
                            <HotRankingList data={rankingData}/>
                        } */}
                     </Box>
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default withRouter(Main);

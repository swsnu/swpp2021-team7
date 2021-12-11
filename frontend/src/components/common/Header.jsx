import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { withRouter } from 'react-router';
import { useLocation } from 'react-router';
import axios from 'axios';

const pathName = ["/logout", "/mypage/1", "/"]

function Header(props) {

    const checkPathName = (path) => {
        if(pathName.includes(path)){
            return path
        }
        else{
            return false
        }
    }

    const location = useLocation();
    const [value, setValue] = React.useState(checkPathName(location.pathname));
    const [isLogin, setIsLogin] = React.useState(false);
    const [userID, setUserID] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if(newValue ==='/sign/login') getData();
        if(newValue === '/mypage') {
            if(userID) newValue += `/${userID}`
            else {
                alert('Login is needed!');
                newValue = '/sign/login';
            }
        }
        props.history.push(newValue)
    };

    async function getData() {
        try {
          const response = await axios.get('/account/signout/');
        } catch(err) {
          console.error(err);
        }
    }

    React.useEffect(() => {
        setValue(checkPathName(location.pathname));
    }, [location.pathname])

    React.useEffect(() => {
        async function getLoginStatus() {
            const response = await axios.get('/account/islogin/').catch({});
            setIsLogin(response.data['status']);
            setUserID(response.data['id']);       
        }
        getLoginStatus();
    }, [props])

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                sx={{
                    '.MuiTabs-flexContainer': {
                        flexDirection: 'row-reverse'
                    }
                }}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                value={value}
                aria-label="secondary tabs example"
            >
                {   
                    isLogin ? 
                    <Tab value="/sign/login" label="Logout" /> :
                    <Tab value="/sign/login" label="Login" />
                }
                <Tab value='/mypage' label="MyPage" />
                <Tab value="/" label="Main" />
            </Tabs>
        </Box>
    );
}

export default withRouter(Header);

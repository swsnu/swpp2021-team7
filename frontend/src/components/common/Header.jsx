import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { withRouter } from 'react-router';
import { useLocation } from 'react-router';

function Header(props) {
    const location = useLocation();
    const [value, setValue] = React.useState(location.pathname);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.history.push(newValue)
    };


    React.useEffect(() => {
        setValue(location.pathname);
    }, [location.pathname])

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
                <Tab value="/logout" label="Logout" />
                <Tab value="/mypage/1" label="MyPage" />
                <Tab value="/" label="Main" />
            </Tabs>
        </Box>
    );
}

export default withRouter(Header);

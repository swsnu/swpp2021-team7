import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import { useLocation } from 'react-router';

function Header(props) {
    const [value, setValue] = React.useState('/');

    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.push(newValue)
    };

    const location = useLocation();

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

export default connect(null, { push })(Header)
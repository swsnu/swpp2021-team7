import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function Header() {
    const [value, setValue] = React.useState('main');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                aria-label="secondary tabs example"
            >
                <Tab value="logout" label="Logout" />
                <Tab value="mypage" label="MyPage" />
                <Tab value="main" label="Main" />
            </Tabs>
        </Box>
    );
}

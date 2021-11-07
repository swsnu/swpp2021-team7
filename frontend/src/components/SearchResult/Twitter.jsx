import * as React from 'react';
import List from '@mui/material/List';
import Tweet from './Tweet';

export default function Twitter({tweets}) {

  return <>
    <h3>On Twitter</h3>
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {tweets.map((tweet, i) => {
            return <Tweet {...tweet} key={i} />
        })}
    </List>
  </>
}

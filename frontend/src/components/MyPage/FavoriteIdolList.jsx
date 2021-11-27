import React, { Component } from 'react';
import List from '@mui/material/List';

import FavoriteIdol from './FavoriteIdol';

export default class FavoriteIdolList extends Component {
    render() {
        let favoriteIdolList = []
        for (let idol of this.props.idols) {
            favoriteIdolList.push(<FavoriteIdol
                key={idol.id}
                id={idol.id}
                name={idol.name}
                idolId={idol[idol.type]}
                type={idol.type}
                img={idol.address}>
            </FavoriteIdol>)
        }
        return (
            <React.Fragment>
                <List sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 300,
                }}>
                    {favoriteIdolList}
                </List>
            </React.Fragment>
        )
    }
}

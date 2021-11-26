import React, { Component } from 'react';
import List from '@mui/material/List';

import FavoriteIdol from './FavoriteIdol';

export default class FavoriteIdolList extends Component {
    render() {
        let favoriteIdolList = []
        for (let idol of this.props.idols) {
            favoriteIdolList.push(<FavoriteIdol
                key={idol.id}
                name={idol.name}
                idolId={idol[idol.type]}
                isGroup={idol.type == "member" ? false : true}
                img={'https://img.insight.co.kr/static/2019/01/31/700/18nd52ajs5z4750u7p6f.jpg'}>
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
                    {/* <FavoriteIdol name={{ kor: "강슬기", eng: "Seulgi" }} isGroup={false} img={'https://img.insight.co.kr/static/2019/01/31/700/18nd52ajs5z4750u7p6f.jpg'} />
                    <FavoriteIdol name={{ kor: "레드벨벳", eng: "Red Velvet" }} isGroup={true} img={'https://pbs.twimg.com/media/E85o_8MVgAM58Gd.jpg'} /> */}
                </List>
            </React.Fragment>
        )
    }
}

import React from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Backdrop } from '@mui/material';

export default function Tweet ({avatar, author, content, image, close, toggle}) {

    const [open, setOpen] = React.useState(false);
    
    const handleClose = () => {
      if (close) close();
      else setOpen(false);
    };

    const handleToggle = () => {
      if (toggle) toggle();
      else setOpen(!open);
    };

    return <div className="tweet">
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={avatar} />
            </ListItemAvatar>
            <ListItemText
            primary={content}
            secondary={
                <React.Fragment>
                <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                >
                    - {author}
                </Typography>
                </React.Fragment>
            }
            />
            {image && <>
                <img width="20%" onClick={handleToggle} src={image} className="image-before-click" />
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    onClick={handleClose}
                    className="backdrop"
                >
                <img height="90%" onClick={handleToggle} src={image} className="image-after-click"/>
                </Backdrop>
            </>}
        </ListItem>
        <Divider variant="inset" component="li" />
  </div>
}
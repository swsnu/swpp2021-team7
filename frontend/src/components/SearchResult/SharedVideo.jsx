import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function SharedVideo({uploader, thumbnail, title, url, onClick}) {
    const moveToUrl = () => window.location.href= url
    onClick = onClick || moveToUrl;
    
    return (
        <Card sx={{height: "350px"}} className="shared-video">
            <CardActionArea onClick={onClick} className="shared-video-link">
                <CardMedia
                component="img"
                height="200"
                image={thumbnail}/>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {uploader}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

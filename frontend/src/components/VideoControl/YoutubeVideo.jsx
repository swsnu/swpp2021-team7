import React, { Component } from 'react';
import YouTube from 'react-youtube';
import './YoutubeVideo.css';


export default class YoutubeVideo extends Component {
    render(){
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
            },
          };
        return (
            <>
            <YouTube
                        videoId={"CuklIb9d3fI"}                  // defaults -> null
                        id={"mainYoutube"}                       // defaults -> null
                        opts={opts}     
                        className={"youtubeBox"}                   // defaults -> {}
                        />
            </>
        );
    }
}
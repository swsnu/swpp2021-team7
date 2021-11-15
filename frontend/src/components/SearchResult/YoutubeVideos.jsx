import React from "react";
import CustomGridRow from "../common/CustomGridRow";
import YoutubeVideo from "./YoutubeVideo";

const YoutubeVideos = ({videos}) => {

    const videoComponents = videos.map((v, i) => <YoutubeVideo {...v} key={i} />);
    return <div id="youtube-videos">
        <h2>Youtube Uploads</h2>
        <CustomGridRow components={videoComponents} />
    </div>
};

export default YoutubeVideos;
import React from "react";
import CustomGridRow from "../common/CustomGridRow";
import YoutubeVideo from "./YoutubeVideo";

const Youtube = ({videos}) => {

    const videoComponents = videos.map((v, i) => <YoutubeVideo {...v} key={i} />);
    return <CustomGridRow components={videoComponents} />
};

export default Youtube;
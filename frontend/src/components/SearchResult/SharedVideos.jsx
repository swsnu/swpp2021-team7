import React from "react";
import CustomGridRow from "../common/CustomGridRow";
import SharedVideo from "./SharedVideo";

const SharedVideos = ({videos}) => {

    const videoComponents = videos.map((v, i) => <SharedVideo {...v} key={i} />);
    return <div id="shared-videos">
        <h2>Shared Indexed Videos</h2>
        <CustomGridRow components={videoComponents} />
    </div>
};

export default SharedVideos;
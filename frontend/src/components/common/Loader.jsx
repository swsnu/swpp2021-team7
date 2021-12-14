import React from 'react';
import "./Loader.scss";

const Loader = ({script}) => {
    
    return <div id="loader-container">
        <div id="loading">
            <p>{script}</p>
            <span></span>
        </div>
    </div>
}

export default Loader;
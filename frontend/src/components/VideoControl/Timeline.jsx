import React, { Component } from 'react';
// import YouTube from 'react-youtube';
import Container from '@mui/material/Container';
import './Timeline.css';

import { withRouter } from 'react-router';

const CutScene = 1001;
const FaceRecognition = 1002;

const TEST = [12,34,123,40,102,30,12,34,65,76,10,32,67,90];
class Timeline extends Component {
    constructor(props){
        super(props);
        this.state = {
            time : this.props.time,
            type : this.props.type,
            icon : "",
            length : 0
        };
    }
    render(){
        const timelines = this.state.time.map((num,i) => {
            const styleActive = {
                width: (num+"px"),
                backgroundColor:this.props.color
            }
            const styleDeactive = {
                width: (num+"px")
            }
            if(i % 2 == 0)
                return <div key={i} className="active-box"
                            style={styleActive}></div>;
            else
                return <div key={i} className="deactive-box"
                            style={styleDeactive}></div>;
        });
        return (<Container>
            <div className="timeline-container">
                {(this.state.type == FaceRecognition) ? (
                    <>
                    <div className="timeline-icon">
                        <img 
                            className="timeline-icon"
                            src={this.state.icon}/>
                    </div>
                    <div className="timeline-list"></div>
                    </>
                ) : (
                    <div className="timeline-box">
                        {timelines}
                    </div>
                )}
            </div>
        </Container>);
    }
}
export default withRouter(Timeline);
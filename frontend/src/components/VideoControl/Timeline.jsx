import React, { Component } from 'react';
import YouTube from 'react-youtube';
import Container from '@mui/material/Container';
import './Timeline.css';


export default class Timeline extends Component {
    constructor(props){
        super(props);
        test=[12,34,123,40,102,30,12,34,65,76,10,32,67,90];
        this.state = {test:test};
    }
    render(){
        const timelines = this.state.test.map((num,i) => {
            const styleActive = {
                width: (num+"px"),
                backgroundColor:this.props.color
            }
            const styleDeactive = {
                width: (num+"px")
            }
            if(i % 2 == 0)
                return <div className="active-box"
                            style={styleActive}></div>;
            else
                return <div className="deactive-box"
                            style={styleDeactive}></div>;
        });
        return (<Container maxWidth="sm">
            <div className="timeline-container">
                <div className="timeline-box">
                    {timelines}
                </div>
            </div>
        </Container>);
    }
}
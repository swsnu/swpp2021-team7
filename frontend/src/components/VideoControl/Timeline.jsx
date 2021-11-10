import React, { Component } from 'react';
import YouTube from 'react-youtube';
import Container from '@mui/material/Container';
import './Timeline.css';


export default class Timeline extends Component {
    constructor(props){
        super(props);
        function getRandomInt(max,min=0) {
            return Math.floor(Math.random() * max)+min;
          }
        const test = [];
        for(let i = 0 ; i < 100 ; i++){
            test.push(getRandomInt(100,20));
        }
        console.log(test);
        this.state = {test:test};
    }
    render(){
        const timelines = this.state.test.map((num,i) => {
            const styleActive = {
                width: (num+"px"),
                "background-color":this.props.color
            }
            const styleDeactive = {
                width: (num+"px")
            }
            if(i % 2 == 0)
                return <div className="active-box"
                            style={styleActive}></div>;
            else if(i % 2 == 1)
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
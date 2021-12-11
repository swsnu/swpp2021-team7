import React, { Component } from 'react';
import './IdolSelector.css';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import { withRouter } from 'react-router';
class IdolSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
        this.myRef1 = React.createRef();
        this.myRef2 = React.createRef();
        
        
    }
    render(){
        return (<>
            <Container maxWidth="sm">
                <div className="idol-selector">
                    <p
                        className="idol-title"
                        >{"Choose your IDOL"}</p>
                    <div 
                    className="idol-image" 
                    ref={this.myRef1}>
                        <img
                        className="idol-image"
                        src="/images/IU.jpg"></img>
                        <div 
                        className="idol-hover">
                            <p
                            className="idol-hover">IU</p>
                        </div>
                    </div>
                    <div 
                    className="idol-image"
                    ref={this.myRef2}>
                        <img
                        className="idol-image"
                        src="/images/BTS_V.jpg"></img>
                        <div 
                        className="idol-hover">
                            <p
                            className="idol-hover">V</p>
                        </div>
                    </div>
                </div>
                <Button variant="contained">Extract clips from video</Button>
            </Container>
        </>);
    }
}

export default withRouter(IdolSelector);
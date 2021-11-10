import React, { Component } from 'react';
import './IdolSelector.css';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

export default class IdolSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
        this.myRef1 = React.createRef();
        this.myRef2 = React.createRef();
        this.activeIdol = this.activeIdol.bind(this);
        
    }
    activeIdol(e,data){
        console.log(e,data);
        console.log(this);
        if(e.target.classList.contains("is-active")){
            e.target.classList.remove("is-active");
        }else{
            e.target.classList.add("is-active");
        }
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
                    ref={this.myRef1}
                    onClick={this.activeIdol}>
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
                    ref={this.myRef2}
                    onClick={this.activeIdol}>
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
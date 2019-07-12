import React, {Component} from "react";
import styled from "styled-components";
import {Runtime, Inspector} from "@observablehq/runtime";
import notebook from "@jashkenas/how-to-embed-a-notebook-in-a-react-app";
import coolook from "@stroked/cool-l-ook";
// import MajorIndexesCirclePack from './MajorIndexes'
    // "@stroked/major-indexes-angry-bird-edition": "https://api.observablehq.com/@stroked/major-indexes-angry-bird-edition.tgz@838?v=3",

const HeaderStyles = styled.div`
  user-select: none;
  @import url(https://fonts.googleapis.com/css?family=Arvo:700);
  @import url(https://fonts.googleapis.com/css?family=Seaweed+Script);
  #title_intro {
    background-color: #222;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  .tradingDay {
    font-size: 5em;
    color: #fff;
    font-family: Arvo;
    font-weight: bold;
    text-shadow: -3px -3px 0 #222, 3px -3px 0 #222, -3px 3px 0 #222,
      3px 3px 0 #222, 4px 4px 0 #fff, 5px 5px 0 #fff, 6px 6px 0 #fff,
      7px 7px 0 #fff;
    line-height: 1em;
    letter-spacing: 0.1em;
    margin: 0;
    margin-top:-0.2em;
    text-align: center;
  }

  .lined span {
    background-color: #222;
    padding: 0 0.3em;
    display: inline-block;
    position: relative;
    font-family: "Seaweed Script";
    color: #fff;
    text-align: center;
    font-size: 40px;
    margin: 0;
  }
  .lined span:before,
  .lined span:after {
    content: "";
    position: absolute;
    height: 0.5em;
    border-bottom: 10px solid white;
    top: 0;
    width: 100vw;
  }
  .lined span:before {
    right: 100%;
    margin-right: 15px;
  }
  .lined span:after {
    left: 100%;
    margin-left: 15px;
  }
`;

class App extends Component {


 state = {speed: 0.1};
  animationRef = React.createRef();
  knobRef = React.createRef();
  componentDidMount() {
    const runtime = new Runtime();
    runtime.module(coolook,name => {
      if (name === "Knob") {
        return new Inspector(this.knobRef.current);
      }    
    });


    runtime.module(notebook, name => {
      if (name === "animation") {
        return new Inspector(this.animationRef.current);
      }
      if (name === "mutable speed") {
        return {fulfilled: (value) => {
          this.animationSpeed = value;
        }};
      }
    });
  }

  componentDidUpdate(nextProps, nextState) {
    if (nextState.speed !== this.state.speed) {
      this.animationSpeed.value = nextState.speed;
    }
  }

  setSpeed = (event) => {
    this.setState({speed: event.target.valueAsNumber});
  }

render(){
  return (
    <HeaderStyles className='App'>
      <div id='title_intro'>
        <p className='lined'>
          <span>The American Financial Markets</span>
        </p>
        <p className='tradingDay'>Trading Day</p>
        <p className='lined'>
          <span>by Ajay Phogat</span>
        </p>
      </div>

      <div ref={this.knobRef}></div>
      <div>
        <div ref={this.animationRef} />
        <small>Speed: {this.state.speed}</small>
        <br />
        <input
          type='range'
          min='0'
          max='2'
          step='0.1'
          value={this.state.speed}
          onChange={this.setSpeed}
        />
      </div>
    </HeaderStyles>
  );
};
}

export default App;

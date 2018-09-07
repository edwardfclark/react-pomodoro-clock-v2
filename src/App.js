import React, { Component } from 'react';
import './App.css';
import SessionButtons from "./SessionButtons.js";
import BreakButtons from "./BreakButtons.js";
import wav from "./chime.wav";

let countdownTimer = null;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionState: "session",
      breakLength: 5,
      sessionLength: 25,
      mins: 25,
      secs: 0,
      timer: null
    }

    this.getTimer = this.getTimer.bind(this);
    this.countdown = this.countdown.bind(this);
    this.startCountdown = this.startCountdown.bind(this);
    this.alterLength = this.alterLength.bind(this);
    this.displaySessionState = this.displaySessionState.bind(this);
    this.playBeep = this.playBeep.bind(this);
    this.reset = this.reset.bind(this);
  }

  //This method will take two args: phase and amt.
  //alterLength() is passed to SessionButtons and BreakButtons as props. It works with both.
  //It won't allow the user to raise either timer above 60 or below 1.
  //It only changes the mins in the app's state if the user is editing the currently active phase.
  alterLength(phase, amt) {
    let phaseLength = this.state[phase+"Length"];
    
    if ((amt > 0 && phaseLength < 60) || (amt < 0 && phaseLength > 1)) {
      if (phase === "session") {
        this.state.sessionState === phase ? this.setState({ sessionLength: this.state.sessionLength+amt, mins: this.state.sessionLength+amt }) : this.setState({sessionLength: this.state.sessionLength+amt});
      } else {
        this.state.sessionState === phase ? this.setState({ breakLength: this.state.breakLength+amt, mins: this.state.breakLength+amt }) : this.setState({ breakLength: this.state.breakLength+amt });
      }
    }

  }

  //This method is used to format the current minutes and seconds in the mm:ss format.
  getTimer() {
    if (this.state.secs >= 10) {
      return `${this.state.mins}:${this.state.secs}`;
    } else {
      return `${this.state.mins}:0${this.state.secs}`;
    }
  }

  //This method is the callback method for the setInterval call.
  //It counts down from the currently displayed value in seconds.
  //Because this is a React program, all of the DOM manipulation is handled by re-rendering the app when state is changed.
  countdown() {

    //When the timer reaches 0:00, swap the sessionState and set mins to either breakLength or sessionLength, depending on what state we're swapping to.
    //This line must be ahead of the ternary statement in this method if we want the timer to reach 00:00.
    if (this.state.secs === 0 && this.state.mins === 0) {
      this.state.sessionState === "session" ? this.setState({sessionState: "break", mins: this.state.breakLength}) : this.setState({sessionState: "session", mins: this.state.sessionLength}); 
      this.playBeep();
    }
    //This line runs once per call of countdown() and decrements secs by 1 every time.
    //If secs is zero, it instead sets secs to 59 and decrements mins by 1.
    this.state.secs > 0 ? this.setState({ secs: this.state.secs - 1 }) : this.setState({secs: 59, mins: this.state.mins - 1});
  }
  
  //This method runs when you click start/stop.
  startCountdown() {
    if (countdownTimer == null) {
      countdownTimer = setInterval(this.countdown, 1000);
    } else {
      clearInterval(countdownTimer);
      countdownTimer = null;
    }
  }

  //This method formats this.state.sessionState for use in #timer-label.
  displaySessionState() {
    let label = this.state.sessionState;
    return label.slice(0, 1).toUpperCase() + label.slice(1);
  }

  //This method resets the entire app, returning everything to its default state and stopping the timer if the timer is running.
  reset() {
    if (countdownTimer !== null) {
      clearInterval(countdownTimer);
      countdownTimer = null;
      this.setState({
        sessionState: "session",
        breakLength: 5,
        sessionLength: 25,
        mins: 25,
        secs: 0,
        timer: null
      });
    }
  }

  playBeep() {
    let sound = document.getElementById("beep");
    sound.play();
  }

  render() {
    
    return (
      
      <div className="clock-container">
      <div id="stem"></div>
      <audio id="beep" src={wav}></audio>
        <h2 id="timer-label">{this.displaySessionState()}</h2>
        <h1 id="time-left">{this.getTimer()}</h1>
        <h3 id="start_stop" onClick={this.startCountdown}>Start/Stop</h3>
        <h3 id="reset" onClick={() => this.reset()}>Reset</h3>
        <div className="buttons">
          <SessionButtons className="session-buttons" sessionLength={this.state.sessionLength} alterLength={this.alterLength} />
          <BreakButtons className="break-buttons" breakLength={this.state.breakLength} alterLength={this.alterLength}/>
        </div>
        
      </div>
    );
  }
}

export default App;

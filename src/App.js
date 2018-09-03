import React, { Component } from 'react';
import './App.css';
import SessionButtons from "./SessionButtons.js";
import BreakButtons from "./BreakButtons.js";

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

    this.incBreak = this.incBreak.bind(this);
    this.decBreak = this.decBreak.bind(this);
    this.incSession = this.incSession.bind(this);
    this.decSession = this.decSession.bind(this);
    this.getTimer = this.getTimer.bind(this);
    this.countdown = this.countdown.bind(this);
    this.startCountdown = this.startCountdown.bind(this);
  }

  

  //Simple methods to increment or decrement the breakLength or sessionLength.
  //These will be passed to SessionButtons and BreakButtons as props.
  //These methods cannot be accessed by the user while the app is not paused.
  incBreak() {
    if (this.state.breakLength < 60) {
      this.setState({
        breakLength: this.state.breakLength + 1,
        mins: this.state.breakLength,
        secs: 0
      });
    }
  }

  decBreak() {
    if (this.state.breakLength > 1) {
      this.setState({
        breakLength: this.state.breakLength - 1,
        mins: this.state.breakLength,
        secs: 0
      });
    }
  }

  incSession() {
    if (this.state.sessionLength < 60) {
      this.setState({
        sessionLength: this.state.sessionLength + 1,
        mins: this.state.sessionLength,
        secs: 0
      });
    }
  }

  decSession() {
    if (this.state.sessionLength > 1) {
      this.setState({
        sessionLength: this.state.sessionLength - 1,
        mins: this.state.sessionLength,
        secs: 0
      });
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
    //This line runs once per call of countdown() and decrements secs by 1 every time.
    //If secs is zero, it instead sets secs to 59 and decrements mins by 1.
    this.state.secs > 0 ? this.setState({ secs: this.state.secs - 1 }) : this.setState({secs: 59, mins: this.state.mins - 1});

    //When the timer reaches 0:00, swap the sessionState and set mins to either breakLength or sessionLength, depending on what state we're swapping to.
    if (this.state.secs === 0 && this.state.mins === 0) {
      this.state.sessionState == "session" ? this.setState({sessionState: "break", mins: this.state.breakLength}) : this.setState({sessionState: "session", mins: this.state.sessionLength}); 
    }
  }
  
  

  startCountdown() {
    if (countdownTimer == null) {
      countdownTimer = setInterval(this.countdown, 1000);
    } else {
      clearInterval(countdownTimer);
      countdownTimer = null;
    }
  }

  render() {
    
    return (
      <div className="clock-container">
        <h2 id="timer-label">Session ID</h2>
        <h1 id="time-left">{this.getTimer()}</h1>
        <h3 id="start_stop" onClick={this.startCountdown}>Start/Stop</h3>
        <h3 id="reset">Reset</h3>
        <div className="buttons">
          <SessionButtons className="session-buttons" sessionLength={this.state.sessionLength} incSession={this.incSession} decSession={this.decSession} />
          <BreakButtons className="break-buttons" breakLength={this.state.breakLength} incBreak={this.incBreak} decBreak={this.decBreak} />
        </div>
        
      </div>
    );
  }
}

export default App;

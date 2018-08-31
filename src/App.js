import React, { Component } from 'react';
import './App.css';
import SessionButtons from "./SessionButtons.js";
import BreakButtons from "./BreakButtons.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionState: "paused",
      breakLength: 5,
      sessionLength: 25,
      mins: 25,
      secs: 0
    }

    this.incBreak = this.incBreak.bind(this);
    this.decBreak = this.decBreak.bind(this);
    this.incSession = this.incSession.bind(this);
    this.decSession = this.decSession.bind(this);
    this.getTimer = this.getTimer.bind(this);
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

  render() {
    return (
      <div className="clock-container">
        <h2 id="session-label">Session ID</h2>
        <h1 id="timer">{this.getTimer()}</h1>
        <div className="buttons">
          <SessionButtons className="session-buttons" sessionLength={this.state.sessionLength} incSession={this.incSession} decSession={this.decSession} />
          <BreakButtons className="break-buttons" breakLength={this.state.breakLength} incBreak={this.incBreak} decBreak={this.decBreak} />
        </div>
      </div>
    );
  }
}

export default App;

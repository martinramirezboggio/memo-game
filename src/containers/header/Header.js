import React, { Component } from "react"
import classes from './Header.module.css'

class Header extends Component{
  state = {
    timer : {
      seconds: 0,
      minutes: 0
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    let timer = {}
    timer.seconds = this.state.timer.seconds + 1
    timer.minutes = (Math.floor(this.state.timer.seconds / 60) % 60)
    this.setState({timer: timer})
  }

  formatTime(secs) {
    let hours   = Math.floor(secs / 3600);
    let minutes = Math.floor(secs / 60) % 60;
    let seconds = secs % 60;
    return [hours, minutes, seconds]
      .map(v => ('' + v).padStart(2, '0'))
      .filter((v,i) => v !== '00' || i > 0)
      .join(':');
  }

  render() {
    return(
      <header className={classes.Header}>
        <span className={classes.Timer}>{this.formatTime(this.state.timer.seconds)}</span>
        <span className={classes.Points}>{this.props.points}</span>
      </header>
    )
  }
}

export default Header

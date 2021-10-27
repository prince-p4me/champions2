import React, { Component } from "react";
import { StyleSheet,Text,View,TouchableOpacity } from "react-native";

class TimerScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      timer:null,
      minutes:"00",
      seconds:"00",
      isStarted:false,
      paused:false,
    }
  }

  componentWillUnmount(){
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }
  }

  startTimer=()=>{
    let timer=setInterval(()=>{
      let num=(Number(this.state.seconds)+1).toString();
      let count=this.state.minutes;

      if (Number(this.state.seconds)==59) {
        count=(Number(this.state.minutes)+1).toString();
        num="00";
      }

      this.setState({
        minutes:count.length==1?("0"+count):count,
        seconds:num.length==1?("0"+num):num
      })
    },1000);

    this.setState({timer,isStarted:true});

  }

  toogleTimer=()=>{
    if (!isStarted) {
      this.startTimer();
    } else if (paused) {
      this.setState({paused:false});
      this.startTimer();
    } else {
      this.setState({paused:true});
      this.onStop();
    }
  }

  onStop=()=>{
    clearInterval(this.state.timer);
    this.setState({isStarted:false});
  }

  render(){
    let {minutes,seconds,isStarted,paused}=this.state;
    return(
      <View style={{flex:1}}>
        <Text>{minutes} : {seconds}</Text>

        <TouchableOpacity onPress={this.toogleTimer}
        >
          <Text>{!isStarted?"Start":(paused?"Resume":"Pause")}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.onStop}
        >
          <Text>Stop</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
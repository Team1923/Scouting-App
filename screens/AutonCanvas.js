import React, { Component, useState } from "react";
import { View, Text, Button, Image, ImageBackground, TouchableOpacity } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,

} from "../node_modules/react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Canvas, Path } from "@shopify/react-native-skia";
import ViewShot from 'react-native-view-shot';


export default class AutonDraw extends Component {

  constructor(props){
    super(props)
    this.state = {
      path: [],
      link: ''
      
    }
  }

  captureScreen = () => {
    this.viewShot.capture().then(uri => {
      this.setState({link: uri})
    });
  }

  clearDrawing = () => {
    this.setState({path: []})
  }

  pan=Gesture.Pan()
      .onStart((g) => {

        Temp = this.state.path
        Temp.push("M " + g.x + " " + g.y)
        this.setState({path: Temp})

      })
      .onUpdate((g) => {
        Temp = this.state.path
        Temp[Temp.length-1] += (" L " + g.x + " " + g.y)
        this.setState({path: Temp})
      })
      .minDistance(1)
  
  render(){
    console.log(this.state.link)
    return (

     <GestureHandlerRootView style={{flex:1}}>
      <GestureDetector gesture={this.pan}>

      <ViewShot style={{flex: 1, }} ref={ref => this.viewShot = ref}>
        <ImageBackground style={{flex: 1}} source={require('../assets/FRCArena.png')}>
          <Canvas style={{flex: 1}}>
            {this.state.path.map((p, index) => (
                
                  <Path
                    key={index}
                    path={p}
                    strokeWidth={5}
                    style="stroke"
                    color={"black"}
                  />
                ))}
          </Canvas>
        </ImageBackground>
         
         </ViewShot>
        
     </GestureDetector>
     <View style={{position: 'absolute', padding: 20, marginLeft: 10, flexDirection: 'row'}}>
      <TouchableOpacity onPress={this.captureScreen} style={{ width: 80,backgroundColor: 'white', borderRadius: 7, alignItems: 'center'}}><Text style={{fontSize: 20}}>Save</Text></TouchableOpacity>
      <TouchableOpacity onPress={this.clearDrawing}><Ionicons name="trash" size={27} style={{ marginLeft: 5 }} color='white'/></TouchableOpacity>
      
     </View>
    </GestureHandlerRootView>

 );
  }
  
}
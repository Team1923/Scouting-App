import React, { Component, useState } from "react";
import { View, Text, Button, Image, ImageBackground, TouchableOpacity, Dimensions, StatusBar } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,

} from "../node_modules/react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Canvas, Path } from "@shopify/react-native-skia";
import ViewShot from 'react-native-view-shot';


const currentHeight = Dimensions.get('window').height
const currentWidth = Dimensions.get('window').width
global.Link = "";
export default class AutonDraw extends Component {

  constructor(props){
    super(props)
    this.state = {
      path: [],
      link: ''
      
    }
  } 

   captureScreen = async () => {
    await this.viewShot.capture().then(uri => {
      global.Link = uri;
    });
    this.props.navigation.navigate("ScoutingSheet")
  }

  clearDrawing = () => {
    global.Path = []
    this.setState({path: []})
  }
   
  pan=Gesture.Pan()
      .onStart((g) => {
        global.Path.push(["M " + g.x + " " + g.y]);
        this.setState({path: []})

      })
      .onUpdate((g) => {
        global.Path[global.Path.length-1].push(" L " + g.x + " " + g.y)
        this.setState({path: []})
      })
      .minDistance(1)
    containerStyle = function (options) {
        return {
            flex: 1,
            marginTop: StatusBar.currentHeight,
        }
    }
  render(){
    return (
       <GestureHandlerRootView style={{flex:1, backgroundColor: 'gray'}}>
      <GestureDetector gesture={this.pan}>

        <ImageBackground style={{ flex: 1,height: currentWidth, width: currentHeight }} source={require('../assets/FRCArena.png')}>
        <ViewShot style={{flex: 1}} ref={ref => this.viewShot = ref} options={{result: 'data-uri', format: 'png', width: 100/3, height: 50/3}}>

          <Canvas style={{flex: 1}}>
            {global.Path.map((p, index) => (
                
                  <Path
                    key={index}
                    path={p.join(" ")}
                    strokeWidth={5}
                    style="stroke"
                    color={"black"}
                  />
                ))}
          </Canvas>
          </ViewShot>

        </ImageBackground>
         
        
     </GestureDetector>
     <View style={{position: 'absolute', padding: 20, marginLeft: 10, flexDirection: 'row'}}>
      <TouchableOpacity onPress={this.captureScreen} style={{ width: 80,backgroundColor: 'white', borderRadius: 7, alignItems: 'center'}}><Text style={{fontSize: 20}}>Save</Text></TouchableOpacity>
      <TouchableOpacity onPress={this.clearDrawing}><Ionicons name="trash" size={27} style={{ marginLeft: 5 }} color='white'/></TouchableOpacity>
      
     </View>
    </GestureHandlerRootView>
    

 );
  }
  
}
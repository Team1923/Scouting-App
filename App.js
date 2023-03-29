import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScoutingSheet from './screens/ScoutingSheet';
import QRCodeScanner from './screens/QRCodeScanner';
import Draw from './screens/AutonCanvas';
import {
  GestureHandlerRootView,
} from "./node_modules/react-native-gesture-handler";
const Stack = createNativeStackNavigator();

export default class App extends Component {

  // Initialize Firebase
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name="ScoutingSheet" component={ScoutingSheet} />

          <Stack.Screen name="AutonCanvas" component={Draw} options={{orientation: 'landscape'}}/>


          <Stack.Screen name="QrCodeScanner" component={QRCodeScanner} />



        </Stack.Navigator>
      </NavigationContainer>

    );
  }
}

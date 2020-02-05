/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import LoginScreen from './components/Login';
import HomeScreen from './components/Home';
import SliderScreen from './components/Slider';
import testHomeScreen from './test/testHome';

class App extends React.Component{
  render(){
    return(
      <AppConatiner/>
    );
  }
}

// const AppNavigator = createSwitchNavigator({
//   Home:testHomeScreen
// });
const AppNavigator = createSwitchNavigator({
  Slider:SliderScreen,
  Login:LoginScreen,
  Home:HomeScreen
});

const AppConatiner = createAppContainer(AppNavigator);

export default App;

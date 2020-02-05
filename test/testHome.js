import React from 'react';
import {StyleSheet, View, Text, Button, Alert} from 'react-native';

export default class testHomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.Container}>
       <Text>Home</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
});

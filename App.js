import React from 'react';
//import Home from './src/screens/Home';
import { StyleSheet, Text, View } from 'react-native';
import MyCarousel from './src/screens/Main' 
///import { isMainThread } from 'worker_threads';
 
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MyCarousel />
      </View>
    );
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 
//isMainThread
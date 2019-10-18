<<<<<<< HEAD
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Scheduler from './screens/scheduler'
export default function App() {
  return (
    <Scheduler />
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
=======
import React from 'react'
import { Provider } from 'react-redux'
import store from './store'

import AppNavigator from './navigation/AppNavigator'

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  )
}
>>>>>>> development

import Constants from 'expo-constants';

console.log('fuleteado', Constants.systemFonts);

/**
 * ---------------------------------------------------------------------------------------------------
 * -------------------------------- REACT-NATIVE-THREADS SAMPLE --------------------------------------
 * ---------------------------------------------------------------------------------------------------
 */
import React, {useEffect, useMemo, useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';
import {Thread} from 'react-native-threads';

export default function App() {
  const [message, setMessage] = useState('');

  const thread = useMemo(() => {
    return new Thread('./worker.thread.js');
  }, []);

  const handleMessage = m => {
    console.log('omgggg ssiiisasss', m);
    setMessage(m);
  };

  useEffect(() => {
    thread.onmessage = handleMessage;
  }, [thread]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native Threads!</Text>

      <Button
        title="Send Message To Worker Thread"
        onPress={() => {
          thread.postMessage('Hello');
        }}
      />

      <View>
        <Text>Messages:</Text>
        <Text>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

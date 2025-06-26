import React from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import store from './store';
import { Provider } from 'react-redux';
import ProductView from './products/productView';
import ProductCart from './products/productCart';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <ImageBackground
            source={require('./images/7720186.jpg')}
            style={styles.background}
            resizeMode="cover"
          >
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <Stack.Navigator
              initialRouteName="ProductView"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="ProductView" component={ProductView} />
              <Stack.Screen name="CartScreen" component={ProductCart} />
            </Stack.Navigator>
          </ImageBackground>
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;

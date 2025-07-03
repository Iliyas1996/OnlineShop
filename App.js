import React from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import store from './store';
import ProductView from './products/ProductView';
import ProductCart from './products/ProductCart';

const Tab = createBottomTabNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <NavigationContainer>
        <ImageBackground
          source={require('./images/7720186.jpg')}
          style={styles.background}
          resizeMode="cover"
        >
          <SafeAreaView style={styles.container}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <Tab.Navigator
              screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: { backgroundColor: 'rgba(255, 255, 255, 0.8)' },
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === 'Product List') {
                    iconName = focused ? 'home' : 'home-outline';
                  } else if (route.name === 'Cart') {
                    iconName = focused ? 'cart' : 'cart-outline';
                  }

                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
            >
              <Tab.Screen name="Product List" component={ProductView} />
              <Tab.Screen name="Cart" component={ProductCart} />
            </Tab.Navigator>
          </SafeAreaView>
        </ImageBackground>
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
  },
});

export default App;

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottomTab.tsx';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="app" component={BottomTab} />
    </Stack.Navigator>
  );
}


/*
      <Stack.Screen name="Welcome" component={WelcomeScreen}/>
      <Stack.Screen name="Login" component={LoginPage}/>
 */

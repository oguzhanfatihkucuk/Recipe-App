import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottomTab.tsx';
import WelcomeScreen from "../Screens/WelcomeScreen/WelcomeScreen.tsx";
import LoginPage from "../Screens/LoginPage/LoginPage.tsx";



const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen}/>
      <Stack.Screen name="Login" component={LoginPage}/>
      <Stack.Screen name="app" component={BottomTab} />
    </Stack.Navigator>
  );
}



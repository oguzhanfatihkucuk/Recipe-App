import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottomTab.tsx';
import WelcomeScreen from "../Screens/WelcomeScreen/WelcomeScreen.tsx";
import LoginPage from "../Screens/LoginPage/LoginPage.tsx";
import ZReports from "../Screens/ReportsScreen/Reports/Z-Report.tsx";
import CampaignsScreen from "../Screens/ReportsScreen/Reports/Campaigns.tsx";
import OtherReportScreen from "../Screens/ReportsScreen/Reports/Chart.tsx";
import AddProductScreen from "../Screens/TransectionPage/Trensections/AddProduct.tsx";
import OtherTransectionScreen from "../Screens/TransectionPage/Trensections/Others.tsx";
import ProductsScreen from "../Screens/TransectionPage/Trensections/Products/Products.tsx";
import SalesScreen from "../Screens/TransectionPage/Trensections/Sales/Sales.tsx";
import NFCPage from "../Screens/LoginPage/nfc.tsx";
import AllProducts from "../Screens/TransectionPage/Trensections/Products/allprodcuts.tsx";
import UserInformationScreen from "../Screens/ReportsScreen/Reports/UserList.tsx";



const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="Welcome" component={WelcomeScreen}/>
      <Stack.Screen name="Login" component={LoginPage}/>
      <Stack.Screen name="app" component={BottomTab} />
      <Stack.Screen name="User Information Screen" component={UserInformationScreen} options={{headerShown:true}}/>
      <Stack.Screen name="Z-Report" component={ZReports} options={{headerShown:true}}/>
      <Stack.Screen name="Campaings" component={CampaignsScreen} options={{headerShown:true}}/>
      <Stack.Screen name="Charts" component={OtherReportScreen} options={{headerShown:true}}/>
      <Stack.Screen name="AddProduct" component={AddProductScreen} options={{headerShown:true}}/>
      <Stack.Screen name="OtherTrans" component={OtherTransectionScreen} options={{headerShown:true}}/>
      <Stack.Screen name="Products" component={ProductsScreen} options={{headerShown:true}}/>
      <Stack.Screen name="Sales" component={SalesScreen} options={{headerShown:true}}/>
      <Stack.Screen name="NFCPage" component={NFCPage} />
      <Stack.Screen name="AllProducts" component={AllProducts} options={{headerShown:true}}/>
    </Stack.Navigator>
  );
}



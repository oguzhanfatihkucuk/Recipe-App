import React, { useContext } from "react";
import {  StyleSheet, View } from "react-native";
import { useStoreStatus } from '../../../services/storeSituation/StoreStatusContext';
import { Icon } from "react-native-paper";
import DeviceInfo from "react-native-device-info";
import DarkMode from "../../../services/utils/darkmode.context";
import { Text } from "../../../services/utils/Theme";
const StoreStatusText = () => {

  const { isStoreOpen } = useStoreStatus();

  let readableVersion = DeviceInfo.getReadableVersion();
  let systemVersion = DeviceInfo.getSystemVersion();
  const { isDarkMode} = useContext(DarkMode);

  return (
    <View style={styles.container}>

     <View>
       <Text isDarkMode={isDarkMode} style={{...styles.text,justifyContent:"center"}}>
         App Version: {readableVersion}
       </Text>
       <Text isDarkMode={isDarkMode} style={{...styles.text,justifyContent:"flex-start"}}>
         System Version: {systemVersion}
       </Text>
     </View>
      <View style={{flexDirection:"row"}}>
        <Text isDarkMode={isDarkMode} style={styles.text}>
          {isStoreOpen ? 'Mağaza Açık' : 'Mağaza Kapalı'}
        </Text>
        <Icon size={24} source={isStoreOpen?"check-circle":"close-circle"} color={isStoreOpen?"green":"red"}/>
      </View>

    </View>

  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: 'black',
  },
  container: {
    flexDirection:"row",
    justifyContent:"space-between"
  }

});

export default StoreStatusText;

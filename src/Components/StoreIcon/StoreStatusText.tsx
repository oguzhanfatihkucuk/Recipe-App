import React from 'react';
import { Text, StyleSheet, View } from "react-native";
import { useStoreStatus } from '../../../services/storeSituation/StoreStatusContext';
import { Icon } from "react-native-paper";
const StoreStatusText = () => {
  const { isStoreOpen } = useStoreStatus();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {isStoreOpen ? 'Mağaza Açık' : 'Mağaza Kapalı'}
      </Text>
      <Icon size={24} source={isStoreOpen?"check-circle":"close-circle"} color={isStoreOpen?"green":"red"}/>
    </View>

  );
};

const styles = StyleSheet.create({
  text: {

    fontSize: 16,
    color: 'black',
  }, container: {
    flexDirection:"row",
    justifyContent:"flex-end"
  }

});

export default StoreStatusText;

import React, {} from "react";
import { Alert, Button, FlatList, SafeAreaView, Text, View } from "react-native";
import { reports, reportsOffline } from "../../../../assets/js/reports";

const ZReports = () => {
  //@ts-ignore
  const renderItem = ({ item, index }) => {
    const onPressButton = () => {
      Alert.alert('Rapor', `Rapor ${index + 1}: ${item}`);
    };

    return (
      <View style={{ marginVertical: 5, flexDirection: 'row' }}>
        <Button title={`Rapor ${index + 1}`} onPress={onPressButton} />
      </View>
    );
  };

  // @ts-ignore
  return (
    <SafeAreaView>
      <View style={{flexDirection:"row"}}>
        <Text>
          Printed Recipes
        </Text>
        <FlatList
          data={reports}
          style={{margin:20}}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <Text>
          Haven't Printed Recipes
        </Text>
        <FlatList
          data={reportsOffline}
          style={{margin:20}}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};


export default ZReports;

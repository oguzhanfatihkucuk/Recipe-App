import React, {} from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const OtherReportScreen = () => {

  const navigation = useNavigation();
  // @ts-ignore
  return (
    <SafeAreaView>
      <View>
        <Text>other</Text>
      </View>
    </SafeAreaView>
  );
};


export default OtherReportScreen;

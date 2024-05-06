import React, {} from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CampaignsScreen = () => {

  const navigation = useNavigation();
  // @ts-ignore
  return (
    <SafeAreaView>
      <View>
        <Text>campaing</Text>
      </View>
    </SafeAreaView>
  );
};


export default CampaignsScreen;

import React, { useContext } from "react";
import { SafeAreaView, View } from "react-native";
import { Text } from "../../utils/Theme.tsx";
import DarkMode from "../../utils/darkmode.context.ts";
// @ts-ignore
const Category = () => {

  const { isDarkMode} =
    useContext(DarkMode);

  return (
    <SafeAreaView>
        <View>
          <Text isDarkMode={isDarkMode}>
            Category Page
          </Text>
        </View>
    </SafeAreaView>
  );


};
//<FlatList data={data} renderItem={renderProduct}/>
export default Category;

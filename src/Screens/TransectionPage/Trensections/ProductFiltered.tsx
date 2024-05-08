import React, { useState } from "react";
import { FlatList, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Button, List, TextInput } from "react-native-paper";
import ProductCard from "../../../Components/productcard.tsx";
import products from "../../../../Assets/product";

const ProductFiltered = () => {

  const [categoryTerm, setcategoryTerm] = useState("");
  const filteredAsCT = products.filter((item) => item.category.toLowerCase().startsWith(categoryTerm.toLowerCase()));

  // @ts-ignore
  return (
    <SafeAreaView>

        <List.Section >
          <List.Accordion
            title="Choose Category"
            left={props => <List.Icon {...props} icon="folder" />}>
            <List.Item title="Clothing" onPress={()=>{setcategoryTerm("clothing")}}/>
            <List.Item title="accessories" onPress={()=>{setcategoryTerm("accessories")}}/>
            <List.Item title="home" onPress={()=>{setcategoryTerm("home")}}/>
            <List.Item title="kitchen" onPress={()=>{setcategoryTerm("kitchen")}}/>
            <List.Item title="food" onPress={()=>{setcategoryTerm("food")}}/>
          </List.Accordion>
        </List.Section>
        <View>
          <Text>
            {categoryTerm}
          </Text>
          <FlatList
            data={filteredAsCT}
            renderItem={({ item }) => (
              <View style={{ flexDirection: "row" }}>
                <ProductCard product={item} />
              </View>
            )}
            numColumns={3}
            keyExtractor={(item) => item.id.toString()} />
        </View>

    </SafeAreaView>
  );
};


export default ProductFiltered;

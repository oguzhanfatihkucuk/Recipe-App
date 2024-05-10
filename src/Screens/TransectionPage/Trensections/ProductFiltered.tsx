import React, { useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import {  List,} from "react-native-paper";
import ProductCard from "../../../Components/productcard.tsx";
import API_URL from "../../../../Assets/api";


const ProductFiltered = () => {

  const [data2, setData] = useState<any[]>([]);
  const [categoryTerm, setcategoryTerm] = useState("");
  const filteredAsCT = data2.filter((item) => item.category.toLowerCase().startsWith(categoryTerm.toLowerCase()));

  let data;
  let id: any[],price: any[], category: any[],description:any[];
  const fetchMockBackendData = async () => {

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      data = await response.json();
      setData(data);

      id = data.map((user: any) => user.id);
      price = data.map((user: any) => user.price);
      category=data.map((user:any)=>user.category);
      description=data.map((user:any)=>user.description);

      return data;
    } catch (error) {
      console.error("Error fetching mock backend data:", error);
      return null;
    }
  };
  // @ts-ignore
  return (
    <SafeAreaView>

        <List.Section >
          <List.Accordion
            onPress={fetchMockBackendData}
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
            {categoryTerm} {filteredAsCT.length} items found
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

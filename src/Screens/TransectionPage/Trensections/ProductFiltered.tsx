import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import {  List,} from "react-native-paper";
import ProductCard from "../../../Components/ProductCard/productcard.tsx";
import API_URL from "../../../../assets/js/api";
import LoadingAnimation from "../../../Components/Loading/Loading.tsx";
import { getNumColumns } from '../../../../assets/js/deviceutils'; // DeviceUtils.js dosyasını içe aktarın

const ProductFiltered = () => {

  const numColumns = getNumColumns();
  useEffect(() => {
    fetchMockBackendData(); // Call the function on component mount
  }, []);

  const [data2, setData] = useState<any[]>([]);
  const [categoryTerm, setcategoryTerm] = useState("");
  const filteredAsCT = data2.filter((item) => item.category.toLowerCase().startsWith(categoryTerm.toLowerCase()));
  const [loading, setLoading] = useState(true);

  let data;

  const fetchMockBackendData = async () => {

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      data = await response.json();
      setData(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.error("Error fetching mock backend data:", error);
      return null;
    }
  };

  if (loading) {
    return <LoadingAnimation />;
  }
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
            {categoryTerm} {filteredAsCT.length} items found
          </Text>
          <FlatList
            data={filteredAsCT}
            renderItem={({ item }) => (
              <View style={{ flexDirection: "row" }}>
                <ProductCard product={item} />
              </View>
            )}
            numColumns={numColumns}
            keyExtractor={(item) => item.id.toString()} />
        </View>

    </SafeAreaView>
  );
};


export default ProductFiltered;

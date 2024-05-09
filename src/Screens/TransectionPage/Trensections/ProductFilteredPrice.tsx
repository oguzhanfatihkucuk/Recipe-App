import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import products from "../../../../Assets/product";
import { List } from "react-native-paper";
import ProductCard from "../../../Components/productcard.tsx";

const ProductFilteredPrice = () => {

  const [pricTerm, setpricTerm] = useState(0);
  const filteredAsPR = products.filter((item) => {
    const itemPrice = item.price; // Extract the price from the product item

    switch (pricTerm) {
      case 0:
        return itemPrice >= 0;
      case 1:
        return itemPrice >= 0 && itemPrice <= 10;
      case 2:
        return itemPrice >= 10 && itemPrice <= 50;
      case 3:
        return itemPrice >= 50 && itemPrice <= 100;
      case 4:
        return itemPrice >= 100 && itemPrice <= 500;
      case 5:
        return itemPrice >= 500 ;
      default:
        return false;
    }
  });
  // @ts-ignore
  return (

      <View>
        <List.Section >
          <List.Accordion
            title="Choose Price Range"
            left={props => <List.Icon {...props} icon="folder" />}>
            <List.Item title="0-10" onPress={()=>{setpricTerm(1)}}/>
            <List.Item title="10-50" onPress={()=>{setpricTerm(2)}}/>
            <List.Item title="50-100" onPress={()=>{setpricTerm(3)}}/>
            <List.Item title="100-500" onPress={()=>{setpricTerm(4)}}/>
            <List.Item title="500-" onPress={()=>{setpricTerm(5)}}/>
          </List.Accordion>
        </List.Section>
        <Text>
          {filteredAsPR.length} items found
        </Text>
        <FlatList
          data={filteredAsPR}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row" }}>
              <ProductCard product={item} />
            </View>
          )}
          numColumns={3}
          keyExtractor={(item) => item.id.toString()} />
      </View>

  );
};


export default ProductFilteredPrice;

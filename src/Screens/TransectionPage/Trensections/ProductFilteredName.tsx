import React, { useState } from "react";
import { FlatList, View } from "react-native";
import products from "../../../../Assets/product";
import { List } from "react-native-paper";
import ProductCard from "../../../Components/productcard.tsx";


const ProductFilteredName = () => {

  const [nameTerm, setnameTerm] = useState(99);
  const filteredAsNM = products.filter((item) => {
    const itemName = item.title.toLowerCase();
    const firstLetter = itemName[0];

    switch (nameTerm) {
      case 0:
        return firstLetter >= "a" && firstLetter <= "e";
      case 1:
        return firstLetter >= "f" && firstLetter <= "j";
      case 2:
        return firstLetter >= "k" && firstLetter <= "o";
      case 3:
        return firstLetter >= "p" && firstLetter <= "q";
      case 4:
        return firstLetter >= "r" && firstLetter <= "v";
      case 5:
        return firstLetter >= "w" && firstLetter <= "z";
      case 99:
        return firstLetter >= "a" && firstLetter <= "z";
      default:
        return false;
    }
  });
  // @ts-ignore
  return (

    <View>
      <List.Section >
        <List.Accordion
          title="Choose First Letter Range "
          left={props => <List.Icon {...props} icon="folder" />}>
          <List.Item title="A-E" onPress={()=>{setnameTerm(0)}}/>
          <List.Item title="F-J" onPress={()=>{setnameTerm(1)}}/>
          <List.Item title="K-O" onPress={()=>{setnameTerm(2)}}/>
          <List.Item title="P-Q" onPress={()=>{setnameTerm(3)}}/>
          <List.Item title="R-V" onPress={()=>{setnameTerm(4)}}/>
          <List.Item title="W-Z" onPress={()=>{setnameTerm(5)}}/>

        </List.Accordion>
      </List.Section>
      <FlatList
        data={filteredAsNM}
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


export default ProductFilteredName;

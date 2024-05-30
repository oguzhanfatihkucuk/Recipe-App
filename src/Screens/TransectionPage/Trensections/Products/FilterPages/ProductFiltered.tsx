import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import {  List,} from "react-native-paper";
import ProductCard from "../../../../../Components/ProductCard/productcard.tsx";
import LoadingAnimation from "../../../../../Components/Loading/Loading.tsx";
import { getNumColumns } from '../../../../../../assets/js/deviceutils';
import { fetchMockBackendData } from "../../../../../../services/fetchingData/fetchData";
import StoreStatusText from "../../../../../Components/StoreIcon/StoreStatusText.tsx"; // DeviceUtils.js dosyasını içe aktarın


const ProductFiltered = () => {

  const numColumns = getNumColumns();


  useEffect(() => {
    setLoading(false); // Call the function on component mount
  }, []);

  const [data2, setData] = useState<any[]>([]);
  const [categoryTerm, setcategoryTerm] = useState("");
  const filteredAsCT = data2.filter((item) => item.category.toLowerCase().startsWith(categoryTerm.toLowerCase()));
  const [loading, setLoading] = useState(true);

  let data;
  const ProductCardMemoized = React.memo(ProductCard);
  const fetchDataFromMockBackend = async () => {
    try {
      data = await fetchMockBackendData();
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  //@ts-ignore
  const handleCategoryPress = (category) => {
    setcategoryTerm(category);
    setLoading(true);
    fetchDataFromMockBackend();
  };
  // @ts-ignore
  return (
    <SafeAreaView>
      <StoreStatusText />
      <List.Section>
        <List.Accordion
          title="Choose Category"
          left={props => <List.Icon {...props} icon="folder" />}
        >
          {[
            { title: "Clothing", category: "clothing" },
            { title: "Accessories", category: "accessories" },
            { title: "Home", category: "home" },
            { title: "Kitchen", category: "kitchen" },
            { title: "Food", category: "food" }
          ].map(item => (
            <List.Item
              key={item.category}
              title={item.title}
              onPress={() => handleCategoryPress(item.category)}
            />
          ))}
        </List.Accordion>
      </List.Section>
        <View>
          <Text>
            {categoryTerm} {filteredAsCT.length} items found
          </Text>
          {loading ? (
            // isLoading true ise yükleme bileşenini döndür
            <LoadingAnimation />
          ) : (
            // isLoading false ise FlatList bileşenini döndür
            <FlatList
              data={filteredAsCT}
              renderItem={({ item }) => (
                <View style={{ flexDirection: "row" }}>
                  <ProductCardMemoized product={item} handleRefresh={()=>{}}/>
                </View>
              )}
              numColumns={numColumns}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
        </View>

    </SafeAreaView>
  );
};


export default ProductFiltered;

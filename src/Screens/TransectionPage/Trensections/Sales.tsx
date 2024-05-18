import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import API_URL from "../../../../assets/js/api";
import LoadingAnimation from "../../../Components/Loading/Loading.tsx";
import ProductCard from "../../../Components/ProductCard/productcard.tsx";
import {myTuple} from "../../../../assets/js/myTuple";

const SalesScreen = () => {
  const [data2, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const filteredAsSaleList = data2.filter((item) => {
    return myTuple.includes(item.id);
  });

  const handlePress = () => {
    myTuple.length = 0;
    setData([]);
  };
  const ProductCardMemoized = React.memo(ProductCard);
  useEffect(() => {
    fetchMockBackendData(); // Call the function on component mount
  }, []);
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
      <View style={{flexDirection:"row"}}>
        <TouchableOpacity onPress={handlePress}>
          <Text>
            Satıs Onayla
          </Text>
        </TouchableOpacity>
        <FlatList
          horizontal={false}  // Enable horizontal scrolling
          data={filteredAsSaleList}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row" }}>
              <ProductCardMemoized  product={item} />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}

        />
      </View>
    </SafeAreaView>
  );
};


export default SalesScreen;

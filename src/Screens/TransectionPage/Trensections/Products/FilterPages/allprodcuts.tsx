import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View, Text, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import ProductCard from "../../../../../Components/ProductCard/productcard.tsx";
import LoadingAnimation from "../../../../../Components/Loading/Loading.tsx";
import { getNumColumns } from '../../../../../../assets/js/deviceutils';
import { fetchMockBackendData } from "../../../../../../services/fetchingData/fetchData";
import StoreStatusText from "../../../../../Components/StoreIcon/StoreStatusText.tsx";

const AllProducts = () => {
  const numColumns = getNumColumns();

  useEffect(() => {
    fetchDataFromMockBackend(); // Call the function on component mount
  }, []);

  const [data2, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("alphabetically");

  const fetchDataFromMockBackend = async () => {
    try {
      const data = await fetchMockBackendData();
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const sortedData = (() => {
    switch (sortOption) {
      case "priceLowToHigh":
        return data2.slice().sort((a, b) => a.price - b.price);
      case "priceHighToLow":
        return data2.slice().sort((a, b) => b.price - a.price);
      case "alphabetically":
        return data2.slice().sort((a, b) => {
          const nameA = a.title ? a.title.toLowerCase() : "";
          const nameB = b.title ? b.title.toLowerCase() : "";
          return nameA.localeCompare(nameB);
        });
      case "alphabeticallyDesc":
        return data2.slice().sort((a, b) => {
          const nameA = a.title ? a.title.toLowerCase() : "";
          const nameB = b.title ? b.title.toLowerCase() : "";
          return nameB.localeCompare(nameA);
        });
      default:
        return data2;
    }
  })();

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <SafeAreaView>
      <StoreStatusText />
      <View>
        <View style={{flexDirection:"row"}}>
          <Picker
          selectedValue={sortOption}
          style={styles.picker}
          onValueChange={(itemValue) => setSortOption(itemValue)}
        >
          <Picker.Item label="Price: Low to High" value="priceLowToHigh" />
          <Picker.Item label="Price: High to Low" value="priceHighToLow" />
        </Picker>
          <Picker
            selectedValue={sortOption}
            style={styles.picker}
            onValueChange={(itemValue) => setSortOption(itemValue)}
          >
            <Picker.Item label="Alphabetically: A-Z" value="alphabetically" />
            <Picker.Item label="Alphabetically: Z-A" value="alphabeticallyDesc" />
          </Picker>
        </View>
        <FlatList
          data={sortedData}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row" }}>
              <ProductCard product={item} handleRefresh={() => { }} />
            </View>
          )}
          numColumns={numColumns}
          keyExtractor={(item) => item.id.toString()} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 50,
    width: '25%',
    marginVertical: 10,
  }
});

export default AllProducts;

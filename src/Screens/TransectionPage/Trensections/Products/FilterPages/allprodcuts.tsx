import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View, Text, StyleSheet,} from "react-native";
import { Picker } from "@react-native-picker/picker";
import ProductCard from "../../../../../Components/ProductCard/productcard.tsx";
import LoadingAnimation from "../../../../../Components/Loading/Loading.tsx";
import { getNumColumns } from "../../../../../../assets/js/deviceutils";
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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceTerm, setPriceTerm] = useState(0);
  const [selectedLetterRange, setSelectedLetterRange] = useState("a-z");

  const fetchDataFromMockBackend = async () => {
    try {
      const data = await fetchMockBackendData();
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filteredByCategory = selectedCategory
    ? data2.filter((item) => item.category.toLowerCase() === selectedCategory.toLowerCase())
    : data2;

  const filteredByPrice = filteredByCategory.filter((item) => {
    const itemPrice = item.price;

    switch (priceTerm) {
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
        return itemPrice >= 500;
      default:
        return false;
    }
  });

  const filteredByLetterRange = selectedLetterRange
    ? filteredByPrice.filter((item) => {
      const itemTitle = item.title.toLowerCase();
      const [start, end] = selectedLetterRange.split("-");
      return itemTitle >= start && itemTitle <= end;
    })
    : filteredByPrice;

  const sortedData = (() => {
    switch (sortOption) {
      case "priceLowToHigh":
        return filteredByLetterRange.slice().sort((a, b) => a.price - b.price);
      case "priceHighToLow":
        return filteredByLetterRange.slice().sort((a, b) => b.price - a.price);
      case "alphabetically":
        return filteredByLetterRange.slice().sort((a, b) => {
          const nameA = a.title ? a.title.toLowerCase() : "";
          const nameB = b.title ? b.title.toLowerCase() : "";
          return nameA.localeCompare(nameB);
        });
      case "alphabeticallyDesc":
        return filteredByLetterRange.slice().sort((a, b) => {
          const nameA = a.title ? a.title.toLowerCase() : "";
          const nameB = b.title ? b.title.toLowerCase() : "";
          return nameB.localeCompare(nameA);
        });
      default:
        return filteredByLetterRange;
    }
  })();

  if (loading) {
    return <LoadingAnimation />;
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StoreStatusText />
      <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10 }}>
        <Picker
          selectedValue={selectedCategory}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        >
          <Picker.Item label="All Categories" value="" />
          <Picker.Item label="Clothing" value="clothing" />
          <Picker.Item label="Accessories" value="accessories" />
          <Picker.Item label="Home" value="home" />
          <Picker.Item label="Kitchen" value="kitchen" />
          <Picker.Item label="Food" value="food" />
        </Picker>

        <Picker
          selectedValue={priceTerm}
          style={styles.picker}
          onValueChange={(itemValue) => setPriceTerm(itemValue)}
        >
          <Picker.Item label="All Prices" value={0} />
          <Picker.Item label="0 - 10" value={1} />
          <Picker.Item label="10 - 50" value={2} />
          <Picker.Item label="50 - 100" value={3} />
          <Picker.Item label="100 - 500" value={4} />
          <Picker.Item label="500+" value={5} />
        </Picker>
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
        <Picker
          selectedValue={selectedLetterRange}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedLetterRange(itemValue)}
        >
          <Picker.Item label="A-E" value="a-e" />
          <Picker.Item label="F-J" value="f-j" />
          <Picker.Item label="K-O" value="k-o" />
          <Picker.Item label="P-Q" value="p-q" />
          <Picker.Item label="R-V" value="r-v" />
          <Picker.Item label="W-Z" value="w-z" />
          <Picker.Item label="Show All Letter Range" value="a-z" />
        </Picker>
      </View>
      <Text style={styles.itemCountText}>{`${sortedData.length} items found`}</Text>
      <FlatList
        data={sortedData}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row" }}>
            <ProductCard product={item} handleRefresh={() => {
            }} />
          </View>
        )}
        numColumns={numColumns}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 50,
    width: "20%",
    marginVertical: 10
  },
  itemCountText: {
    fontSize: 16,
    fontWeight: "bold"
  }
});

export default AllProducts;

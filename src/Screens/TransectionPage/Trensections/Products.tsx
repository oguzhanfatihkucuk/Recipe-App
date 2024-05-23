import React, { useContext, useEffect, useState } from "react";
import { View, FlatList, Text, SafeAreaView, ScrollView} from "react-native";
import ProductCard from "../../../Components/ProductCard/productcard.tsx";
import {SegmentedButtons, TextInput } from "react-native-paper";  // Import your product card component
import API_URL from "../../../../assets/js/api";
import LoadingAnimation from "../../../Components/Loading/Loading.tsx";
import DarkMode from "../../../../services/utils/darkmode.context.ts";
import { fetchMockBackendData } from "../../../../services/fetchingData/fetchData";

//@ts-ignore
const ProductsScreen = ({ navigation }) => {


  const [data2, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredAsFL = data2.filter((item) => item.title.toLowerCase().startsWith(searchTerm.toLowerCase()));
  const { isDarkMode} = useContext(DarkMode);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDataFromMockBackend(); // Call the function on component mount
  }, []);

  const ProductCardMemoized = React.memo(ProductCard);
  let data;
  const fetchDataFromMockBackend = async () => {
    try {
      data = await fetchMockBackendData();
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // @ts-ignore
  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <SegmentedButtons
          style={{ marginTop: 15 }}
          value={""}
          onValueChange={() => {
          }}
          buttons={
            [
              {
                value: "Category",
                label: "Category",
                labelStyle: { color: isDarkMode ? "white" : "black" },
                onPress: () => {
                  navigation.navigate("ProductFiltered");
                }
              },
              {
                value: "Price",
                label: "Cost",
                labelStyle: { color: isDarkMode ? "white" : "black" },
                onPress: () => {
                  navigation.navigate("ProductFilteredPrice");
                }
              },
              {
                value: "Name",
                label: "Name",
                labelStyle: { color: isDarkMode ? "white" : "black" },
                onPress: () => {
                  navigation.navigate("ProductFilteredName");
                }
              }
            ]}
        />
        <TextInput
          onChangeText={(e) => setSearchTerm(e)}
          placeholder="Search products..."
          style={{ backgroundColor: "transparent" }}
          value={searchTerm}
        />
        <View>
          {searchTerm ? (<View>
            <Text>
              {filteredAsFL.length} items found
            </Text>
            <FlatList
              horizontal={true}  // Enable horizontal scrolling
              data={filteredAsFL}
              renderItem={({ item }) => (
                <View style={{ flexDirection: "row" }}>
                  <ProductCardMemoized  product={item} />
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>) : (<><View>
            {data2.length > 1 && (
              <Text style={{fontSize:24,margin:5,fontStyle:"italic"}}>Favorites {data2.filter((item) => item.title.toLowerCase().startsWith("b")).length} item found</Text>
            )}
            <FlatList
              horizontal={true} // Enable horizontal scrolling
              data={data2.filter((item) => item.title.toLowerCase().startsWith("b"))}
              renderItem={({ item }) => (
                <View style={{ flexDirection: "row" }}>
                  <ProductCardMemoized  product={item} />
                </View>
              )}
              keyExtractor={(item) => item.id.toString()} />
          </View>
            <View>
              {data2.length > 1 && (
                <Text style={{fontSize:24,margin:5,fontStyle:"italic"}}>
                  Hot Deals {data2.filter((item) => item.title.toLowerCase().startsWith("c")).length} item found
                </Text>
              )}
              <FlatList
                horizontal={true} // Enable horizontal scrolling
                data={data2.filter((item) => item.title.toLowerCase().startsWith("c"))}
                renderItem={({ item }) => (
                  <View style={{ flexDirection: "row" }}>
                    <ProductCardMemoized  product={item} />
                  </View>
                )}
                keyExtractor={(item) => item.id.toString()} />
            </View>
            <View>
              {data2.length > 1 && (
                <Text style={{fontSize:24,margin:5,fontStyle:"italic"}}>
                  Campaings {data2.filter((item) => item.title.toLowerCase().startsWith("d")).length} item found
                </Text>
              )}
              <FlatList
                horizontal={true} // Enable horizontal scrolling
                data={data2.filter((item) => item.title.toLowerCase().startsWith("d"))}
                renderItem={({ item }) => (
                  <View style={{ flexDirection: "row" }}>
                    <ProductCardMemoized  product={item} />
                  </View>
                )}
                keyExtractor={(item) => item.id.toString()} />
            </View>

            <View>
              {data2.length > 1 && (
                <Text style={{fontSize:24,margin:5,fontStyle:"italic"}}>
                  2 buy 1 pay {data2.filter((item) => item.title.toLowerCase().startsWith("e")).length} item found
                </Text>
              )}
              <FlatList
                horizontal={true} // Enable horizontal scrolling
                data={data2.filter((item) => item.title.toLowerCase().startsWith("e"))}
                renderItem={({ item }) => (
                  <View style={{ flexDirection: "row" }}>
                    <ProductCardMemoized  product={item} />
                  </View>
                )}
                keyExtractor={(item) => item.id.toString()} />
            </View>
          </>)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


export default ProductsScreen;

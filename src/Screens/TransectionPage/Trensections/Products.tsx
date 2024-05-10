import React, { useContext, useEffect, useState } from "react";
import { View, FlatList, Text, SafeAreaView, ScrollView, Alert } from "react-native";
import ProductCard from "../../../Components/ProductCard/productcard.tsx";
import { Button, SegmentedButtons, TextInput } from "react-native-paper";  // Import your product card component
import API_URL from "../../../../Assets/api";
import LoadingAnimation from "../../../Components/Loading/Loading.tsx";
import DarkMode from "../../../../services/utils/darkmode.context.ts";


//@ts-ignore
const ProductsScreen = ({ navigation }) => {

  const [data2, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredAsFL = data2.filter((item) => item.title.toLowerCase().startsWith(searchTerm.toLowerCase()));
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMockBackendData(); // Call the function on component mount
  }, []);

  let data;
  let id: any[], price: any[], category: any[], description: any[];
  const fetchMockBackendData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      data = await response.json();
      setData(data);
      setLoading(false);
      id = data.map((user: any) => user.id);
      price = data.map((user: any) => user.price);
      category = data.map((user: any) => user.category);
      description = data.map((user: any) => user.description);

      return data;
    } catch (error) {
      console.error("Error fetching mock backend data:", error);
      return null;
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
                value: "English",
                label: "Category",
                labelStyle: { color: isDarkMode ? "white" : "black" },
                onPress: () => {
                  navigation.navigate("ProductFiltered");
                }
              },
              {
                value: "Türkçe",
                label: "Price",
                labelStyle: { color: isDarkMode ? "white" : "black" },
                onPress: () => {
                  navigation.navigate("ProductFilteredPrice");
                }
              },
              {
                value: "Deustch",
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
                  <ProductCard product={item} />
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>) : (<><View>
            {data2.length > 1 && (
              <Text>Favorites {data2.length} item found</Text>
            )}
            <FlatList
              horizontal={true} // Enable horizontal scrolling
              data={data2}
              renderItem={({ item }) => (
                <View style={{ flexDirection: "row" }}>
                  <ProductCard product={item} />
                </View>
              )}
              keyExtractor={(item) => item.id.toString()} />
          </View>
            <View>
              {data2.length > 1 && (
                <Text>
                  Hot Deals {data2.length} item found
                </Text>
              )}
              <FlatList
                horizontal={true} // Enable horizontal scrolling
                data={data2}
                renderItem={({ item }) => (
                  <View style={{ flexDirection: "row" }}>
                    <ProductCard product={item} />
                  </View>
                )}
                keyExtractor={(item) => item.id.toString()} />
            </View>
            <View>
              {data2.length > 1 && (
                <Text>
                  Campaings {data2.length} item found
                </Text>
              )}
              <FlatList
                horizontal={true} // Enable horizontal scrolling
                data={data2}
                renderItem={({ item }) => (
                  <View style={{ flexDirection: "row" }}>
                    <ProductCard product={item} />
                  </View>
                )}
                keyExtractor={(item) => item.id.toString()} />
            </View>

            <View>
              {data2.length > 1 && (
                <Text>
                  2 buy 1 pay {data2.length} item found
                </Text>
              )}
              <FlatList
                horizontal={true} // Enable horizontal scrolling
                data={data2}
                renderItem={({ item }) => (
                  <View style={{ flexDirection: "row" }}>
                    <ProductCard product={item} />
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

import React, { useEffect, useState } from "react";
import { View, FlatList, Text, SafeAreaView, ScrollView, Button } from "react-native";
import ProductCard from "../../../../Components/ProductCard/productcard.tsx";
import { TextInput } from "react-native-paper";
import LoadingAnimation from "../../../../Components/Loading/Loading.tsx";
import { fetchMockBackendData } from "../../../../../services/fetchingData/fetchData";
import styles from "./Products.Style.tsx";
import StoreStatusText from "../../../../Components/StoreIcon/StoreStatusText.tsx";
//@ts-ignore
const ProductsScreen = ({ navigation }) => {

  const [data2, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredAsFL = data2.filter((item) => item.title.toLowerCase().startsWith(searchTerm.toLowerCase()));
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
      console.error("Error fetching data:", error);
    }
  };

  // @ts-ignore
  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <SafeAreaView>
      <StoreStatusText />
      <ScrollView>
        <Button title={"See all Products"} onPress={() => navigation.navigate("AllProducts")} />
        <TextInput
          onChangeText={(e) => setSearchTerm(e)}
          placeholder="Search products..."
          style={{ backgroundColor: "transparent" }}
          value={searchTerm}
        />
        <View style={{ flex: 1 }}>
          {searchTerm ? (<View>
            <Text>
              {filteredAsFL.length} items found
            </Text>
            <FlatList
              horizontal={true}  // Enable horizontal scrolling
              data={filteredAsFL}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <ProductCardMemoized product={item} handleRefresh={()=>{}}/>
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>) : (<><View>
            {data2.length > 1 && (
              <Text
                style={styles.headerText}>Favorites {data2.filter((item) => item.title.toLowerCase().startsWith("b")).length} item
                found</Text>
            )}
            <FlatList
              horizontal={true} // Enable horizontal scrolling
              data={data2.filter((item) => item.title.toLowerCase().startsWith("b"))}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <ProductCardMemoized product={item} handleRefresh={()=>{}} />
                </View>
              )}
              keyExtractor={(item) => item.id.toString()} />
          </View>
            <View>
              {data2.length > 1 && (
                <Text style={styles.headerText}>
                  Hot Deals {data2.filter((item) => item.title.toLowerCase().startsWith("c")).length} item found
                </Text>
              )}
              <FlatList
                horizontal={true} // Enable horizontal scrolling
                data={data2.filter((item) => item.title.toLowerCase().startsWith("c"))}
                renderItem={({ item }) => (
                  <View style={styles.card}>
                    <ProductCardMemoized product={item} handleRefresh={()=>{}}/>
                  </View>
                )}
                keyExtractor={(item) => item.id.toString()} />
            </View>
            <View>
              {data2.length > 1 && (
                <Text style={styles.headerText}>
                  Campaigns {data2.filter((item) => item.title.toLowerCase().startsWith("d")).length} item found
                </Text>
              )}
              <FlatList
                horizontal={true} // Enable horizontal scrolling
                data={data2.filter((item) => item.title.toLowerCase().startsWith("d"))}
                renderItem={({ item }) => (
                  <View style={styles.card}>
                    <ProductCardMemoized product={item} handleRefresh={()=>{}}/>
                  </View>
                )}
                keyExtractor={(item) => item.id.toString()} />
            </View>

            <View>
              {data2.length > 1 && (
                <Text style={styles.headerText}>
                  2 buy 1 pay {data2.filter((item) => item.title.toLowerCase().startsWith("e")).length} item found
                </Text>
              )}
              <FlatList
                horizontal={true} // Enable horizontal scrolling
                data={data2.filter((item) => item.title.toLowerCase().startsWith("e"))}
                renderItem={({ item }) => (
                  <View style={styles.card}>
                    <ProductCardMemoized product={item} handleRefresh={()=>{}}/>
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

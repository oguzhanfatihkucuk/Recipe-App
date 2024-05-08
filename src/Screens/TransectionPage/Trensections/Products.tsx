import React, {  useState } from "react";
import { View, FlatList, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import products from "../../../../Assets/product";  // Import your product data
import ProductCard from "../../../../src/Components/productcard.tsx";
import { Button, Divider, TextInput } from "react-native-paper";  // Import your product card component
import { List } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import ProductFiltered from "./ProductFiltered.tsx";
const ProductsScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredAsFL = products.filter((item) => item.title.toLowerCase().startsWith(searchTerm.toLowerCase()));
  const navigation = useNavigation();
  // @ts-ignore
  return (
    <SafeAreaView>
      <ScrollView>
        <Button onPress={()=>navigation.navigate("ProductFiltered")}>
          <Text>
            Filter as Category
          </Text>
        </Button>
        <Button onPress={()=>navigation.navigate("ProductFilteredPrice")}>
          <Text>
            Filter as Price
          </Text>
        </Button>
        <TextInput
          onChangeText={(e) => setSearchTerm(e)}
          placeholder="Search products..."
          style={{ backgroundColor: "transparent" }}
          value={searchTerm}
        />
        <View>
          {searchTerm ? (<View>
            <Text>
              New Products
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
            <Text>
              Favorites
            </Text>
            <FlatList
              horizontal={true} // Enable horizontal scrolling
              data={products}
              renderItem={({ item }) => (
                <View style={{ flexDirection: "row" }}>
                  <ProductCard product={item} />
                </View>
              )}
              keyExtractor={(item) => item.id.toString()} />
          </View>
            <View>
            <Text>
              Hot Deals
            </Text>
            <FlatList
              horizontal={true} // Enable horizontal scrolling
              data={products}
              renderItem={({ item }) => (
                <View style={{ flexDirection: "row" }}>
                  <ProductCard product={item} />
                </View>
              )}
              keyExtractor={(item) => item.id.toString()} />
          </View>
            <View>
              <Text>
                Campaings
              </Text>
              <FlatList
                horizontal={true} // Enable horizontal scrolling
                data={products}
                renderItem={({ item }) => (
                  <View style={{ flexDirection: "row" }}>
                    <ProductCard product={item} />
                  </View>
                )}
                keyExtractor={(item) => item.id.toString()} />
            </View>

            <View>
              <Text>
                2 buy 1 pay
              </Text>
              <FlatList
                horizontal={true} // Enable horizontal scrolling
                data={products}
                renderItem={({ item }) => (
                  <View style={{ flexDirection: "row" }}>
                    <ProductCard product={item} />
                  </View>
                )}
                keyExtractor={(item) => item.id.toString()} />
            </View></>)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


export default ProductsScreen;

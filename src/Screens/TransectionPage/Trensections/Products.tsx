import React, {  useState } from "react";
import { View, FlatList, Text, SafeAreaView, ScrollView } from "react-native";
import products from "../../../../Assets/product";  // Import your product data
import ProductCard from "../../../../src/Components/productcard.tsx";
import { Divider, TextInput } from "react-native-paper";  // Import your product card component


const ProductsScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts2 = products.filter((item) => item.title.toLowerCase().startsWith(searchTerm.toLowerCase()));
  // @ts-ignore
  return (
    <SafeAreaView>
      <ScrollView>
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
              data={filteredProducts2}
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
          </View><Divider style={{ height: 15, backgroundColor: "transparent" }}></Divider><View>
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
          </View></>)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


export default ProductsScreen;

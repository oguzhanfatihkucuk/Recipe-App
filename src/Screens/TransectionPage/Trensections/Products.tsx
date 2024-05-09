import React, {  useState } from "react";
import { View, FlatList, Text, SafeAreaView, ScrollView} from "react-native";
import products from "../../../../Assets/product";  // Import your product data
import ProductCard from "../../../../src/Components/productcard.tsx";
import { Button,TextInput } from "react-native-paper";  // Import your product card component
import { useNavigation } from "@react-navigation/native";
import ProductFilteredName from "./ProductFilteredName.tsx";

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
        <Button onPress={()=>navigation.navigate("ProductFilteredName")}>
          <Text>
            Category as Name
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
            <Text>
              Favorites {products.length} item found
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
              Hot Deals {products.length} item found
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
                Campaings {products.length} item found
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
                2 buy 1 pay {products.length} item found
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

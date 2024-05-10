import React, {  useState } from "react";
import { View, FlatList, Text, SafeAreaView, ScrollView} from "react-native";
import ProductCard from "../../../../src/Components/productcard.tsx";
import { Button,TextInput } from "react-native-paper";  // Import your product card component
import { useNavigation } from "@react-navigation/native";
import API_URL from "../../../../Assets/api";


//@ts-ignore
const ProductsScreen = ({navigation}) => {

  const [data2, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredAsFL = data2.filter((item) => item.title.toLowerCase().startsWith(searchTerm.toLowerCase()));

  let data;
  let id: any[],price: any[], category: any[],description:any[];
  const fetchMockBackendData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      data = await response.json();
      setData(data);

      id = data.map((user: any) => user.id);
      price = data.map((user: any) => user.price);
      category=data.map((user:any)=>user.category);
      description=data.map((user:any)=>user.description);

      return data;
    } catch (error) {
      console.error("Error fetching mock backend data:", error);
      return null;
    }
  };
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
        <Button onPress={fetchMockBackendData}>
          <Text>
            get products
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
              Favorites {data2.length} item found
            </Text>
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
            <Text>
              Hot Deals {data2.length} item found
            </Text>
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
              <Text>
                Campaings {data2.length} item found
              </Text>
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
              <Text>
                2 buy 1 pay {data2.length} item found
              </Text>
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

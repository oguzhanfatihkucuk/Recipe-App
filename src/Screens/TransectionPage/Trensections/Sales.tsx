import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import API_URL from "../../../../assets/js/api";
import LoadingAnimation from "../../../Components/Loading/Loading.tsx";
import ProductCard from "../../../Components/ProductCard/productcard.tsx";
import {myTuple} from "../../../../assets/js/myTuple";
import SalesCard from "../../../Components/SalesCard/SalesCard.tsx";
import { TextInput } from "react-native-paper";
import {addItemToTuple} from "../../../../assets/js/myTuple";
const SalesScreen = () => {
  const [data2, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredAsSaleList, setFilteredAsSaleList] = useState([]);
  const [productId, setProductId] = React.useState("1");

  let data;

  //@ts-ignore
  const filterSaleList = (data2, myTuple) => {
    //@ts-ignore
    return data2.filter((item) => {
      return myTuple.includes(item.id);
    });
  };

  const handlePress = () => {
    myTuple.length = 0;
    setData([]);
  };

  //@ts-ignore
  const handleAddItem = (productid) => {
    addItemToTuple(productid);
    const updatedFilteredAsSaleList = filterSaleList(data2, myTuple);
    setFilteredAsSaleList(updatedFilteredAsSaleList);
  };
  const ProductCardMemoized = React.memo(SalesCard);
  useEffect(() => {
    fetchMockBackendData(); // Call the function on component mount
  }, []);


  useEffect(() => {
    const updatedFilteredAsSaleList = filterSaleList(data2, myTuple);
    setFilteredAsSaleList(updatedFilteredAsSaleList);

    console.log(updatedFilteredAsSaleList);
  }, [data2, myTuple]);

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
    <SafeAreaView >
      <View style={{flexDirection:"row"}}>
        <TextInput
          label="Enter Product Id "
          style={{ borderColor: 'white',width:200}}
          cursorColor={"white"}
          keyboardType="numeric"
          onChangeText={(text) => {
            setProductId(text); // Call setText as before
          }}
        />
        <TouchableOpacity onPress={()=>handleAddItem(productId)} style={{height:80,borderColor:"black",borderWidth:3,justifyContent:"center"}}>
          <Text>
            Add Product
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:"row"}}>
        <FlatList
          horizontal={false}  // Enable horizontal scrolling
          data={filteredAsSaleList}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row" }}>
              <ProductCardMemoized  product={item} />
            </View>
          )}
          //keyExtractor={(item) => item.id.toString()}
        />
        <TouchableOpacity style={{width:110,height:80,backgroundColor:"green"}} onPress={handlePress}>
          <Text>
            Satıs Onayla
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};


export default SalesScreen;

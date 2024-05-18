import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import API_URL from "../../../../assets/js/api";
import LoadingAnimation from "../../../Components/Loading/Loading.tsx";
import {myTuple} from "../../../../assets/js/myTuple";
import SalesCard from "../../../Components/SalesCard/SalesCard.tsx";
import { TextInput } from "react-native-paper";
import {addItemToTuple} from "../../../../assets/js/myTuple";


const SalesScreen = () => {
  const [data2, setData] = useState<any[]>([]);
  const [lenghtOfSales, setlenghtOfSales] = useState(0);
  let [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filteredAsSaleList, setFilteredAsSaleList] = useState([]);
  const [productId, setProductId] = React.useState("1");
  const ProductCardMemoized = React.memo(SalesCard);
  let data;


  useEffect(() => {
    fetchMockBackendData(); // Call the function on component mount
  }, []);

  const handleRefresh = () => {
    const updatedFilteredAsSaleList = filterSaleList(data2, myTuple);
    setFilteredAsSaleList(updatedFilteredAsSaleList);
    setlenghtOfSales(myTuple.length);
    let totalPrice = 0;

    for (let i = 0; i < myTuple.length; i++) {
      const productId = myTuple[i];
      //@ts-ignore
      const item = updatedFilteredAsSaleList.find(item => item.id === productId);
      if (item) {
        totalPrice += item.price;
      }
    }
    setTotalPrice(totalPrice);

  };

  useEffect(handleRefresh, [data2, myTuple]);

  useEffect(() => {
    const updatedFilteredAsSaleList = filterSaleList(data2, myTuple);
    setFilteredAsSaleList(updatedFilteredAsSaleList);
    setlenghtOfSales(myTuple.length);
    let totalPrice = 0;

    for (let i = 0; i < myTuple.length; i++) {
      const productId = myTuple[i];
      //@ts-ignore
      const item = updatedFilteredAsSaleList.find(item => item.id === productId);
      if (item) {
        totalPrice += item.price;
      }
    }
    setTotalPrice(totalPrice);

  }, [data2, myTuple]);

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

  ////@ts-ignore
  //   updatedFilteredAsSaleList.forEach(item => {
  //     setTotalPrice(totalPrice += item.price);
  //   });
  //@ts-ignore
  const handleAddItem = (productid) => {
    addItemToTuple(productid);
    const updatedFilteredAsSaleList = filterSaleList(data2, myTuple);
    setFilteredAsSaleList(updatedFilteredAsSaleList);
    setlenghtOfSales(myTuple.length);

    let totalPrice = 0;

    for (let i = 0; i < myTuple.length; i++) {
      const productId = myTuple[i];
      //@ts-ignore
      const item = updatedFilteredAsSaleList.find(item => item.id === productId);
      if (item) {
        totalPrice += item.price;
      }
    }
    setTotalPrice(totalPrice);

  };

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
          style={{ borderColor: 'black',width:280,margin:15,height:50,borderWidth:3}}
          cursorColor={"white"}
          keyboardType="numeric"
          onChangeText={(text) => {
            setProductId(text);
          }}
        />
        <TouchableOpacity onPress={()=>handleAddItem(productId)} style={{alignItems:"center",width:120,height:50,borderColor:"black",borderWidth:3,justifyContent:"center",marginVertical:20}}>
          <Text>
            Add Product
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleRefresh()} style={{alignItems:"center",width:120,height:50,borderColor:"black",borderWidth:3,justifyContent:"center",marginVertical:20}}>
          <Text>
            Refresh
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{justifyContent:"space-between",flexDirection:"row",marginBottom:200,marginTop:20,width:1100}}>
        <View>
          <FlatList
            horizontal={false}  // Enable horizontal scrolling
            data={filteredAsSaleList}
            renderItem={({ item }) => (
              <View style={{ flexDirection: "row"}}>
                <ProductCardMemoized  product={item} />
              </View>
            )}
            //keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View >
          <Text style={{fontSize:24,width:270,height:50,borderWidth:2,borderColor:"black",borderRadius:15,padding:5}}>
            Toplam Ürün sayısı:{lenghtOfSales}
          </Text>
          <Text style={{fontSize:24,width:270,height:100,borderWidth:2,borderColor:"black",borderRadius:15,padding:5}}>
            Toplam Tutar:{totalPrice}
          </Text>
        </View>
        <TouchableOpacity style={{height:50,width:110,backgroundColor:"blue",alignItems:"center",justifyContent:"center"}} onPress={handlePress}>
          <Text>
            Satıs Onayla
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};


export default SalesScreen;

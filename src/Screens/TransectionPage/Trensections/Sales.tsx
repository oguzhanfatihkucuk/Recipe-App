import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import API_URL from "../../../../assets/js/api";
import LoadingAnimation from "../../../Components/Loading/Loading.tsx";
import {myTuple} from "../../../../assets/js/myTuple";
import SalesCard from "../../../Components/SalesCard/SalesCard.tsx";
import { Divider, TextInput } from "react-native-paper";
import {addItemToTuple} from "../../../../assets/js/myTuple";

//@ts-ignore
const SalesScreen = ({ navigation }) => {
  const [data2, setData] = useState<any[]>([]);
  const [lenghtOfSales, setlenghtOfSales] = useState(0);
  let [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filteredAsSaleList, setFilteredAsSaleList] = useState([]);
  const [productId, setProductId] = React.useState("1");
  const ProductCardMemoized = React.memo(SalesCard);
  let data;
  const [count, setCount] = useState(0);

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
    handleTextChange(0);
  };
  //@ts-ignore
  const handleTextChange = (text) => {
    const intValue = parseInt(text, 10);
    setCount(intValue);
  };

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
  const calculateRemainingAmount = () => {
    const remainingAmount = totalPrice - count;
    if (remainingAmount < 0) {
      return `Para üstünüz: ${Math.abs(remainingAmount).toFixed(2)}`; // Negatifse para üstünü göster
    } else {
      return `Kalan Tutar: ${remainingAmount.toFixed(2)}`; // Negatif değilse kalan tutarı göster
    }
  };

  const calculateRemainingAmount2 = () => {
    const remainingAmount = totalPrice - count;
    return remainingAmount;
  };

  const isButtonActive = () => {
    return calculateRemainingAmount2() >= 0; // Kalan tutar pozitifse true, değilse false döndür
  };

  if (loading) {
    return <LoadingAnimation />;
  }


  // @ts-ignore
  return (
    <SafeAreaView >
      <View style={{flexDirection:"row",borderWidth:2}}>

        <TextInput
          label="Enter Product Id "
          style={{ borderColor: 'black',width:280,margin:15,height:50,borderWidth:3}}
          cursorColor={"white"}
          keyboardType="numeric"
          onChangeText={(text) => {
            setProductId(text);
          }}
        />
        <TouchableOpacity onPress={()=>handleAddItem(productId)} style={{alignItems:"center",width:120,height:50,borderColor:"black",borderWidth:3,justifyContent:"center",marginVertical:20,marginHorizontal:10}}>
          <Text>
            Add Product
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleRefresh()} style={{alignItems:"center",width:120,height:50,borderColor:"black",borderWidth:3,justifyContent:"center",marginVertical:20,marginHorizontal:10}}>
          <Text>
            Refresh
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Products")} style={{alignItems:"center",width:120,height:50,borderColor:"black",borderWidth:3,justifyContent:"center",marginVertical:20,marginHorizontal:10}}>
          <Text>
            Go to Category Page
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{borderWidth:2,justifyContent:"space-between",flexDirection:"row",marginBottom:200,marginTop:20,width:1100}}>
        <View>
          <FlatList
            horizontal={false}  // Dikey yönde liste oluştur
            data={filteredAsSaleList}
            renderItem={({ item }) => (
              <View style={{ flexDirection: "row"}}>
                <ProductCardMemoized  product={item} />
              </View>
            )}
            ListEmptyComponent={() => (
              <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Text style={{fontSize:24,margin:15}}>Sepetinizde Ürün Yok </Text>
              </View>
            )}
          />
        </View>
        <View >
          <Text style={{marginVertical:10,fontSize:24,width:270,height:50,borderWidth:2,borderColor:"black",borderRadius:15,padding:5}}>
            Toplam Ürün sayısı:{lenghtOfSales}
          </Text>
          <Text style={{marginVertical:10,fontSize:24,width:270,height:80,borderWidth:2,borderColor:"black",borderRadius:15,padding:5}}>
            Toplam Tutar:{totalPrice.toString().substring(0, 6)}
          </Text>
          <TextInput onChangeText={handleTextChange} placeholder="Ödenen Miktarı Giriniz" style={{backgroundColor:"transparent",marginVertical:10,fontSize:24,width:270,height:80,borderWidth:2,borderColor:"black",borderRadius:15,padding:5}}>
          </TextInput>
          <Divider style={{marginVertical:10,width:270,height:3}}></Divider>
          <Text style={{marginVertical:10,fontSize:24,width:270,height:80,borderWidth:2,borderColor:"black",borderRadius:15,padding:5}}>
            {calculateRemainingAmount()}
          </Text>
        </View>
        <View>
          <TouchableOpacity style={{margin:10,height:50,width:110,backgroundColor:"white",alignItems:"center",justifyContent:"center"}} onPress={handlePress} >
            <Text>
              Tüm Belge İptal
            </Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={isButtonActive()} style={{margin:10,height:50,width:110,backgroundColor: !isButtonActive() ? "green" : "red",alignItems:"center",justifyContent:"center"}} >
            <Text>
              E-Arşiv
            </Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={isButtonActive()} style={{margin:10,height:50,width:110,backgroundColor:!isButtonActive() ? "green" : "red",alignItems:"center",justifyContent:"center"}} >
            <Text>
              Satıs Onayla
            </Text>
          </TouchableOpacity>

        </View>


      </View>

    </SafeAreaView>
  );
};


export default SalesScreen;

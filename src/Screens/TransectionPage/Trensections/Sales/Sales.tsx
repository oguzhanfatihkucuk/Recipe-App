import React, { useEffect, useState } from "react";
import { Alert, Button, FlatList, Modal, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import LoadingAnimation from "../../../../Components/Loading/Loading.tsx";
import { addItemToTuple, myTuple } from "../../../../../assets/js/myTuple";
import SalesCard from "../../../../Components/SalesCard/SalesCard.tsx";
import { Divider, TextInput } from "react-native-paper";
import { addItemToReports, addItemToReportsOffline } from "../../../../../assets/js/reports";
import { fetchMockBackendData } from "../../../../../services/fetchingData/fetchData";
import Toast from "react-native-root-toast";
import styles from "./SalesStyles.tsx";
import StoreStatusText from "../../../../Components/StoreIcon/StoreStatusText.tsx";
import { useStoreStatus } from "../../../../../services/storeSituation/StoreStatusContext";
import { sendEmail } from "../../../../../services/sendEmail/sendEmail";
import { background } from "native-base/lib/typescript/theme/styled-system";

//@ts-ignore
const SalesScreen = ({ navigation }) => {


  const { isStoreOpen } = useStoreStatus();
  const [data2, setData] = useState<any[]>([]);
  const [lenghtOfSales, setlenghtOfSales] = useState(0);
  let [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filteredAsSaleList, setFilteredAsSaleList] = useState([]);
  const [productId, setProductId] = React.useState("");
  const ProductCardMemoized = React.memo(SalesCard);
  let data;
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const currentDateTime = new Date();
  const date = currentDateTime.toLocaleDateString();
  const time = currentDateTime.toLocaleTimeString();
  let [myMailContent, setMyMailContent] = useState("");
  const { countOfPrinterWork, setCountOfPrinterWork } = useStoreStatus();
  //@ts-ignore
  useEffect(() => {
    fetchDataFromMockBackend(); // Call the function on component mount
  }, []);

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

  const fetchDataFromMockBackend = async () => {
    try {
      data = await fetchMockBackendData();
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRefreshToItemList = () => {
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

  //@ts-ignore
  const filterSaleList = (data2, myTuple) => {
    //@ts-ignore
    return data2.filter((item) => {
      return myTuple.includes(item.id);
    });
  };

  const deleteData = () => {
    myTuple.length = 0;
    setData([]);
    handleTextChange(0);
    fetchDataFromMockBackend();
  };

  const handlePressEmail = () => {
    deleteData();
    sendEmail(email, myMailContent);
    setMyMailContent("");
  };
  //@ts-ignore
  const handleTextChange = (text) => {
    const intValue = parseInt(text, 10);
    if (isNaN(intValue)) {
      return;
    }
    setCount(intValue);
  };

  const sendRecipeToMail = () => {
    setModalVisible(false);
    showDataInAlertMail();
  };

  const creditCardMethod = () => {
    setCount(totalPrice - count);
    handleTextChange(0);
    showDataInAlertCreditCard();
    deleteData();
  };

  //@ts-ignore
  const handleAddItem = (productid) => {
    const isProductInData2 = data2.some(item => item.id === productid);

    if (!isProductInData2) {
      Alert.alert("Ürün bulunamadı!", productid + " kodlu ürün bulunamadı!!");
      return;
    }
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

  const calculateRemainingAmount = () => {
    const remainingAmount = totalPrice - count;
    if (remainingAmount < 0) {
      return `Para üstünüz: ${Math.abs(remainingAmount).toFixed(2)}`;
    } else {
      return `Kalan Tutar: ${remainingAmount.toFixed(2)}`;
    }
  };

  const showDataInAlertSatisOnayla = () => {
    var message = "Satış Fişi:\n";
    message += "***********************\n";
    message += "Staff Name:Oguz     \n";
    message += "Staff Id:00004    \n";
    message += "                   " + time + "\n";
    message += "                   " + date + "\n";
    message += "***********************\n";
    filteredAsSaleList.forEach(function(item) {
      //@ts-ignore
      message += "Title: " + item.title + "\n";
      //@ts-ignore
      message += "Id: " + item.id + "";
      //@ts-ignore
      message += "        Price:$" + item.price.toFixed(2) + "\n";
      message += "***********************\n";
    });
    message += "Toplam Tutar:" + totalPrice.toString().substring(0, 6) + "\n";
    message += "Ödenen Tutar:" + count + "\n";
    message += "Para Üstü :" + Math.abs(count - totalPrice).toFixed(2) + "\n";
    message += "***********************\n";
    message += "       Good Days...";

    Alert.alert("", message);
    deleteData();

    if (!isStoreOpen) {
      setCountOfPrinterWork((prevCount: number) => prevCount + 1);
      addItemToReportsOffline(message);
    } else if (isStoreOpen) {
      addItemToReports(message);
    }

  };

  const showDataInAlertCreditCard = () => {
    var message = "Satış Fişi:\n";
    message += "***********************\n";
    message += "Staff Name:Oguz     \n";
    message += "Staff Id:00004    \n";
    message += "                   " + time + "\n";
    message += "                   " + date + "\n";
    message += "***********************\n";
    filteredAsSaleList.forEach(function(item) {
      //@ts-ignore
      message += "Title: " + item.title + "\n";
      //@ts-ignore
      message += "Id: " + item.id + "";
      //@ts-ignore
      message += "        Price:$" + item.price.toFixed(2) + "\n";
      message += "***********************\n";
    });
    message += "Ödeme Kredi Kartı İle Alındı\n";
    message += "Toplam Tutar:" + totalPrice.toString().substring(0, 6) + "\n";
    message += "Ödenen Tutar:" + totalPrice.toString().substring(0, 6) + "\n";
    message += "Para Üstü : 0 \n";
    message += "***********************\n";
    message += "       Good Days...\n";

    Alert.alert("", message);
    deleteData();

    if (!isStoreOpen) {
      setCountOfPrinterWork((prevCount: number) => prevCount + 1);
      addItemToReportsOffline(message);
    } else if (isStoreOpen) {
      addItemToReports(message);
    }
  };

  const showDataInAlertMail = () => {

    var message = "Satış Fişi:\n";
    message += "***********************\n";
    message += "Staff Name:Oguz     \n";
    message += "Staff Id:00004    \n";
    message += "                   " + time + "\n";
    message += "                   " + date + "\n";
    message += "***********************\n";
    filteredAsSaleList.forEach(function(item) {
      //@ts-ignore
      message += "Title: " + item.title + "\n";
      //@ts-ignore
      message += "Id: " + item.id + "";
      //@ts-ignore
      message += "        Price:$" + item.price.toFixed(2) + "\n";
      message += "***********************\n";
    });
    message += "Toplam Tutar:" + totalPrice.toString().substring(0, 6) + "\n";
    message += "Ödenen Tutar:" + count + "\n";
    message += "Para Üstü :" + Math.abs(count - totalPrice).toFixed(2) + "\n";
    message += "***********************\n";
    message += "       Good Days...";

    if (!isStoreOpen) {
      setCountOfPrinterWork((prevCount: number) => prevCount + 1);
    }
    setMyMailContent(message);
  };


  useEffect(() => {
    if (myMailContent !== "") {
      if (!isStoreOpen) {
        addItemToReportsOffline(myMailContent);
        handlePressEmail();
      } else if (isStoreOpen) {

        addItemToReports(myMailContent);
        handlePressEmail();
      }
    }
  }, [myMailContent]);

  const isButtonActive = () => {
    return totalPrice - count >= 0; // Kalan tutar pozitifse true, değilse false döndür
  };

  if (loading) {
    return <LoadingAnimation />;
  }
  // @ts-ignore
  return (
    <SafeAreaView>
      <StoreStatusText />
      <View style={styles.OuterContainer}>
        <TextInput
          label="Enter Product Id "
          style={styles.textProductId}
          cursorColor={"white"}
          keyboardType="numeric"
          value={productId}
          onChangeText={(text) => {
            const numericRegex = /^[0-9]*$/;

            if (!numericRegex.test(text)) {
              Toast.show(
                "Ürün ID yalnızca sayısal değer içerebilir!",
                {
                  duration: Toast.durations.SHORT
                }
              );

              return;
            }
            setProductId(text);
          }}
        />
        <TouchableOpacity onPress={() => handleAddItem(productId)} style={styles.textProductIdButton}>
          <Text>
            Add Product
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          handleRefreshToItemList();
        }} style={styles.refreshButton}>
          <Text>
            Refresh
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Products")} style={styles.goToCategoryPageButton}>
          <Text>
            Go to Category Page
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row" }}>
        <View style={{ borderWidth:2,borderColor:"black",width:330,margin:20,height:450}}>
        </View>

        <View style={styles.innerContainer}>
          <View>
            <FlatList
              horizontal={false}  // Dikey yönde liste oluştur
              data={filteredAsSaleList}
              refreshing={loading}
              renderItem={({ item }) => (
                <View style={{ flexDirection: "row" }}>
                  <ProductCardMemoized product={item} />
                </View>
              )}
              ListEmptyComponent={() => (
                <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                  <Text style={{ fontSize: 24, margin: 15 }}>Sepetinizde Ürün Yok </Text>
                </View>
              )}
            />
          </View>
          <View>
            <Text style={styles.info1}>
              Toplam Ürün sayısı:{lenghtOfSales}
            </Text>
            <Text style={styles.info2}>
              Toplam Tutar:{totalPrice.toString().substring(0, 6)}
            </Text>
            <TextInput
              value={count.toString()}
              onChangeText={(text) => {
                const numericRegex = /^[0-9]*$/;

                if (!numericRegex.test(text)) {
                  setCount(0);
                  Toast.show(
                    "Sadece sayısal değer girebilirsiniz!",
                    {
                      duration: Toast.durations.SHORT
                    }
                  );
                  return;
                }
                handleTextChange(text);

              }}
              //value={enteredAmount.toString()}
              placeholder="Ödenen Miktarı Giriniz"
              style={styles.info3}>
            </TextInput>
            <Divider style={{ marginVertical: 10, width: 270, height: 3 }}></Divider>
            <Text style={styles.info4}>
              {calculateRemainingAmount()}
            </Text>
          </View>
          <View>
            <TouchableOpacity style={styles.belgeIptal} onPress={deleteData}>
              <Text>
                Tüm Belge İptal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.creditCard} onPress={() => creditCardMethod()}>
              <Text>
                Kredi Kartı İle Ödeme
              </Text>
            </TouchableOpacity>

            <TouchableOpacity disabled={isButtonActive()} style={{
              margin: 10,
              height: 50,
              width: 110,
              backgroundColor: !isButtonActive() ? "green" : "red",
              alignItems: "center",
              justifyContent: "center"
            }} onPress={() => setModalVisible(true)}>
              <Text>
                E-Arşiv
              </Text>
            </TouchableOpacity>

            {/* Modal */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)"
              }}>
                <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, alignItems: "center" }}>
                  <Text style={{ marginBottom: 10 }}>E-posta adresinizi girin:</Text>
                  <TextInput
                    style={{ borderColor: "gray", borderWidth: 1, width: 200, marginBottom: 10, padding: 5 }}
                    value={email}
                    onChangeText={setEmail}

                  />
                  <Button title="Gönder" onPress={sendRecipeToMail} />
                  <Button title="İptal" onPress={() => setModalVisible(false)} />
                </View>
              </View>
            </Modal>
            <TouchableOpacity disabled={isButtonActive()} style={{
              margin: 10,
              height: 50,
              width: 110,
              backgroundColor: !isButtonActive() ? "green" : "red",
              alignItems: "center",
              justifyContent: "center"
            }} onPress={showDataInAlertSatisOnayla}>
              <Text>
                Satıs Onayla
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </SafeAreaView>
  );
};

export default SalesScreen;

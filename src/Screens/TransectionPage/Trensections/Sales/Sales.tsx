import React, { useEffect, useState } from "react";
import { Alert, Button, FlatList,  Modal, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import LoadingAnimation from "../../../../Components/Loading/Loading.tsx";
import {
  addItemToReports,
  addItemToReportsOffline,
  revenueCashInc,
  revenueCreditInc
} from "../../../../../assets/js/reports";
import { addItemToTuple, countItems, myTuple } from "../../../../../assets/js/myTuple";
import SalesCard from "../../../../Components/SalesCard/SalesCard.tsx";
import { Divider, List, TextInput } from "react-native-paper";
import { fetchMockBackendData } from "../../../../../services/fetchingData/fetchData";
import Toast from "react-native-root-toast";
import styles from "./SalesStyles.tsx";
import StoreStatusText from "../../../../Components/StoreIcon/StoreStatusText.tsx";
import { useStoreStatus } from "../../../../../services/storeSituation/StoreStatusContext";
import { sendEmail } from "../../../../../services/sendEmail/sendEmail";
import ProductCard from "../../../../../src/Components/ProductCard/productcard.tsx";
import { Picker } from "@react-native-picker/picker";


//@ts-ignore
const SalesScreen = ({navigation}) => {

  //Mağaza durumu bilgisini tutan değişkenimiz.
  const { isStoreOpen } = useStoreStatus();

  //Ürünler verilerini tutacak olan listemiz ve bu listemizi güncellemizi sağlayacak olan hook.
  const [data2, setData] = useState<any[]>([]);

  //Sepette olan ürün sayısını tutacak olan int değerimiz ve bu değeri güncellemizi sağlayacak olan hook.
  const [lenghtOfSales, setlenghtOfSales] = useState(0);

  //Sepette olan ürünlerin fiyat olarak karşılığını tutacak olan int değerimiz ve bu değeri güncellemizi sağlayacak olan hook.
  let [totalPrice, setTotalPrice] = useState(0);

  //Data alışverişi sırasında UI blocking için animasyon kontrol mekanizması için kullandığımız bool değer.
  const [loading, setLoading] = useState(true);

  //Ürünlerin filterelenmesi halinde data2 verilerini filtrelenmiş olarak güncellendiği listemiz ve bunu kontrol eden hook.
  const [filteredAsSaleList, setFilteredAsSaleList] = useState([]);

  //Ürün ID bilgisi ile sepete eklemek için kullacağımız string değer.
  const [productId, setProductId] = React.useState("");

  //Sepete eklenen ürünlerin UI tarafında gösterildiği card komponentimiz.
  const SalesCardMemorized = React.memo(SalesCard);

  //Satış ekranın sol tarafında yer alan kategoriden ürün ekleme özelliğinin UI tarafında gösterildiği card komponentimiz.
  const ProductCardMemoized = React.memo(ProductCard);

  //Fetch ile çektiğimiz ilk datanın tutulduğu yer.Çekilen data 'data2' listesine güncellenir.
  let data;

  //Satış sırasında ödenen nakit tutarın girildiği int değer ve bunu kontrol eden hook.
  const [count, setCount] = useState(0);

  //Fişlerin e-mail servisi ile gönderilmesi için kullanıcıdan aldığımız e-mail bilgisini tuttuğumuz string değer.
  const [email, setEmail] = useState("");

  //Kullanıcıdan e-mail bilgisini almak için kullanacağımız textinput bileşenini ekrana göstermek için kullandığımız
  //modelin görünürlüğünü kontrol eden hookumuz.
  const [modalVisible, setModalVisible] = useState(false);

  //Satış fişlerinin üstünde belirtilen tarih bilgisini tuttuğumuz Date tipindeki veri.Buna bağlı olarak tarih ve saat bilgisine
  //erişiyoruz.
  const currentDateTime = new Date();
  const date = currentDateTime.toLocaleDateString();
  const time = currentDateTime.toLocaleTimeString();

  //E-mail serivisinde kullanıcı mailine gönderilecek olan string değer.Bu değer satış yapıldıktan sonra satış fişini
  //string bir ifade olarak mail servisine gönderiyor.
  let [myMailContent, setMyMailContent] = useState("");

  //Eğer mağaza durumu kapalı ise yapılan satışlardaki fişler merkeze gönderilmedi olarak işaretleniyordu.Burada eğer
  //mağaza kapalı ise bu int değer artırılarak kaç adet gönderilmemiş fiş var ise bunu güncellememizi sağlıyor.
  const { setCountOfPrinterWork } = useStoreStatus();

  //Satış ekranının sol tarafında bulunan kategoriden seç kısmında seçilen kategori bilgisini tutan ve kontrol eden hook.
  const [categoryTerm, setCategoryTerm] = useState("none");

  //Kategori seçildikten sonra, kategoriden seç kısmında yer alacak olan ürünler datasını tutan listemiz.
  const filteredAsCT = data2.filter((item) => item.category.toLowerCase().startsWith(categoryTerm.toLowerCase()));

  //Kampanya seçilmesi takdirde seçili olan kategori bilgisin tutan string değerimiz.
  const [selectedCampaign, setSelectedCampaign] = useState("");


  //Satış ekranın yüklendiğinde Mockoon servisinden data çekme işlemi çağrısı.
  //@ts-ignore
  useEffect(() => {
    fetchDataFromMockBackend();
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


  //Mockoon servisinden data çekme işlemi.
  const fetchDataFromMockBackend = async () => {
    try {
      data = await fetchMockBackendData();
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  /*
  Sepete yeni bir ürün eklenmesi halinde listedeki ürünlerin olduğu listeyi yenilemek için kullandığımız fonksiyon.

  İlk önce myTuple lsitemizdeki ID değerlerine göre data2 adlı listemizden ID değerleri uyuşan ürünleri data2'yi tekrardan günceller.

  Ardından listede olan ürünlerin sayısını 'setlenghtOfSales' ile günceller.

  Son adımda ise listeden olan tüm ürünlerin fiyatlarını toplar ve 'setTotalPrice' ile günceller.
  */

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



  /*
    Buradaki foknsiyon data2 verisini sepetimizde olan listeye göre filtreleme işini yapar.

    myTuple sepetimizde olan ürünlerin Id değerlerinin tutulduğu listeydi.

    data2 ise tüm ürünlerin bulunduğu büyük veri listesi.

    Filtreleme işlemi gerçekleştirerek data2 verisini sepetimizde olan ürünlerin ID'lerine göre sepette mevcut olan ürün listesini döndürür.
  */
  //@ts-ignore
  const filterSaleList = (data2, myTuple) => {
    //@ts-ignore
    return data2.filter((item) => {
      return myTuple.includes(item.id);
    });
  };


  /*
    Bu fonksiyon 'Tüm belge iptal' butonu için oluşturulmuştur.Aynı zamanda satış işlemlerinin olumulu sonuçlanmasında da çağrısı yapılmaktadır.

    Bu fonkisyon temel olarak sepetimizde olan tüm ID değerlerini siler.

    data2 listesini siler .

    Son olarak da girilen nakit tutar değerini sıfırlar.
  */
  const deleteData = () => {
    myTuple.length = 0;
    setData([]);
    handleTextChange(0);
    fetchDataFromMockBackend();
  };


  /*
  Bu fonksiyon 'E-arşiv olarak ödeme' butonu için tasarlanmıştır.

  İlk olarak 'deleteData' ile silme işlemlerini yapar.

  Ardından 'sendEmail' ile kullanıcıdan aldığımız e-mail bilgisi ile mail içeriğini e-mail servisimize gönderek mail gönderilmesini sağlar
  */
  const handlePressEmail = () => {
    deleteData();
    sendEmail(email, myMailContent);
    setMyMailContent("");
  };


  /*
   Ödenen nakit tutarın değişikliğini kontrol eden fonksiyonumuz.

   Ödenen miktarı sadece int değer olarak kabul eder, int değer dışında başka bir değer girilmesi sonucu  'Count' değerini güncellemez.
  */
  //@ts-ignore
  const handleTextChange = (text) => {
    const intValue = parseInt(text, 10);
    if (isNaN(intValue)) {
      return;
    }
    setCount(intValue);
  };


  /*
    Mail bilgisi alındıktan sonra, mail bilgisini almak için aktif ettiğimiz modelin görünürlüğünü false yapar.

    Ardından satışını gerçekleştirdiğimiz satışın fişini ekranda gösterir.
  */
  const sendRecipeToMail = () => {
    setModalVisible(false);
    showDataInAlertMail();
  };


  /*
    Kredi kartı ile ödeme yapma sistemi için oluşturulmuş fonksiyon.

    Burada nakit satış gibi ödenen miktar olmayıp kredi kartı ile ödenme durumunda toplam tutarın tamamı ödenmiş olarak kabul edilir.

    Kredi kartı ile ödeme gerçekleştikten sonra ekrana 'showDataInAlertCreditCard' ile fiş bilgisi gösterilir.

    'deleteData' ile silme işlemlerini yapar.
  */
  const creditCardMethod = () => {
    setCount(totalPrice - count);
    handleTextChange(0);
    showDataInAlertCreditCard();
    deleteData();
  };



  /*
      Id değeri bilinen ürünlerin manuel olarak eklenmesi için oluşturulmuş fonksiyon.

      Textinput komponenti ile kullanıcıdan ID değeri alınırr ve bu ID değerinin herhangi bir ürüne karışılık gelip gelmediği
      'isProductInData2' ile kontrol edilir. ID eşleşmesi durumunda 'addItemToTuple' ile belirtilen ID değerindeki ürün myTuple
      yani sepetimizdeki ürünler listesine eklenir.

      Id eşleşmesi olmaması halinde ekrana bir alert ile ürünün bulunamadığına dair bir mesaj belirir.

      Ürün ID değerinin sepete eklenmesinin ardından güncellenme işlemleri yapılır.

      Listedeki ürünler 'setFilteredAsSaleList' ile güncellenir.

      'setlenghtOfSales' ile sepetimizdeki toplam ürün miktarı güncellenir.

      'setTotalPrice' ile sepetimizdeki tüm ürünlerin toplam tutarı güncellenir.
  */
  //@ts-ignore
  const handleAddItem = (productid) => {
    const isProductInData2 = data2.some(item => item.id === productid);

    if (!isProductInData2) {
      Alert.alert("Product not found!", productid + "The product with the code was not found!!");
      return;
    } else {
      Toast.show(
        `Product ID: ${productId}\nItem Successfully Added to Your List`,
        {
          duration: Toast.durations.SHORT
        }
      );
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


  /*
    Nakit ödeme yapılacağı zaman ödenen miktar ile toplam ürün miktarından çıkartarak geriye kalan ödenmesi gereken nakit miktarı
    bilgisini veren fonksiyon. Bu bilgiyi string olarak geri döndürür ve bunu bir text komponentinde görüntüler.
  */
  const calculateRemainingAmount = () => {
    const remainingAmount = totalPrice - count;
    if (remainingAmount < 0) {
      return `Your change: ${Math.abs(remainingAmount).toFixed(2)}`;
    } else {
      return `Remaining: ${remainingAmount.toFixed(2)}`;
    }
  };


  //Nakit ödeme tamamlanması halinde ekranda gösterilecek olan Alert için  string ifadesinin oluşturulması.
  const showDataInAlertSatisOnayla = () => {
    var message = "Sales Receipt:\n";
    message += "***********************\n";
    message += "Staff Name:Oguz     \n";
    message += "Staff Id:00004    \n";
    message += "                   " + time + "\n";
    message += "                   " + date + "\n";
    message += "***********************\n\n";
    filteredAsSaleList.forEach(function(item) {
      //@ts-ignore
      message += "Title: " + item.title + "\n";
      //@ts-ignore
      message += "Id: " + item.id + "";
      //@ts-ignore
      message += "        Price:$" + item.price.toFixed(2) + " X " + countItems(item.id) + "\n\n";

    });
    message += "***********************\n";
    message += "Total amount:" + totalPrice.toString().substring(0, 6) + "\n";
    message += "Amount Paid:" + count + "\n";
    message += "Change:" + Math.abs(count - totalPrice).toFixed(2) + "\n";
    message += "***********************\n";
    message += "       Good Days...";

    revenueCashInc(totalPrice, lenghtOfSales);

    Alert.alert("", message);
    deleteData();

    if (!isStoreOpen) {
      setCountOfPrinterWork((prevCount: number) => prevCount + 1);
      addItemToReportsOffline(message);
    } else if (isStoreOpen) {
      addItemToReports(message);
    }

  };

  //Kredi kartı ile ödeme tamamlanması halinde ekranda gösterilecek olan Alert için  string ifadesinin oluşturulması.
  const showDataInAlertCreditCard = () => {
    var message = "Sales Receipt:\n";
    message += "***********************\n";
    message += "Staff Name:Oguz     \n";
    message += "Staff Id:00004    \n";
    message += "                   " + time + "\n";
    message += "                   " + date + "\n";
    message += "***********************\n\n";
    filteredAsSaleList.forEach(function(item) {
      //@ts-ignore

      message += "Title: " + item.title + "\n";
      //@ts-ignore
      message += "Id: " + item.id + "";
      //@ts-ignore
      message += "        Price:$" + item.price.toFixed(2) + " X " + countItems(item.id) + "\n\n";

    });
    message += "***********************\n";
    message += "Payment Received by Credit Card\n";
    message += "Total Amount:" + totalPrice.toString().substring(0, 6) + "\n";
    message += "Amount Paid:" + totalPrice.toString().substring(0, 6) + "\n";
    message += "Change: 0 \n";
    message += "***********************\n";
    message += "       Good Days...\n";

    revenueCreditInc(totalPrice, lenghtOfSales);

    Alert.alert("", message);
    deleteData();

    if (!isStoreOpen) {
      setCountOfPrinterWork((prevCount: number) => prevCount + 1);
      addItemToReportsOffline(message);
    } else if (isStoreOpen) {
      addItemToReports(message);
    }
  };


  //Satış ekranında kategorilerden ürün ekleme için kullanılacak kategori değerini değiştirmek için kullandığımız fonksiyon.
  //@ts-ignore
  const handleCategoryPress = (category) => {
    setCategoryTerm(category);
    fetchDataFromMockBackend();
  };


  //E-arşive ile ödeme tamamlanması halinde ekranda gösterilecek olan Alert için  string ifadesinin oluşturulması.
  const showDataInAlertMail = () => {

    var message = "Sales Receipt:\n";
    message += "***********************\n";
    message += "Staff Name:Oguz     \n";
    message += "Staff Id:00004    \n";
    message += "                   " + time + "\n";
    message += "                   " + date + "\n";
    message += "***********************\n\n";
    filteredAsSaleList.forEach(function(item) {
      //@ts-ignore
      message += "Title: " + item.title + "\n";
      //@ts-ignore
      message += "Id: " + item.id + "";
      //@ts-ignore
      message += "        Price:$" + item.price.toFixed(2) + "\n";

    });
    message += "***********************\n";
    message += "Total amount:" + totalPrice.toString().substring(0, 6) + "\n";
    message += "Amount Paid:" + count + "\n";
    message += "Change:" + Math.abs(count - totalPrice).toFixed(2) + "\n";
    message += "***********************\n";
    message += "       Good Days...";

    revenueCashInc(totalPrice, lenghtOfSales);

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



  //Ödenen tutarın, toplam ürün tutarından fazla olması halinde ödeme butonunun aktif olmasını sağlayan, geriye bir bool değer döndüren fonksiyon.
  const isButtonActive = () => {
    return totalPrice - count >= 0;
  };

  //Kampanya Uygulama
  /*
     Sepetimizde kaç adet 'bag' item yani ID değeri 5 olan ürün olduğunu bularak bu miktarın yarısı kadar ürün fiyatının diskonto uygulanmasını sağlar.

     Örnek: 'bag' fiyatı=39 , Sepetimizde 10 adet 'bag' var ise 10/2=5 , 5*39 =195 fiyat indirimi yapılacaktır.

     Bu değişiklik 'setTotalPrice' ile güncellenir.
  */
  //@ts-ignore
  const countFives = (array: string[]) => {

    if(array.filter(item => item === "5").length>0)
    {
      setTotalPrice(totalPrice-((array.filter(item => item === "5").length)*39)/2);
      Alert.alert(
        "Buy 2 Get 1 Free","Buy 2 get 1 free on selected bags items. Don't miss the chance to get your favorite items.",[
          { text: "OK"},
        ]
      )
    }
    else{
      Alert.alert(
        "Error","The items on packet are not valid for this campaings",[
          { text: "OK"},
        ]
      )
    }
  };


  //Kampanya Uygulama
  /*
     Sepetimizde bulunan her bir 'Plates' için %20 indirim yapar. .

     Bu değişiklik 'setTotalPrice' ile güncellenir.
  */
  const percent20 = (array: string[]) => {

    if(array.filter(item => item === "19").length>0)
    {
      setTotalPrice(totalPrice-(((array.filter(item => item === "19").length)*4)/5));
      Alert.alert(
        "%20 Discount on Plates","Plates that in your packet are %20 discount aplied. ",[
          { text: "OK"},
        ]
      )
    }
    else{
      Alert.alert(
        "Error","The items on packet are not valid for this campaings",[
          { text: "OK"},
        ]
      )
    }

  };


  //Kampanya Uygulama
  /*
     Sepetimizde bulunan her ürün için %20 indirim yapar. .

     Bu değişiklik 'setTotalPrice' ile güncellenir.
  */
  const percent5 = () => {
    Alert.alert(
      "%5 Discount on all items","The items in you packet are %5 discount applied.",[
        { text: "OK"},
      ]
    )
    setTotalPrice((totalPrice*95)/100);
  };

  //Kampanya seçmemiz için oluşturulan switch.
  //@ts-ignore
  const campaignApply = (selectedCampaign) => {
    switch (selectedCampaign) {
      case "1":
        countFives(myTuple)
        break;
      case "2":
        percent20(myTuple)
        break;
      case "3":
        percent5()
        break;

    }
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
          cursorColor={"black"}
          keyboardType="numeric"
          value={productId}
          onChangeText={(text) => {
            const numericRegex = /^[0-9]*$/;

            if (!numericRegex.test(text)) {
              Toast.show(
                "Product ID can only contain numeric values!",
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
        <TouchableOpacity onPress={() => navigation.navigate("AllProducts")} style={styles.textProductIdButton}>
          <Text>
            Products Screen
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.productsCategory}>
          <List.Section>
            <List.Accordion
              title="Choose Category"
              left={props => <List.Icon {...props} icon="folder" />}
            >
              {[
                { title: "Clothing", category: "clothing", icon: "alpha-c-circle-outline" },
                { title: "Accessories", category: "accessories", icon: "alpha-a-box-outline" },
                { title: "Home", category: "home", icon: "alpha-h-box-outline" },
                { title: "Kitchen", category: "kitchen", icon: "alpha-k-box-outline" },
                { title: "Food", category: "food", icon: "alpha-f-box-outline" }
              ].map(item => (
                <List.Item
                  key={item.category}
                  title={item.title}
                  left={props => <List.Icon {...props} icon={item.icon} />}
                  onPress={() => handleCategoryPress(item.category)}
                />
              ))}
            </List.Accordion>
          </List.Section>
          <FlatList data={filteredAsCT} renderItem={({ item }) => (
            <View style={{ flexDirection: "row", height: 170, margin: 1, width: 135 }}>
              <ProductCardMemoized product={item} handleRefresh={handleRefreshToItemList} />
            </View>
          )}
                    numColumns={3}
                    keyExtractor={(item) => item.id.toString()} />
        </View>
        <View style={styles.innerContainer}>
          <View>
            <FlatList
              horizontal={false}
              data={filteredAsSaleList}
              refreshing={loading}
              renderItem={({ item }) => (
                <View style={{ flexDirection: "row" }}>
                  <SalesCardMemorized product={item} handlePress={handleRefreshToItemList} />
                </View>
              )}
              ListEmptyComponent={() => (
                <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                  <Text style={{ fontSize: 24, margin: 15 }}>There are no items in your cart</Text>
                </View>
              )}
            />
          </View>
          <View>
            <Text style={styles.info1}>
              Number of products:{lenghtOfSales}
            </Text>
            <Text style={styles.info1}>
              Total amount:{totalPrice.toString().substring(0, 6)}
            </Text>
            <TextInput
              value={count.toString()}
              onChangeText={(text) => {
                const numericRegex = /^[0-9]*$/;

                if (!numericRegex.test(text)) {
                  setCount(0);
                  Toast.show(
                    "You can only enter numerical values!",
                    {
                      duration: Toast.durations.SHORT
                    }
                  );
                  return;
                }
                handleTextChange(text);
              }}
              placeholder="Enter the Paid Amount"
              style={styles.info3}>
            </TextInput>
            <Divider style={{ marginVertical: 10, width: 270, height: 3 }}></Divider>
            <Text style={styles.info1}>
              {calculateRemainingAmount()}
            </Text>
          </View>
          <View>
            <Picker
            selectedValue={selectedCampaign}
            onValueChange={(itemValue) => {setSelectedCampaign(itemValue);campaignApply(itemValue)}}
            >
              <Picker.Item label="Bag 2 buy 1 pay" value="1"/>
              <Picker.Item label="Plate %20" value="2"/>
              <Picker.Item label="All %5" value="3"/>
            </Picker>
            <TouchableOpacity style={styles.belgeIptal} onPress={deleteData}>
              <Text style={styles.innerText}>
                Cancel All Document
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.belgeIptal} disabled={totalPrice!<=0} onPress={() => creditCardMethod()}>
              <Text style={styles.innerText}>
                Payment by Credit Card
              </Text>
            </TouchableOpacity>

            <TouchableOpacity disabled={isButtonActive()} style={{
              ...styles.payButton,
              backgroundColor: !isButtonActive() ? "#D4F6CC" : "#FA9494"
            }} onPress={() => setModalVisible(true)}>
              <Text style={styles.innerText}>
                E-Archive
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
                alignItems: "center"
              }}>
                <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, alignItems: "center" }}>
                  <Text style={{ marginBottom: 10 }}>Enter your email address:</Text>
                  <TextInput
                    style={{ borderColor: "gray", borderWidth: 1, width: 200, marginBottom: 10, padding: 5 }}
                    value={email}
                    onChangeText={setEmail}

                  />
                  <Button title="Send" onPress={sendRecipeToMail} />
                  <Button title="Cancel" onPress={() => setModalVisible(false)} />
                </View>
              </View>
            </Modal>
            <TouchableOpacity disabled={isButtonActive()} style={{
              ...styles.payButton,
              backgroundColor: !isButtonActive() ? "#D4F6CC" : "#FA9494"
            }} onPress={showDataInAlertSatisOnayla}>
              <Text style={styles.innerText}>
                Confirm Sale
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SalesScreen;



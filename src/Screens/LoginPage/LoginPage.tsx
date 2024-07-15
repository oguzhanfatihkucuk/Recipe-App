import React from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View, Vibration } from "react-native";
import styles from "./LoginPage.Style";
import { Divider, TextInput } from "react-native-paper";
import DeviceInfo from "react-native-device-info";
import myIp from "../../../assets/js/myIp";

const myImage = require("../../../assets/png/shopping2.png");

const API_URL = "http://" + myIp + ":3000/users";

//@ts-ignore
const LoginPage = ({ navigation }) => {


  // Kullanıcı adını tutan ve değişikliğini kontrol eden Hook.
  const [usercode, setText] = React.useState("");

  // Kullanıcı şifresini tutan ve değişikliğini kontrol eden Hook.
  const [password, setPassword] = React.useState("");

  // Yanlış data girilmesi sonucu text inputların rengini değiştirme için kullanıdığımız hook.
  const [textColor, setTextColor] = React.useState(true);


  /*
    DeviceInfo kütüphanesini kullanarak emulatorümüz bilgilerini edindiğimiz kısım.

    Bu kısım native tarafla haberleşerek Android Sistemi bilgileri elde eder.

    Elde edilen bilgiler giriş ekranında 'Uygulama Ismi', 'Cihaz Modeli', 'Sistem Versiyonu' bilgilerini

    ekrana text komponentleri yardımıyla gösterir.

  */
  let appName = DeviceInfo.getApplicationName();
  let model = DeviceInfo.getModel();
  let readableVersion = DeviceInfo.getReadableVersion();
  let systemVersion = DeviceInfo.getSystemVersion();

  //Vibration modülü ile cihaza 1 saniye boyunca titreşim göndermek için kullandığımız native çağrı.
  const startVibration = () => {
    Vibration.vibrate(1000);
  };

  // Mockoon servisinde gelen kullanıcı datalarını tutmak için kullanacağımız değişken.
  let data;
  let userPassword: any[], userName: any[];


  //Burada localhosta request atarak gelen response değerlerini 'data' değişkenimizde atıyoruz.
  const fetchMockBackendData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        new Error(`HTTP error! status: ${response.status}`);
      }
      data = await response.json();
      userPassword = data.map((user: any) => user.password);
      userName = data.map((user: any) => user.username);

      return data;
    } catch (error) {
      console.error("Error fetching mock backend data:", error);
      return null;
    }
  };


  /*
    Text inputlara girilen  userName ve userPassword değerlerini localhosttan gelen verilerle karşılaştırma yapıyoruz.

    Herhangi bir eşleşme olması halinda sisteme giriş yapılıyor fakat bilgiler uyuşmadığı takdirde cihaza vibrasyon verip

    Text ınputların renklerini kırmıza çevirerek kullanıcıya girdiği bilgilerin yanlış olduğunu gösteriyor.

  */

  function checkUser(userNameParam: any, passwordParam: any) {
    fetchMockBackendData().then(() => {
      for (let i = 0; i < 10; i++) {
        if (userName[i] == userNameParam && userPassword[i] == passwordParam) {
          navigation.navigate("app");
          break;
        } else {
          setTextColor(false);
          startVibration();
          console.log("vibrated");
        }
      }
    });
    return false;
  }

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View>
        <Image source={myImage} style={styles.image} />
        <View>
          <View>
            <TextInput
              label="User Name"
              value={usercode}
              style={{ ...styles.textinput, borderColor: textColor ? "white" : "#D71313" }}
              onChangeText={(text) => {
                setText(text); // Call setText as before
                setTextColor(true); // Call your new function
              }}
              cursorColor={"white"}
              keyboardType="numeric"
            />
            {textColor ? <View></View> : <Text style={styles.warningText}>Your Information was not correct</Text>}
            <TextInput
              label="Password"
              value={password}
              style={{ ...styles.textinput, borderColor: textColor ? "white" : "#D71313" }}
              onChangeText={(text) => {
                setPassword(text); // Call setText as before
                setTextColor(true); // Call your new function
              }}
              secureTextEntry={true}
              placeholderTextColor="#ccc"
              cursorColor={"white"}
            />
            {textColor ? <View></View> : <Text style={styles.warningText}>Your Information was not correct</Text>}
            <TouchableOpacity style={styles.button} onPress={() => checkUser(usercode, password)}
                              children={<Text style={styles.button_text}>Enter System</Text>} />
          </View>
          <TouchableOpacity children={<Text style={styles.password}>
            Forgot My Password
          </Text>} />

          <Divider style={{ height: 30, backgroundColor: "transparent" }}></Divider>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={styles.subButton} onPress={() => navigation.navigate("NFCPage")}>
              <Text style={{ color: "white" }}>
                NFC Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subButton}>
              <Text style={{ color: "white" }}>
                FingerPrint
              </Text>
            </TouchableOpacity>
          </View>
          <Divider style={{ height: 25, backgroundColor: "transparent" }}></Divider>
          <Text style={styles.info}>
            App Name: {appName}
          </Text>
          <Text style={styles.info}>
            Device Name: {model}
          </Text>
          <Text style={styles.info}>
            App Version : {readableVersion}
          </Text>
          <Text style={styles.info}>
            System Version: {systemVersion}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;

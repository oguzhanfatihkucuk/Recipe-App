import React from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View ,Vibration} from "react-native";
import styles from "./LoginPage.Style";
import { Divider, TextInput } from "react-native-paper";
import DeviceInfo from "react-native-device-info";
const myImage = require("../../../assets/png/shopping2.png");


const API_URL="http://192.168.1.25:3000/users";
//@ts-ignore
const LoginPage = ({ navigation }) => {


  const [usercode, setText] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [textColor, setTextColor] = React.useState(true);

  let appName = DeviceInfo.getApplicationName();
  let model = DeviceInfo.getModel();
  let readableVersion = DeviceInfo.getReadableVersion();
  let systemVersion = DeviceInfo.getSystemVersion();
  const startVibration=()=>{
    Vibration.vibrate(1000);
  }

  let data;
  let userPassword: any[],userName: any[];

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

  function checkUser(userNameParam: any, passwordParam: any) {
    fetchMockBackendData().then(()=> {for (let i = 0; i < 10; i++) {
      if (userName[i] == userNameParam && userPassword[i] == passwordParam){
        navigation.navigate("app");
        break;
      }
      else{
        setTextColor(false);
        startVibration();
      }
    }});
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
              style={{ ...styles.textinput, borderColor: textColor ? 'white' : '#D71313'}}
              onChangeText={(text) => {
                setText(text); // Call setText as before
                setTextColor(true); // Call your new function
              }}
              cursorColor={"white"}
              keyboardType="numeric"
            />
            {textColor? <View></View> : <Text style={styles.warningText}>Your Information was not correct</Text>}
            <TextInput
              label="Password"
              value={password}
              style={{ ...styles.textinput, borderColor: textColor ? 'white' : '#D71313'}}
              onChangeText={(text) => {
                setPassword(text); // Call setText as before
                setTextColor(true); // Call your new function
              }}
              secureTextEntry={true}
              placeholderTextColor="#ccc"
              cursorColor={"white"}
            />
            {textColor? <View></View> : <Text style={styles.warningText}>Your Information was not correct</Text>}
            <TouchableOpacity style={styles.button} onPress={() => checkUser(usercode, password)}
                              children={<Text style={styles.button_text}>Giriş Yap</Text>} />
          </View>
          <TouchableOpacity children={<Text style={styles.password} >
            Sifremi Unuttum
          </Text>} />

          <Divider style={{ height: 30, backgroundColor: "transparent" }}></Divider>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={styles.subButton} onPress={()=>navigation.navigate("NFCPage")}>
              <Text>
                Press With NFC Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subButton}>
              <Text>
                Press With FingerPrint
              </Text>
            </TouchableOpacity>
          </View>
          <Divider style={{height:25,backgroundColor:"transparent"}}></Divider>
          <Text style={styles.info}>
            App Name:  {appName}
          </Text>
          <Text style={styles.info}>
            Device Name:  {model}
          </Text>
          <Text style={styles.info}>
            App Version : {readableVersion}
          </Text>
          <Text style={styles.info}>
            System Version:  {systemVersion}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;

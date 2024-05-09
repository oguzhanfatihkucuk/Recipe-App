import React, { useEffect, useState } from "react";
import { Image, NativeModules, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import styles from "./LoginPage.Style";
import { Divider, TextInput } from "react-native-paper";
import DeviceInfo, { getIpAddress } from "react-native-device-info";

const myImage = require("../../../Assets/recipe-book.png");

//@ts-ignore
const LoginPage = ({ navigation }) => {

  function goToCategoryPage() {
    navigation.navigate("app");
  }

  const [usercode, setText] = React.useState("");
  const [password, setPassword] = React.useState("");
  let appName = DeviceInfo.getApplicationName();
  let model = DeviceInfo.getModel();
  let readableVersion = DeviceInfo.getReadableVersion();
  let systemVersion = DeviceInfo.getSystemVersion();
  const [validationMessage, setValidationMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Optional loading indicator

  const MOCK_BACKEND_URL = "http://192.168.1.25:3000/users";

  let data;
  let userPassword: any[],userName: any[], firstName: any[];

  const fetchMockBackendData = async () => {
    try {
      const response = await fetch(MOCK_BACKEND_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      data = await response.json();
      userPassword = data.map((user: any) => user.password);
      userName = data.map((user: any) => user.username);
      console.log(userPassword[0]);
      console.log(userName[0]);
      return data;
    } catch (error) {
      console.error("Error fetching mock backend data:", error);
      return null;
    }
  };

  function checkUser(userNameParam: any, passwordParam: any) {
    console.log("hi");
    fetchMockBackendData().then(r => {for (let i = 0; i < 10; i++) {
      if (userName[i] == userNameParam && userPassword[i] == passwordParam){
        navigation.navigate("app");
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
              label="User Code"
              value={usercode}
              style={styles.textinput}
              onChangeText={text => setText(text)}
              cursorColor={"white"}
              keyboardType="numeric"
            />
            <TextInput
              label="Password"
              value={password}
              style={styles.textinput}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              placeholderTextColor="#ccc"
              cursorColor={"white"}
            />
            <TouchableOpacity style={styles.button} onPress={() => checkUser(usercode, password)}
                              children={<Text style={styles.button_text}>Giriş Yap</Text>} />
          </View>
          <TouchableOpacity children={<Text style={styles.password} onPress={fetchMockBackendData}>
            Sifremi Unuttum
          </Text>} />
          <Divider style={{ height: 30, backgroundColor: "transparent" }}></Divider>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={styles.subButton}>
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
        </View>
      </View>
      <Text>
        {appName}
      </Text>
      <Text>
        {model}
      </Text>
      <Text>
        {readableVersion}
      </Text>
      <Text>
        {systemVersion}
      </Text>
    </SafeAreaView>
  );
};

export default LoginPage;

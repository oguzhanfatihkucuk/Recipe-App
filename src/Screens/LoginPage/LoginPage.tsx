import React from "react";
import {Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import styles from "./LoginPage.Style";
import { Divider, TextInput } from "react-native-paper";

const myImage = require("../../../Assets/recipe-book.png");

//@ts-ignore
const LoginPage = ({navigation}) => {

  function goToCategoryPage() {
    navigation.navigate('app');
  }

  const [usercode, setText] = React.useState("");
  const [password, setPassword] = React.useState("");


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
            <TouchableOpacity style={styles.button} onPress={goToCategoryPage} children={<Text style={styles.button_text}>Giriş Yap</Text>} />
          </View>
          <TouchableOpacity children={<Text style={styles.password}>
            Sifremi Unuttum
          </Text>} />
          <Divider style={{height:30,backgroundColor:"transparent"}}></Divider>
          <View style={{flexDirection:"row"}}>
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
    </SafeAreaView>
  );
};

export default LoginPage;

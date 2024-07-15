import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import styles from "../../Components/SalesCard/SalesCardStyle.tsx";
import { deleteItemToTuple, countItems, addItemToTuple, deleteItemFromTuple } from "../../../assets/js/myTuple";



//@ts-ignore
const SalesCard = ({ product , handlePress }) => {

  /*
  Sepetimizde var olan ürünlerin, belirtirlen ID değerinde olanların hepsini kaldıran fonksiyon.

  Sepetimizdeki ürünlerin bulundukları card komponenetine uzun basıldığı takdirde ekrana bir alert mesajı çıkar.
  Belirtilen mesajda "ok" a basılması sonucunda belirtilen ürünün miktarı farketmeksizin sepetten kaldırılır.

  'deleteItemFromTuple' ile productID değeri ,myTuple yani sepetteki ürünlerin bulunduğu listeden kaldırılır.
  */
//@ts-ignore
  const handleLongPress = (productId) => {

    Alert.alert(
      'Warning',
      `Are you sure you want to delete the product with ID: ${productId}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteItemFromTuple(productId);
            handlePress();
          }
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity style={styles.toucable} onLongPress={() => handleLongPress(product.id)} >
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>{product.title}</Text>
          <Text style={styles.text2}>Id:{product.id}</Text>
        </View>
        <View>
          <Text style={styles.text3} numberOfLines={2}>KDV{'\n'}%1</Text>
        </View>
        <View>
          <Text style={styles.text4}>Price: ${product.price || 'N/A'}</Text>
          <Text style={styles.text3}>Quantity: {countItems(product.id)} </Text>
        </View>
        <View>
          <TouchableOpacity style={{alignItems:"center",height:23,width:23,backgroundColor:"green",borderRadius:3,marginBottom:1}} onPress={() => {
            addItemToTuple(product.id);
            handlePress();
          }}>
            <Text style={{color:"white",fontSize:20}}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems:"center",height:23,width:23,backgroundColor:"red",borderRadius:3}} onPress={()=>{
            deleteItemToTuple(product.id);
            handlePress();
            }}>
            <Text style={{color:"white",fontSize:20}}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SalesCard;

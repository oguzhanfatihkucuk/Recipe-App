import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import styles from "../../Components/ProductCard/productCardStyle.tsx";
import { addItemToTuple, myTuple } from "../../../assets/js/myTuple.js";

//@ts-ignore
const ProductCard = ({ product }) => {

  //@ts-ignore
  const createTwoButtonAlert = (productId, productTitle) =>
    Alert.alert( 'Product Details',
      `Product ID: ${productId}\nProduct Title: ${productTitle}\nItem Succesfully Added Your List`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  //@ts-ignore
  const handlePress = (productId,productTitle) => {
    addItemToTuple(productId);
    createTwoButtonAlert(productId, productTitle);
  };

  //@ts-ignore
  return (
    <TouchableOpacity  onPress={()=>handlePress(product.id, product.title)} style={styles.toucable} >
      <View style={styles.container}>
        <Image source={{ uri: product.imageUrl }} style={styles.image} />
        <Text style={styles.text}>{product.title}</Text>
        <Text>Price: ${product.price || 'N/A'}</Text>
        <Text numberOfLines={2}>{product.description}</Text>
      </View>
    </TouchableOpacity>

  );
};

export default ProductCard;

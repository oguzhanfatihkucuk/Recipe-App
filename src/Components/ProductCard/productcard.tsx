import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "../../Components/ProductCard/productCardStyle.tsx";
import { addItemToTuple, myTuple } from "../../../assets/js/myTuple.js";
//@ts-ignore
const ProductCard = ({ product }) => {

  //@ts-ignore
  const handlePress = (productId) => {
    addItemToTuple(productId)
  };

  //@ts-ignore
  return (
    <TouchableOpacity  onPress={()=>handlePress(product.id)} style={styles.toucable} >
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

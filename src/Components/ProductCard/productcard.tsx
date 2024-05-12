import React from 'react';
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "../../Components/ProductCard/productCardStyle.tsx";

//@ts-ignore
const ProductCard = ({ product }) => {
  return (
    <TouchableOpacity style={styles.toucable} >
      <View style={styles.container}>
        <Image source={{ uri: product.imageUrl   }} style={styles.image} />
        <Text style={styles.text}>{product.title}</Text>
        <Text>Price: ${product.price || 'N/A'}</Text>
        <Text numberOfLines={2}>{product.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

import React from "react";
import { View, Text, Image, TouchableOpacity, Alert, ToastAndroid } from "react-native";
import styles from "../../Components/ProductCard/productCardStyle.tsx";
import { addItemToTuple} from "../../../assets/js/myTuple.js";
import Toast from 'react-native-root-toast';
//@ts-ignore
const ProductCard = ({ product }) => {

  //@ts-ignore
  const handlePress = (productId,productTitle) => {
    addItemToTuple(productId);
    Toast.show(
      `Product ID: ${productId}\nProduct Title: ${productTitle}\nItem Successfully Added to Your List`,
      {
        duration: Toast.durations.SHORT,
      }
    );
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

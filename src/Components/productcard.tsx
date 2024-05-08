import React from 'react';
import { View, Text, Image, TouchableOpacity } from "react-native";


//@ts-ignore
const ProductCard = ({ product }) => {
  return (
    <TouchableOpacity style={{height:160,width:130,margin:3}} >
      <View style={{ flex: 5, padding: 10, borderWidth: 1, borderRadius: 5, margin: 5 }}>
        <Image source={{ uri: product.imageUrl || 'placeholder.png' }} style={{ width: 50, height: 50 }} />
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{product.title}</Text>
        <Text>Price: ${product.price || 'N/A'}</Text>
        <Text numberOfLines={2}>{product.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal, TextInput, Button } from "react-native";
import styles from "../../Components/ProductCard/productCardStyle.tsx";
import { addItemToTuple } from "../../../assets/js/myTuple.js";
import Toast from 'react-native-root-toast';

// @ts-ignore
const ProductCard = ({ product, handleRefresh }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState('');

  // @ts-ignore
  const handlePress = (productId, productTitle) => {
    addItemToTuple(productId);
    handleRefresh && handleRefresh();
    Toast.show(
      `Product ID: ${productId}\nProduct Title: ${productTitle}\nItem Successfully Added to Your List`,
      {
        duration: Toast.durations.SHORT,
      }
    );
  };

  const handleLongPress = () => {
    setModalVisible(true);
  };

  const handleAddToCart = () => {
    const productId = product.id;
    const productTitle = product.title;
    const productQuantity = parseInt(quantity, 10);

    if (isNaN(productQuantity) || productQuantity <= 0) {
      Toast.show('Please enter a valid quantity.', { duration: Toast.durations.SHORT });
      return;
    }

    for (let i = 0; i < productQuantity-1; i++) {
      addItemToTuple(productId);
    }

    addItemToTuple( productId);
    setModalVisible(false);
    setQuantity('');
    handleRefresh && handleRefresh();
    Toast.show(
      `Product ID: ${productId}\nProduct Title: ${productTitle}\nQuantity: ${productQuantity}\nItem Successfully Added to Your List`,
      {
        duration: Toast.durations.SHORT,
      }
    );
  };

  return (
    <>
      <TouchableOpacity onPress={() => handlePress(product.id, product.title)} onLongPress={handleLongPress} style={styles.toucable}>
        <View style={styles.container}>
          <Image source={{ uri: product.imageUrl }} style={styles.image} />
          <Text style={styles.text}>{product.title}</Text>
          <Text>Price: ${product.price || 'N/A'}</Text>
          <Text numberOfLines={2}>{product.description}</Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={{ uri: product.imageUrl }} style={styles.modalImage} />
            <Text style={styles.modalTitle}>{product.title}</Text>
            <Text style={styles.modalDescription}>{product.description}</Text>
            <Text>Price: ${product.price || 'N/A'}</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter quantity"
              keyboardType="numeric"
              value={quantity}
              onChangeText={setQuantity}
            />
            <Button title="Add to Cart" onPress={handleAddToCart} />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
};
export default ProductCard;

import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal, TextInput, Button } from "react-native";
import styles from "../../Components/ProductCard/productCardStyle.tsx";
import { addItemToTuple } from "../../../assets/js/myTuple.js";
import Toast from 'react-native-root-toast';


/*
Bu komponent 'product' datalarından gelen ürünlerin 'Products' adlı sayfada görüntülendiği komponenttir.

Temel olarak 2 ana fonksiyonu vardır:
Ürünü sepete ekleme.
Birden çok ürünü sepete ekleme.

Ürünlerin sepete eklendikten sonra mevcut myTuple listesini de referans ile 'handleRefresh' fonksiyonu ile tekrardan
yenileyerek sepetteki ürünlerin güncel olmasını sağlıyor.

*/
// @ts-ignore
const ProductCard = ({ product, handleRefresh }) => {

  /* Çoklu ürün eklemek için gösterilen modal. */
  const [modalVisible, setModalVisible] = useState(false);

  /* Çoklu ürün ekleme sırasında kaç adet ürün eklemizi isteyen modalda girilen int değer. */
  const [quantity, setQuantity] = useState('');




  /*

  Bu komponentin üstüne tek tıklama sonucunda çağırılan fonksiyon.

  ProductId ve productTitle değişkenlerini referans olarak alır. Bu datalar 'products' datalarından gelir.

  Tek tıklama sonucu 'productId' değişkeni 'addItemToTuple' ile sepetteki ürünlerin listesine ID değişkenimiz eklenir.

  Ardından bir Toast mesajı ile başarılı ekleme sonucu kulanıcıya bilgi amaçlı ürün ID ve ürün başlığını ekrana gönderir.

  */
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


  /*Komponente uzun basıldığında çağırılan fonksiyon.Tek görevi modalı görünür yapmak.*/
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

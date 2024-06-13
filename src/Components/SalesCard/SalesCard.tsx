import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import styles from "../../Components/SalesCard/SalesCardStyle.tsx";
import { deleteItemToTuple,countItems} from "../../../assets/js/myTuple";



//@ts-ignore
const SalesCard = ({ product , handlePress}) => {

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
            deleteItemToTuple(productId);
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
      </View>
    </TouchableOpacity>
  );
};

export default SalesCard;

import React from "react";
import { View, Text, TouchableOpacity} from "react-native";
import styles from "../../Components/SalesCard/SalesCardStyle.tsx";

//@ts-ignore
const SalesCard = ({ product }) => {

  return (
    <TouchableOpacity style={styles.toucable} >
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>{product.title}</Text>
          <Text style={styles.text}>Id:{product.id}</Text>
        </View>
        <View>
          <Text style={styles.text} numberOfLines={2}>KDV{'\n'}%1</Text>
        </View>
        <View>
          <Text style={styles.text}>Price: ${product.price || 'N/A'}</Text>
        </View>
      </View>
    </TouchableOpacity>

  );
};

export default SalesCard;

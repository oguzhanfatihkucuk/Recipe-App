import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { List } from "react-native-paper";
import ProductCard from "../../../../../Components/ProductCard/productcard.tsx";
import LoadingAnimation from "../../../../../Components/Loading/Loading.tsx";
import { getNumColumns } from '../../../../../../assets/js/deviceutils';
import { fetchMockBackendData } from "../../../../../../services/fetchingData/fetchData";
import StoreStatusText from "../../../../../Components/StoreIcon/StoreStatusText.tsx";
const ProductFilteredPrice = () => {

  const ProductCardMemoized = React.memo(ProductCard);
  const numColumns = getNumColumns();

  useEffect(() => {
    setLoading(false); // Call the function on component mount
  }, []);

  const [data2, setData] = useState<any[]>([]);
  const [pricTerm, setpricTerm] = useState(0);
  const [loading, setLoading] = useState(true);

  let data;

  const fetchDataFromMockBackend = async () => {
    try {
      data = await fetchMockBackendData();
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filteredAsPR = data2.filter((item) => {
    const itemPrice = item.price; // Extract the price from the product item

    switch (pricTerm) {
      case 0:
        return itemPrice >= 0;
      case 1:
        return itemPrice >= 0 && itemPrice <= 10;
      case 2:
        return itemPrice >= 10 && itemPrice <= 50;
      case 3:
        return itemPrice >= 50 && itemPrice <= 100;
      case 4:
        return itemPrice >= 100 && itemPrice <= 500;
      case 5:
        return itemPrice >= 500 ;
      default:
        return false;
    }
  });
  //@ts-ignore
  const handlePriceTermPress = (priceTerm) => {
    fetchDataFromMockBackend();
    setLoading(true);
    setpricTerm(priceTerm);
  };

  // @ts-ignore
  return (
      <View>
        <StoreStatusText />
        <List.Section>
          <List.Accordion
            title="Choose Price Range"
            left={props => <List.Icon {...props} icon="folder" />}
          >
            {[
              { title: "0-10", priceTerm: 1 },
              { title: "10-50", priceTerm: 2 },
              { title: "50-100", priceTerm: 3 },
              { title: "100-500", priceTerm: 4 },
              { title: "500-", priceTerm: 5 }
            ].map(item => (
              <List.Item
                key={item.priceTerm}
                title={item.title}
                onPress={() => handlePriceTermPress(item.priceTerm)}
              />
            ))}
          </List.Accordion>
        </List.Section>
        <Text>
          {filteredAsPR.length} items found
        </Text>
        {loading ? (
          // isLoading true ise yükleme bileşenini döndür
          <LoadingAnimation />
        ) : (
          // isLoading false ise FlatList bileşenini döndür
          <FlatList
            data={filteredAsPR}
            renderItem={({ item }) => (
              <View style={{ flexDirection: "row" }}>
                <ProductCardMemoized product={item} />
              </View>
            )}
            numColumns={numColumns}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </View>

  );
};


export default ProductFilteredPrice;

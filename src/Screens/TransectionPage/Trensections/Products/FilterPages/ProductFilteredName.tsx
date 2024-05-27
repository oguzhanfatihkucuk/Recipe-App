import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { List } from "react-native-paper";
import ProductCard from "../../../../../Components/ProductCard/productcard.tsx";
import LoadingAnimation from "../../../../../Components/Loading/Loading.tsx";
import { getNumColumns } from '../../../../../../assets/js/deviceutils';
import { fetchMockBackendData } from "../../../../../../services/fetchingData/fetchData";
import StoreStatusText from "../../../../../Components/StoreIcon/StoreStatusText.tsx";

const ProductFilteredName = () => {
  const numColumns = getNumColumns();

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [nameTerm, setNameTerm] = useState("all"); // Varsayılan olarak tüm harfleri göster

  const ProductCardMemoized = React.memo(ProductCard);

  useEffect(() => {
    setLoading(false); // Component mount olduğunda verileri getir
  }, []);

  const fetchDataFromMockBackend = async () => {
    try {
      const fetchedData = await fetchMockBackendData();
      setData(fetchedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // Hata durumunda loading durumunu false olarak güncelle
    }
  };

  const handleLetterPress = (letter: string) => {
    setLoading(true);
    setNameTerm(letter.toLowerCase());

    fetchDataFromMockBackend();
  };

  const filteredProducts = data.filter((item) => {
    const firstLetter = item.title.toLowerCase()[0];
    switch (nameTerm) {
      case "a-e":
        return firstLetter >= "a" && firstLetter <= "e";
      case "f-j":
        return firstLetter >= "f" && firstLetter <= "j";
      case "k-o":
        return firstLetter >= "k" && firstLetter <= "o";
      case "p-q":
        return firstLetter >= "p" && firstLetter <= "q";
      case "r-v":
        return firstLetter >= "r" && firstLetter <= "v";
      case "w-z":
        return firstLetter >= "w" && firstLetter <= "z";
      default:
        return true; // Varsayılan olarak tüm ürünleri göster
    }
  });

  return (
    <View>
      <StoreStatusText />
      <List.Section>
        <List.Accordion
          title="Choose First Letter Range"
          left={props => <List.Icon {...props} icon="folder" />}
        >
          {[
            { title: "A-E", letter: "a-e" },
            { title: "F-J", letter: "f-j" },
            { title: "K-O", letter: "k-o" },
            { title: "P-Q", letter: "p-q" },
            { title: "R-V", letter: "r-v" },
            { title: "W-Z", letter: "w-z" },
          ].map(item => (
            <List.Item
              key={item.letter}
              title={item.title}
              onPress={() => handleLetterPress(item.letter)}
            />
          ))}
          <List.Item
            title="Show All"
            onPress={() => handleLetterPress("all")}
          />
        </List.Accordion>
      </List.Section>

      <Text>
        {filteredProducts.length} items found
      </Text>
      {loading ? (
            <LoadingAnimation />
      ) : (
        // Loading durumu false ise FlatList ile filtrelenmiş ürünleri göster
        <FlatList
          data={filteredProducts}
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

export default ProductFilteredName;

import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView,View } from "react-native";
import ProductCard from "../../../../../Components/ProductCard/productcard.tsx";
import LoadingAnimation from "../../../../../Components/Loading/Loading.tsx";
import { getNumColumns } from '../../../../../../assets/js/deviceutils';
import { fetchMockBackendData } from "../../../../../../services/fetchingData/fetchData";
import StoreStatusText from "../../../../../Components/StoreIcon/StoreStatusText.tsx"; // DeviceUtils.js dosyasını içe aktarın

const AllProducts = () => {

  const numColumns = getNumColumns();

  useEffect(() => {
    fetchDataFromMockBackend(); // Call the function on component mount
  }, []);

  const [data2, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const sortedAsPriceLowest = data2.filter((item) => item.category.toLowerCase().startsWith("")).slice().sort((a, b) => a.price - b.price);
  const sortedAsPriceHigh = data2.filter((item) => item.category.toLowerCase().startsWith("")).slice().sort((a, b) => b.price - a.price);
  const sortedAlphabetically = data2
    .filter((item) => item.category && item.category.toLowerCase().startsWith(""))
    .slice()
    .sort((a, b) => {
      const nameA = a.title ? a.title.toLowerCase() : "";
      const nameB = b.title ? b.title.toLowerCase() : "";
      return nameA.localeCompare(nameB);
    });

  const sortedAlphabeticallyDesc = data2
    .filter((item) => item.category && item.category.toLowerCase().startsWith(""))
    .slice()
    .sort((a, b) => {
      const nameA = a.title ? a.title.toLowerCase() : "";
      const nameB = b.title ? b.title.toLowerCase() : "";
      return nameB.localeCompare(nameA);  // Reverse the comparison
    });







  let data;
  const ProductCardMemoized = React.memo(ProductCard);
  const fetchDataFromMockBackend = async () => {
    try {
      data = await fetchMockBackendData();
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (loading) {
    return <LoadingAnimation />;
  }
  // @ts-ignore
  return (
    <SafeAreaView>
      <StoreStatusText />
      <View>
        <FlatList
          data={sortedAlphabeticallyDesc}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row" }}>
              <ProductCardMemoized product={item} handleRefresh={()=>{}}/>
            </View>
          )}
          numColumns={numColumns}
          keyExtractor={(item) => item.id.toString()} />
      </View>
    </SafeAreaView>
  );
};


export default AllProducts;

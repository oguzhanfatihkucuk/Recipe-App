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
          data={data2}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row" }}>
              <ProductCardMemoized product={item} />
            </View>
          )}
          numColumns={numColumns}
          keyExtractor={(item) => item.id.toString()} />
      </View>

    </SafeAreaView>
  );
};


export default AllProducts;

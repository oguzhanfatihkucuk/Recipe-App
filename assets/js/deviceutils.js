import { Platform, Dimensions } from 'react-native';

//Uygulamanın çalıştığı cihazın boyutlarına göre Products ekranın kaç adet yanyana ürün gösterileceğini döndüren fonksiyon.
export const getNumColumns = () => {
  const { width, height } = Dimensions.get('window');
  let numColumns = 3;

  if (Platform.OS === 'tablet' || (width > 600 && height > 600)) {
    numColumns = 9;
  }

  return numColumns;
};

import { Platform, Dimensions } from 'react-native';

export const getNumColumns = () => {
  const { width, height } = Dimensions.get('window');
  let numColumns = 3; // Varsayılan değer

  if (Platform.OS === 'tablet' || (width > 600 && height > 600)) {
    numColumns = 9;
  }

  return numColumns;
};

import { View, Text as DefaultText, TextProps, ViewProps } from "react-native";
import React from "react";


type ThemeProps = {
  isDarkMode?: boolean; // Karanlık mod durumu isteğe bağlı
};

// Özel Text bileşenini tanımla
export function Text(props: TextProps & ThemeProps) {
  const { isDarkMode, style, ...rest } = props; // Props'tan isDarkMode, style ve diğer özellikleri al

  return (
    <DefaultText
      style={[
        style, // Kullanıcının verdiği stil
        {
          color: isDarkMode ? "white" : "black", // Karanlık moddaysa beyaz, değilse siyah renk
          opacity: isDarkMode ? 1 : 1 // Opaklık ayarı (her iki durumda da 1)
        }
      ]}
      {...rest} // Diğer tüm props'u geçir
    />
  );
}

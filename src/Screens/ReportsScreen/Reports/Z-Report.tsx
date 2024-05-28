import React, {} from "react";
import { Alert, Button, FlatList, Platform, SafeAreaView, Text, View } from "react-native";
import { reports, reportsOffline } from "../../../../assets/js/reports";
import RNHTMLtoPDF from 'react-native-html-to-pdf';
const ZReports = () => {


  //@ts-ignore
  const createPDF = async (index,item) => {

    try {
      let PDFOptions = {
        html: `<h2>${item}</h2>`,
        fileName: "report"+index.toString(),
        directory: Platform.OS === 'android' ? 'Downloads' : 'Documents',
      };
      let file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) return;
      Alert.alert("PDF file saved your local devices Successfully","Your file directory is "+file.filePath);

    } catch (error) {
      // @ts-ignore
      console.log('Failed to generate pdf', error.message);
    }
  };

  //@ts-ignore
  const renderItem = ({ item, index }) => {
    const onPressButton = () => {
      Alert.alert(
        'Rapor',
        `Rapor ${index + 1}: ${item}`,
        [
          {
            text: 'Yazdır',
            //@ts-ignore
            onPress: () => createPDF(index,item),
          },
          {
            text: 'Kapat',
          },
        ],
        { cancelable: false },
      );

    };

    return (
      <View style={{ marginVertical: 5, flexDirection: 'row' }}>
        <Button title={`Rapor ${index + 1}`} onPress={onPressButton} />
      </View>
    );
  };

  // @ts-ignore
  return (
    <SafeAreaView>
      <View style={{flexDirection:"row"}}>
        <Text>
          Sended recipts.
        </Text>
        <FlatList
          data={reports}
          style={{margin:20}}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <Text>
          Haven't Sended recipts.
        </Text>
        <FlatList
          data={reportsOffline}
          style={{margin:20}}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};


export default ZReports;

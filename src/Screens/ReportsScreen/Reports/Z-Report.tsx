import React, {} from "react";
import { Alert, Button, FlatList, Platform, SafeAreaView, Text, View } from "react-native";
import { reports, reportsOffline } from "../../../../assets/js/reports";
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { PieChart } from "react-native-gifted-charts";
const ZReports = () => {

  const now = new Date();
  //@ts-ignore
  const createPDF = async (index,item) => {
    const formattedTime = now.toTimeString().split(' ')[0].replace(/:/g, '_');
    try {
      let PDFOptions = {
        html: `<h2>${item}</h2>`,
        fileName: "report"+index.toString()+"-"+formattedTime,
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
  const renderLegend = (text, color) => {
    return (
      <View style={{flexDirection: 'row', marginBottom: 12}}>
        <View
          style={{
            height: 18,
            width: 18,
            marginRight: 10,
            borderRadius: 4,
            backgroundColor: color || 'white',
          }}
        />
        <Text style={{color: 'white', fontSize: 16}}>{text || ''}</Text>
      </View>
    );
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
        <Text style={{margin:5,marginVertical:15,textAlign:"center",fontSize:18}}>
          Sended recipts.
        </Text>
        <FlatList
          data={reports}
          style={{margin:20}}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <Text style={{margin:5,marginVertical:15,textAlign:"center",fontSize:18}}>
          Haven't Sended recipts.
        </Text>
        <FlatList
          data={reportsOffline}
          style={{margin:20}}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />

        <View >
          <View>
            <View
              style={{
                height:340,
                marginVertical: 15,
                borderRadius: 10,
                marginHorizontal:20,
                paddingVertical: 5,
                backgroundColor: '#414141',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 32,
                  fontWeight: 'bold',
                  marginBottom: 12,
                }}>
                Total Revenue ($)
              </Text>
              <PieChart
                strokeColor="white"
                strokeWidth={4}
                donut
                data={[
                  {value: 30, color: 'rgb(84,219,234)'},
                  {value: 40, color: 'lightgreen'},

                ]}
                innerCircleColor="#414141"
                innerCircleBorderWidth={4}
                innerCircleBorderColor={'white'}
                showValuesAsLabels={true}
                showText
                textSize={18}
                showTextBackground={true}
                centerLabelComponent={() => {
                  return (
                    <View>
                      <Text style={{color: 'white', fontSize: 36}}>70</Text>
                      <Text style={{color: 'white', fontSize: 18}}>Total</Text>
                    </View>
                  );
                }}
              />
              <View
                style={{
                  width: '42%',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: 20,
                }}>
                {renderLegend('Credit Card', 'rgb(84,219,234)')}
                {renderLegend('Cash', 'lightgreen')}
              </View>
            </View>
          </View>

          <View>
            <View
              style={{
                height:340,
                marginVertical: 10,
                borderRadius: 10,
                marginHorizontal:15,
                paddingVertical: 5,
                backgroundColor: '#414141',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 32,
                  fontWeight: 'bold',
                  marginBottom: 12,
                }}>
                Total Revenue ($)
              </Text>
              <PieChart
                strokeColor="white"
                strokeWidth={4}
                donut
                data={[
                  {value: 30, color: 'rgb(84,219,234)'},
                  {value: 40, color: 'lightgreen'},

                ]}
                innerCircleColor="#414141"
                innerCircleBorderWidth={4}
                innerCircleBorderColor={'white'}
                showValuesAsLabels={true}
                showText
                textSize={18}
                showTextBackground={true}
                centerLabelComponent={() => {
                  return (
                    <View>
                      <Text style={{color: 'white', fontSize: 36}}>70</Text>
                      <Text style={{color: 'white', fontSize: 18}}>Total</Text>
                    </View>
                  );
                }}
              />
              <View
                style={{
                  width: '42%',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: 5,
                }}>
                {renderLegend('Credit Card', 'rgb(84,219,234)')}
                {renderLegend('Cash', 'lightgreen')}
              </View>
            </View>
          </View>
        </View>
        <View >
          <View>
            <View
              style={{
                height:340,
                marginVertical: 15,
                borderRadius: 10,
                marginHorizontal:20,
                paddingVertical: 5,
                backgroundColor: '#414141',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 32,
                  fontWeight: 'bold',
                  marginBottom: 12,
                }}>
                Total Revenue ($)
              </Text>
              <PieChart
                strokeColor="white"
                strokeWidth={4}
                donut
                data={[
                  {value: 30, color: 'rgb(84,219,234)'},
                  {value: 40, color: 'lightgreen'},

                ]}
                innerCircleColor="#414141"
                innerCircleBorderWidth={4}
                innerCircleBorderColor={'white'}
                showValuesAsLabels={true}
                showText
                textSize={18}
                showTextBackground={true}
                centerLabelComponent={() => {
                  return (
                    <View>
                      <Text style={{color: 'white', fontSize: 36}}>70</Text>
                      <Text style={{color: 'white', fontSize: 18}}>Total</Text>
                    </View>
                  );
                }}
              />
              <View
                style={{
                  width: '42%',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: 20,
                }}>
                {renderLegend('Credit Card', 'rgb(84,219,234)')}
                {renderLegend('Cash', 'lightgreen')}
              </View>
            </View>
          </View>

          <View>
            <View
              style={{
                height:340,
                marginVertical: 10,
                borderRadius: 10,
                marginHorizontal:15,
                paddingVertical: 5,
                backgroundColor: '#414141',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 32,
                  fontWeight: 'bold',
                  marginBottom: 12,
                }}>
                Total Revenue ($)
              </Text>
              <PieChart
                strokeColor="white"
                strokeWidth={4}
                donut
                data={[
                  {value: 30, color: 'rgb(84,219,234)'},
                  {value: 40, color: 'lightgreen'},

                ]}
                innerCircleColor="#414141"
                innerCircleBorderWidth={4}
                innerCircleBorderColor={'white'}
                showValuesAsLabels={true}
                showText
                textSize={18}
                showTextBackground={true}
                centerLabelComponent={() => {
                  return (
                    <View>
                      <Text style={{color: 'white', fontSize: 36}}>70</Text>
                      <Text style={{color: 'white', fontSize: 18}}>Total</Text>
                    </View>
                  );
                }}
              />
              <View
                style={{
                  width: '42%',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: 5,
                }}>
                {renderLegend('Credit Card', 'rgb(84,219,234)')}
                {renderLegend('Cash', 'lightgreen')}
              </View>
            </View>
          </View>
        </View>




      </View>

    </SafeAreaView>
  );
};


export default ZReports;

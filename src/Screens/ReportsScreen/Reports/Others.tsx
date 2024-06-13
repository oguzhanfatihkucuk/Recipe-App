import React, {} from "react";
import { SafeAreaView, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import {
  getNumberOfCashSale,
  getNumberOfCreditCardSale,
  getTotalLenghtCash, getTotalLenghtCreditCard,
  getTotalRevenueCash,
  getTotalRevenueCreditCard
} from "../../../../assets/js/reports.js";

const OtherReports = () => {
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


  // @ts-ignore
  return (
    <SafeAreaView>
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
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
                  {value: getTotalRevenueCreditCard(), color: 'rgb(84,219,234)'},
                  {value: getTotalRevenueCash(), color: 'lightgreen'},

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
                      <Text style={{color: 'white', fontSize: 36}}>{getTotalRevenueCreditCard()+getTotalRevenueCash()}</Text>
                      <Text style={{color: 'white', fontSize: 18}}>Total</Text>
                    </View>
                  );
                }}
              />
              <View
                style={{
                  width: '60%',
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
                Number Of Products (Quantity)
              </Text>
              <PieChart
                strokeColor="white"
                strokeWidth={4}
                donut
                data={[
                  {value: getTotalLenghtCash(), color: 'lightgreen'},
                  {value: getTotalLenghtCreditCard(), color: 'rgb(84,219,234)'},

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
                      <Text style={{color: 'white', fontSize: 36}}>{getTotalLenghtCreditCard()+getTotalLenghtCash()}</Text>
                      <Text style={{color: 'white', fontSize: 18}}>Total</Text>
                    </View>
                  );
                }}
              />
              <View
                style={{
                  width: '60%',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: 5,
                }}>
                {renderLegend('Credit CardCash', 'rgb(84,219,234)')}
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
                Total Sale (Quantity)
              </Text>
              <PieChart
                strokeColor="white"
                strokeWidth={4}
                donut
                data={[

                  {value: getNumberOfCashSale(), color: 'lightgreen'},
                  {value: getNumberOfCreditCardSale(), color: 'rgb(84,219,234)'},

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
                      <Text style={{color: 'white', fontSize: 36}}>{getNumberOfCreditCardSale()+getNumberOfCashSale()}</Text>
                      <Text style={{color: 'white', fontSize: 18}}>Total</Text>
                    </View>
                  );
                }}
              />
              <View
                style={{
                  width: '60%',
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


          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};


export default OtherReports;

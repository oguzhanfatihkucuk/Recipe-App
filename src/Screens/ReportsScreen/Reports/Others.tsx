import React, {} from "react";
import { SafeAreaView, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import {getNumberOfCashSale, getNumberOfCreditCardSale,getTotalRevenueCash,getTotalRevenueCreditCard} from "../../../../assets/js/myTuple";

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
      <View style={{flexDirection:"row"}}>
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
                  {value: getTotalRevenueCreditCard()+1, color: 'rgb(84,219,234)'},
                  {value: getTotalRevenueCash()+1, color: 'lightgreen'},

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
                Total Sale (Quantity)
              </Text>
              <PieChart
                strokeColor="white"
                strokeWidth={4}
                donut
                data={[
                  {value: getNumberOfCreditCardSale()+1, color: 'rgb(84,219,234)'},
                  {value: getNumberOfCashSale()+1, color: 'lightgreen'},

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
                      <Text style={{color: 'white', fontSize: 36}}>13</Text>
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


export default OtherReports;

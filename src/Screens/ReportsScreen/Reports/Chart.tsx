import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import {
  getNumberOfCashSale,
  getNumberOfCreditCardSale,
  getTotalLenghtCash,
  getTotalLenghtCreditCard,
  getTotalRevenueCash,
  getTotalRevenueCreditCard
} from "../../../../assets/js/reports.js";

const Charts = () => {
  //@ts-ignore
  const renderLegend = (text, color) => {
    return (
      <View style={styles.legendContainer}>
        <View style={[styles.legendColorBox, { backgroundColor: color || "white" }]} />
        <Text style={styles.legendText}>{text || ""}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <View style={styles.chartContainer}>
          <View>
            <View style={styles.chartBox}>
              <Text style={styles.chartTitle}>Total Revenue ($)</Text>
              <PieChart
                strokeColor="white"
                strokeWidth={4}
                donut
                data={[
                  { value: getTotalRevenueCreditCard(), color: "rgb(84,219,234)"},
                  { value: getTotalRevenueCash(), color: "lightgreen" }
                ]}
                innerCircleColor="#414141"
                innerCircleBorderWidth={4}
                innerCircleBorderColor={"white"}
                showValuesAsLabels={true}
                showText
                textSize={18}
                showTextBackground={true}
                centerLabelComponent={() => {
                  return (
                    <View>
                      <Text style={styles.centerLabelText}>{getTotalRevenueCreditCard() + getTotalRevenueCash()}</Text>
                      <Text style={styles.centerLabelSubText}>Total</Text>
                    </View>
                  );
                }}
              />
              <View style={styles.legendContainerWrapper}>
                {renderLegend("Credit Card", "rgb(84,219,234)")}
                {renderLegend("Cash", "lightgreen")}
              </View>
            </View>
          </View>
          <View>
            <View style={styles.chartBox}>
              <Text style={styles.chartTitle}>Number Of Products (Quantity)</Text>
              <PieChart
                strokeColor="white"
                strokeWidth={4}
                donut
                data={[
                  { value: getTotalLenghtCash(), color: "lightgreen" },
                  { value: getTotalLenghtCreditCard(), color: "rgb(84,219,234)" }
                ]}
                innerCircleColor="#414141"
                innerCircleBorderWidth={4}
                innerCircleBorderColor={"white"}
                showValuesAsLabels={true}
                showText
                textSize={18}
                showTextBackground={true}
                centerLabelComponent={() => {
                  return (
                    <View>
                      <Text style={styles.centerLabelText}>{getTotalLenghtCreditCard() + getTotalLenghtCash()}</Text>
                      <Text style={styles.centerLabelSubText}>Total</Text>
                    </View>
                  );
                }}
              />
              <View style={styles.legendContainerWrapper}>
                {renderLegend("Credit Card", "rgb(84,219,234)")}
                {renderLegend("Cash", "lightgreen")}
              </View>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.chartBox}>
            <Text style={styles.chartTitle}>Total Sale (Quantity)</Text>
            <PieChart
              strokeColor="white"
              strokeWidth={4}
              donut
              data={[
                { value: getNumberOfCashSale(), color: "lightgreen" },
                { value: getNumberOfCreditCardSale(), color: "rgb(84,219,234)" }
              ]}
              innerCircleColor="#414141"
              innerCircleBorderWidth={4}
              innerCircleBorderColor={"white"}
              showValuesAsLabels={true}
              showText
              textSize={18}
              showTextBackground={true}
              centerLabelComponent={() => {
                return (
                  <View>
                    <Text style={styles.centerLabelText}>{getNumberOfCreditCardSale() + getNumberOfCashSale()}</Text>
                    <Text style={styles.centerLabelSubText}>Total</Text>
                  </View>
                );
              }}
            />
            <View style={styles.legendContainerWrapper}>
              {renderLegend("Credit Card", "rgb(84,219,234)")}
              {renderLegend("Cash", "lightgreen")}
            </View>
          </View>
          <View style={styles.chartBox}>
            <Text style={styles.chartTitle}>Total Sale (Quantity)</Text>
            <PieChart
              strokeColor="white"
              strokeWidth={4}
              donut
              data={[
                { value: getNumberOfCashSale(), color: "lightgreen" },
                { value: getNumberOfCreditCardSale(), color: "rgb(84,219,234)" }
              ]}
              innerCircleColor="#414141"
              innerCircleBorderWidth={4}
              innerCircleBorderColor={"white"}
              showValuesAsLabels={true}
              showText
              textSize={18}
              showTextBackground={true}
              centerLabelComponent={() => {
                return (
                  <View>
                    <Text style={styles.centerLabelText}>{getNumberOfCreditCardSale() + getNumberOfCashSale()}</Text>
                    <Text style={styles.centerLabelSubText}>Total</Text>
                  </View>
                );
              }}
            />
            <View style={styles.legendContainerWrapper}>
              {renderLegend("Credit Card", "rgb(84,219,234)")}
              {renderLegend("Cash", "lightgreen")}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  chartContainer: {
    backgroundColor: "transparent",
  },
  chartBox: {
    borderRadius: 20,
    marginHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "#414141",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 1,
  },
  chartTitle: {
    color: "white",
    fontSize: 27,
    fontWeight: "bold",
    marginBottom: 3,
  },
  centerLabelText: {
    color: "white",
    alignItems:"center",
    textAlign:"center",
    fontSize: 24,
    justifyContent:"center"
  },
  centerLabelSubText: {
    justifyContent:"center",
    alignItems:"center",
    color: "white",
    fontSize: 18,
  },
  legendContainerWrapper: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  legendContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  legendColorBox: {
    height: 18,
    width: 18,
    marginRight: 10,
    borderRadius: 4,
  },
  legendText: {

    color: "white",
    fontSize: 16,
  },
});

export default Charts;

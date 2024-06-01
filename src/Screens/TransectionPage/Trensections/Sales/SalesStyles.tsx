import { StyleSheet } from "react-native";

export default StyleSheet.create(
  {
    OuterContainer: {
      flexDirection: "row",
      borderWidth: 3,
      marginLeft: 20,
      borderRadius: 20,
      borderColor: "#718EBF"
    },
    textProductId: {
      borderColor: "black",
      borderRadius: 18,
      width: 280,
      margin: 15,
      height: 50,
      borderWidth: 3,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
      backgroundColor: "transparent"
    },
    textProductIdButton: {
      borderRadius: 15,
      alignItems: "center",
      width: 120,
      height: 50,
      borderColor: "black",
      borderWidth: 3,
      justifyContent: "center",
      marginVertical: 20,
      marginHorizontal: 5
    },
    innerContainer: {
      borderColor: "#718EBF",
      borderRadius: 15,
      borderWidth: 3,
      height: 450,
      padding: 3,
      justifyContent: "space-around",
      flexDirection: "row",
      marginBottom: 200,
      marginTop: 20,
      width: 818

    },
    info1: {
      marginVertical: 10,
      textAlign: "center",
      fontSize: 23,
      width: 270,
      height: 50,
      borderWidth: 2,
      borderColor: "#718EBF",
      justifyContent: "center",
      color: "black",
      borderRadius: 15,
      padding: 5
    },
    info3: {
      backgroundColor: "transparent",
      marginVertical: 10,
      fontSize: 24,
      width: 270,
      height: 50,
      borderWidth: 2,
      borderColor: "#718EBF",
      borderRadius: 15,
      padding: 5,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15
    },

    belgeIptal: {
      borderWidth: 2,
      borderRadius: 15,
      borderColor: "#718EBF",
      color: "black",
      margin: 10,
      height: 50,
      width: 110,
      backgroundColor: "transparent",
      alignItems: "center",
      justifyContent: "center"
    },
    productsCategory: {
      borderRadius: 15,
      borderWidth: 3,
      borderColor: "#718EBF",
      width: 420,
      margin: 20,
      height: 450
    },
    innerText: {
      color: "black",
      fontSize: 16,
      textAlign: "center"
    },
    payButton:{
      margin: 10,
      height: 50,
      width: 110,
      alignItems: "center",
      justifyContent: "center",
      borderRadius:15,
      borderWidth:3,
      borderColor: "#718EBF",
    }
  }
);

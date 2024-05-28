import { StyleSheet } from "react-native";

export default StyleSheet.create(
  {
    OuterContainer: {
      flexDirection: "row",
      borderWidth: 2,
      marginLeft:20
    },

    textProductId: {
      borderColor: "black",
      width: 280,
      margin: 15,
      height: 50,
      borderWidth: 3
    },

    textProductIdButton: {
      alignItems: "center",
      width: 120,
      height: 50,
      borderColor: "black",
      borderWidth: 3,
      justifyContent: "center",
      marginVertical: 20,
      marginHorizontal: 10
    },

    refreshButton: {
      alignItems: "center",
      width: 120,
      height: 50,
      borderColor: "black",
      borderWidth: 3,
      justifyContent: "center",
      marginVertical: 20,
      marginHorizontal: 10
    },

    goToCategoryPageButton: {
      alignItems: "center",
      width: 120,
      height: 50,
      borderColor: "black",
      borderWidth: 3,
      justifyContent: "center",
      marginVertical: 20,
      marginHorizontal: 10
    },
    innerContainer: {
      borderWidth: 2,
      height:450,
      justifyContent: "space-between",
      flexDirection: "row",
      marginBottom: 200,
      marginTop: 20,
      width: 910
    },
    info1: {
      marginVertical: 10,
      fontSize: 24,
      width: 270,
      height: 50,
      borderWidth: 2,
      borderColor: "black",
      borderRadius: 15,
      padding: 5
    },
    info2: {
      marginVertical: 10,
      fontSize: 24,
      width: 270,
      height: 80,
      borderWidth: 2,
      borderColor: "black",
      borderRadius: 15,
      padding: 5
    },
    info3: {
      backgroundColor: "transparent",
      marginVertical: 10,
      fontSize: 24,
      width: 270,
      height: 80,
      borderWidth: 2,
      borderColor: "black",
      borderRadius: 15,
      padding: 5
    },
    info4: {
      marginVertical: 10,
      fontSize: 24,
      width: 270,
      height: 80,
      borderWidth: 2,
      borderColor: "black",
      borderRadius: 15,
      padding: 5
    },
    belgeIptal: {
      margin: 10,
      height: 50,
      width: 110,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center"
    },
    creditCard: {
      margin: 10,
      height: 50,
      width: 110,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center"
    }


  }
);

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  outerContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  image: {
    width: 350,
    height: 250,
    resizeMode: "contain",
    alignItems: "center",
    marginBottom: 50

  },
  button: {
    backgroundColor: "#58A399",
    alignItems: "center",
    borderRadius: 20,
    justifyContent: "center",
    margin: 5,
    width: 350,
    height: 50
  },
  subButton: {
    backgroundColor: "#58A399",
    alignItems: "center",
    borderRadius: 20,
    justifyContent: "center",
    marginHorizontal:5,
    width:180,
    height: 90,
  },
  button_text: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white"
  },
  password: {
    fontSize: 17,
    margin: 15,
    color:"black",
    textAlign: "right"
  },
  textinput: {
    marginVertical: 8,
    backgroundColor: "white",
    borderColor: "#58A399",
    borderWidth: 2,
    borderRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  warningText: {
    textAlign:"left",
    paddingHorizontal:15,
    fontWeight:"bold",
    fontSize:14,
  },
  info: {
    textAlign:"center"
  }

});

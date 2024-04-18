import { StyleSheet } from "react-native";

export default StyleSheet.create({
  outerContainer: {
    alignItems:"center",
    justifyContent:"center",
    flex:1,

  },
  image: {
    width:350,
    height:250,
    resizeMode:"contain",
    alignItems:"center",
    marginBottom:50,

  },
  button:{
      backgroundColor:"#58A399",
      alignItems:"center",
      borderRadius:20,
      justifyContent:"center",
      margin:5,
      width:350,
      height:50,
  },
  button_text: {
    fontSize:22,
    fontWeight:"bold",
    color:"white",



  },
  password: {
    fontSize:20,
    margin:15,
    textAlign:"right",
  }

});

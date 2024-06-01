import { StyleSheet } from "react-native";

export default StyleSheet.create({
  toucable: {
    height: 70,
    width: 350,
    margin: 3,
    alignItems: "stretch"
  },
  container: {
    borderColor:"#718EBF",
    flex: 5,
    padding: 5,
    borderWidth: 2,
    borderRadius: 15,
    margin: 5,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around"
  },

  image: { width: 50, height: 50 },
  text: { fontSize: 16, fontWeight: "bold", marginHorizontal: 15 ,color:"black"},
  text2: { fontSize: 16, fontWeight: "bold", marginHorizontal: 15 ,color:"black"},
  text3: { fontSize: 14, fontWeight: "bold", marginHorizontal: 15 ,color:"black"},
  text4: { fontSize: 17, fontWeight: "bold", marginHorizontal: 15 ,color:"#7ABA78"},

});

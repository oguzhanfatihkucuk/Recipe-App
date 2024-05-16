import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const columnWidth = 3 * width / 8;

const { height } = Dimensions.get('window');
const columnHeight = 3*height / 8;

export default StyleSheet.create({
  text: {
    fontSize: 22,
    textTransform: "capitalize",
    opacity: 0.6,
    paddingHorizontal: 8
  },
  container: {
    width: columnWidth,
    padding: 10,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "black",
    margin: 10,
    paddingVertical: 15

  },
  list: {},
  searchbar: {
    margin: 8,
    borderWidth: 1
  },
  subtext: {
    fontSize: 15,
    textTransform: "capitalize",
    opacity: 0.6,
    paddingHorizontal: 8,
    textAlign: "center"

  },
  outContainer: { alignItems: "center",height:columnHeight }
});

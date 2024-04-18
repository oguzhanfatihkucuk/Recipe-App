import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  },
  settingText: {
    fontSize: 16
  },
  option: {
    borderBottomWidth: 2,
    borderColor: "#ccc",
    padding: 15,
    flexDirection: "row"
  },
  optionText: {
    fontWeight: "bold",
    color: "black",
    fontSize: 16
  },
  logoutButton: {
    color: "white",
    borderColor: "#718EBF",
    borderWidth: 3,
    padding: 10,
    borderRadius: 25,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  logoutText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center"
  },
  subHeader: {
    backgroundColor: "#2089dc",
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
    marginBottom: 10
  },
  icons: {
    marginRight: 20,
    color: "black",
    fontSize: 24
  },
  iconsLogout: {
    marginRight: 20,
    color: "black",
    fontSize: 30
  },
  divider: {
    height: 2,
    backgroundColor:"#ccc",
  },
  languagebutton: {
    padding: 15,
    paddingBottom: 0,
    flexDirection: "row"
  },
  divider_vertical: { width: 20, backgroundColor: "#ffffff" },
  text: {
    fontSize: 16,
    textTransform: 'capitalize',
    opacity: 0.6,
    paddingHorizontal:8,
  },
});

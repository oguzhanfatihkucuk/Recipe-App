import { StyleSheet } from "react-native";

export default StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 10
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  nameText: {
    fontSize: 16,
    marginTop: 10,
    color: "black",
    textAlign: "center"
  },
  infoContainer: {
    marginBottom: 20
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5
  },
  editButton: {
    color: "#white",
    borderColor: "#718EBF",
    borderWidth: 2,
    padding: 15,
    borderRadius: 20,
    width: 175
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    textAlign: "center"
  },
  image: {
    width: 150,
    height: 150,
    borderColor:"#718EBF",
    borderWidth:2,
    borderRadius:35,
    objectFit:"fill",
  },
  middleHeader: {
    alignItems: "center",
    margin: 5,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 15
  }


});

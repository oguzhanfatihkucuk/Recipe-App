import {StyleSheet} from "react-native";

export default StyleSheet.create({
  toucable:{height:160,width:130,margin:3},
  container: { alignItems:"center",flex: 5, padding: 10, borderWidth: 1, borderRadius: 5, margin: 0 },
  image: { width: 50, height: 50 ,objectFit:"fill"},
  text: { fontSize: 16, fontWeight: 'bold' },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  modalDescription: {
    fontSize: 18,
    color: "#666",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
});

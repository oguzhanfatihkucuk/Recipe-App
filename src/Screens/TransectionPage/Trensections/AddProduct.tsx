import React, { useState } from "react";
import { View, Text, TextInput, Button, Modal, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";

// Mock data array
const mockData = [
  {
    id: "1",
    title: "T-Shirt",
    price: 19,
    description: "Cotton",
    category: "clothing",
    imageUrl: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg"
  }
];

const AddProductScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: '',
    title: '',
    price: '',
    description: '',
    category: 'clothing',
    imageUrl: ''
  });
  const [products, setProducts] = useState(mockData);

  //@ts-ignore
  const handleChange = (name, value) => {
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSave = () => {
    // Add the new product to the list
    //@ts-ignore
    setProducts([...products, newProduct]);
    // Reset the form and close the modal
    setModalVisible(false);
    setNewProduct({
      id: '',
      title: '',
      price: '',
      description: '',
      category: 'clothing',
      imageUrl: ''
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Add New Product" onPress={() => setModalVisible(true)} />

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text>Price: ${item.price}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Category: {item.category}</Text>
            <Text>Image URL: {item.imageUrl}</Text>
          </View>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Product</Text>

            <TextInput
              placeholder="ID"
              value={newProduct.id}
              onChangeText={(text) => handleChange('id', text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Title"
              value={newProduct.title}
              onChangeText={(text) => handleChange('title', text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Price"
              value={newProduct.price}
              onChangeText={(text) => handleChange('price', text)}
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Description"
              value={newProduct.description}
              onChangeText={(text) => handleChange('description', text)}
              style={styles.input}
            />

            <Picker
              selectedValue={newProduct.category}
              onValueChange={(itemValue) => handleChange('category', itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Clothing" value="clothing" />
              <Picker.Item label="Home" value="home" />
              <Picker.Item label="Kitchen" value="kitchen" />
              <Picker.Item label="Food" value="food" />
              <Picker.Item label="Accessories" value="accessories" />
            </Picker>

            <TextInput
              placeholder="Image URL"
              value={newProduct.imageUrl}
              onChangeText={(text) => handleChange('imageUrl', text)}
              style={styles.input}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  productCard: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
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
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: "100%",
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AddProductScreen;

import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Modal } from "react-native";

const localPhoto = require('../../../assets/png/images.png');


//@ts-ignore
const UserInformationCard = ({ user}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={toggleModal}>
      <Image
        source={localPhoto}
        style={styles.photo}
      />
      <View style={styles.info}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.jobTitle}>{user.jobtitle}</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={localPhoto}
              style={styles.modalPhoto}
            />
            <Text style={styles.modalUsername}>{user.username}</Text>
            <Text style={styles.modalName}>{user.firstName} {user.lastName}</Text>
            <Text style={styles.modalEmail}>{user.email}</Text>
            <Text style={styles.jobTitle}>{user.jobtitle}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    width: 405,
    height: 130,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 14,
    color: "#999",
    marginTop: 5,
  },
  modalPhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  name: {
    fontSize: 16,
    color: "#666",
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  // Modal styles
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
    maxHeight: "80%",
  },
  modalUsername: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalName: {
    fontSize: 18,
    color: "#666",
    marginBottom: 5,
  },
  modalEmail: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#333",
  },
});

export default UserInformationCard;

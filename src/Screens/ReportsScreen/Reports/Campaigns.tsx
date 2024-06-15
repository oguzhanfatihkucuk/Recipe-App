import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet } from "react-native";
import campaignData from "../../../../assets/js/campaings";

const CampaignsScreen = () => {
  const [selectedCampaign, setSelectedCampaign] = useState();

  //@ts-ignore
  const handlePress = (campaign) => {
    setSelectedCampaign(campaign);
  };

  const closeModal = () => {
    setSelectedCampaign(null);
  };

  // @ts-ignore
  return (
    <View style={styles.container}>
      <FlatList
        data={campaignData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
      {selectedCampaign && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!selectedCampaign}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedCampaign.title}</Text>
              <Text style={styles.modalDetails}>{selectedCampaign.details}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Kapat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  card: {
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
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
  modalDetails: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default CampaignsScreen;

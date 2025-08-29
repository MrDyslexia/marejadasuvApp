"use client";

import { useRef, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, TouchableOpacity, Modal, Dimensions, } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const InteractiveMap_Modal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const mapRef = useRef<MapView>(null);
  const insets = useSafeAreaInsets()

  // Región inicial fija (puedes cambiarla si quieres)
  const initialRegion = {
    latitude: -33.4489,
    longitude: -70.6693,
    latitudeDelta: 10,
    longitudeDelta: 10,
  };
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <StatusBar style="auto" hidden />
      <TouchableOpacity
        onPress={onClose}
        style={[
          styles.closeButton,
          {
            top: insets.top + 16,
            right: insets.right + 16,
          },
        ]}
      >
        <Ionicons name="close" size={24} color="#fff" />
      </TouchableOpacity>
      <MapView
        ref={mapRef}
        style={[
          styles.map,
          {
            width: width,
            height: height,
          },
        ]}
        initialRegion={initialRegion}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        zoomControlEnabled={true}
        zoomEnabled={true}
        scrollEnabled={true}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#2196F3",
    position: "absolute",
    zIndex: 10,
  },
  map: {},
});

export default InteractiveMap_Modal;

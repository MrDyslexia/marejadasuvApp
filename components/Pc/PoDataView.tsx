import { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import type { Region } from "@/types/type";
import AnimatedMap from "@/components/Pc/AnimatedMap";
import RegionDetailModal from "@/components/Pc/Modal";
import RegionList from "@/components/Pc/RegionList";
import InteractiveMap_Modal from "@/components/Pc/Map_Modal";
const PronosticoCostero = ({ regions }: { regions: Region[] }) => {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const handleRegionSelect = (region: Region) => {
    setSelectedRegion(region);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedRegion(null);
    setModalVisible(false);
  };
  const closeMapModal = () => {
    setMapVisible(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pronóstico Costero</Text>
        <Text style={styles.headerSubtitle}>
          En esta sección podrás ver los pronósticos costeros.{"\n"}Selecciona una región para ver más detalles.
        </Text>

      </View>

      <ScrollView style={styles.content}>
        <RegionList regions={regions} onRegionSelect={handleRegionSelect} />
        <AnimatedMap />
        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => setMapVisible(true)}
        >
          <Text style={styles.mapButtonText}>Ver Mapa Interactivo</Text>
        </TouchableOpacity>
      </ScrollView>

      <RegionDetailModal
        visible={modalVisible}
        region={selectedRegion}
        onClose={closeModal}
      />
      <InteractiveMap_Modal
        regions={regions}
        onRegionSelect={handleRegionSelect}
        visible={mapVisible}
        onClose={closeMapModal}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: "#2196F3",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  mapButton: {
    margin: 16,
    padding: 12,
    backgroundColor: "#2196F3",
    borderRadius: 8,
    alignItems: "center",
  },
  mapButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default PronosticoCostero;

import { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import type { Region } from "@/types/type";
import InteractiveMap from "@/components/Pc/InteractiveMap";
import AnimatedMap from "@/components/Pc/AnimatedMap";
import RegionDetailModal from "@/components/Pc/Modal";
import RegionList from "@/components/Pc/RegionList";
const PronosticoCostero = ({ regions }: { regions: Region[] }) => {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleRegionSelect = (region: Region) => {
    setSelectedRegion(region);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedRegion(null);
    setModalVisible(false);
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
        <InteractiveMap regions={regions} onRegionSelect={handleRegionSelect} />
      </ScrollView>

      <RegionDetailModal
        visible={modalVisible}
        region={selectedRegion}
        onClose={closeModal}
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
});
export default PronosticoCostero;

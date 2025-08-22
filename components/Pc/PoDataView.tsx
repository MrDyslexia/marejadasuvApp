"use client"

import { useState } from "react"
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native"
import type { Region } from "@/types/type"
import AnimatedMap from "@/components/Pc/AnimatedMap"
import RegionDetailModal from "@/components/Pc/Modal"
import RegionList from "@/components/Pc/RegionList"
import InteractiveMap_Modal from "@/components/Pc/Map_Modal"
import { Ship, TreePalm } from "lucide-react-native"

const PronosticoCostero = ({ regions }: { regions: Region[] }) => {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [mapVisible, setMapVisible] = useState(false)

  const handleRegionSelect = (region: Region) => {
    setSelectedRegion(region)
    setModalVisible(true)
  }

  const closeModal = () => {
    setSelectedRegion(null)
    setModalVisible(false)
  }

  const closeMapModal = () => {
    setMapVisible(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pronóstico Costero</Text>
        <Text style={styles.headerSubtitle}>
          En esta sección podrás ver los pronósticos costeros.{"\n"}Selecciona una región para ver más detalles.
        </Text>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <RegionList regions={regions} onRegionSelect={handleRegionSelect} modalVisible={setMapVisible} />
        <AnimatedMap />
      </ScrollView>

      <RegionDetailModal visible={modalVisible} region={selectedRegion} onClose={closeModal} />
      <InteractiveMap_Modal
        regions={regions}
        onRegionSelect={handleRegionSelect}
        visible={mapVisible}
        onClose={closeMapModal}
      />
    </SafeAreaView>
  )
}

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
  mapMenuContainer: {
    backgroundColor: "#fff",
    marginBottom: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mapMenuTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 16,
  },
  mapButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  mapButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 120,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: "#ffffff",
    borderWidth: 2,
  },
  coastalButton: {
    borderColor: "#e0e0e0",
  },
  oceanicButton: {
    borderColor: "#bdbdbd",
  },
  buttonIconContainer: {
    marginBottom: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 24,
    padding: 8,
  },
  buttonIcon: {
    fontSize: 32,
  },
  mapButtonText: {
    color: "#424242",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  
})

export default PronosticoCostero

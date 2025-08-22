"use client"

import { type Key, type SetStateAction, useState, useMemo } from "react"
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  StatusBar,
} from "react-native"
import { Divider } from "react-native-paper"
import { Image } from "expo-image"
import { router, useLocalSearchParams } from "expo-router"
import type { Sector, Marker } from "@/types/type"
import { X, Expand, MapPin, Waves } from "lucide-react-native"

const { width: screenWidth } = Dimensions.get("window")

export default function PdModal() {
  const pronostco = useLocalSearchParams().pronostico
  const pronosticoData = JSON.parse(pronostco as string)
  const [selectedSector, setSelectedSector] = useState(pronosticoData.sectores[0])
  const [selectedTab, setSelectedTab] = useState("categoria")
  const [loading, setLoading] = useState(false)

  const tabConfig = useMemo(
    () => [
      { key: "categoria", label: "Categoría", icon: "📊" },
      { key: "altura", label: "Altura", icon: "📏" },
      { key: "periodo", label: "Período", icon: "⏱️" },
      { key: "direccion", label: "Dirección", icon: "🧭" },
      { key: "marea", label: "Marea", icon: "🌊" },
    ],
    [],
  )

  const handleSectorPress = (sector: Sector) => {
    if (sector.id === selectedSector.id) return
    setLoading(true)
    setSelectedSector(sector)
    setTimeout(() => setLoading(false), 300)
  }

  const handleTabPress = (tab: SetStateAction<string>) => {
    if (tab === selectedTab) return
    setLoading(true)
    setSelectedTab(tab)
    setTimeout(() => setLoading(false), 300)
  }

  const renderTabContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text style={styles.loadingText}>Cargando datos...</Text>
        </View>
      )
    }

    let imageUrl = ""
    switch (selectedTab) {
      case "categoria":
        imageUrl = selectedSector.datos.categoria
        break
      case "altura":
        imageUrl = selectedSector.datos.altura
        break
      case "periodo":
        imageUrl = selectedSector.datos.periodo
        break
      case "direccion":
        imageUrl = selectedSector.datos.direccion
        break
      case "marea":
        imageUrl = selectedSector.datos.marea
        break
      default:
        imageUrl = selectedSector.datos.categoria
    }

    return (
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => expand(imageUrl)} style={styles.expandButton} activeOpacity={0.7}>
          <Expand size={20} color="#fff" />
        </TouchableOpacity>

        <Image source={{ uri: imageUrl }} style={styles.dataImage} contentFit="contain" transition={200} />
      </View>
    )
  }

  const expand = (url: string) => {
    router.push({
      pathname: "/img_expand",
      params: { expandedImage: url },
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e40af" />

      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>{pronosticoData.nombre}</Text>
            <Text style={styles.subtitle}>Pronóstico Marítimo Detallado</Text>
          </View>
          <TouchableOpacity onPress={() => router.back()} style={styles.closeButton} activeOpacity={0.7}>
            <X size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} bounces={true}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Waves size={20} color="#3b82f6" />
            <Text style={styles.sectionTitle}>Mapa de Pronóstico</Text>
          </View>
          <View style={styles.imageContainer}>
            <TouchableOpacity
              onPress={() => expand(pronosticoData.mapa_pronostico)}
              style={styles.expandButton}
              activeOpacity={0.7}
            >
              <Expand size={20} color="#fff" />
            </TouchableOpacity>
            <Image
              source={{ uri: pronosticoData.mapa_pronostico }}
              style={styles.mapImage}
              contentFit="contain"
              transition={200}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Waves size={20} color="#3b82f6" />
            <Text style={styles.sectionTitle}>Mosaico de Pronóstico</Text>
          </View>
          <View style={styles.imageContainer}>
            <TouchableOpacity
              onPress={() => expand(pronosticoData.mosaico_pronostico)}
              style={styles.expandButton}
              activeOpacity={0.7}
            >
              <Expand size={20} color="#fff" />
            </TouchableOpacity>
            <Image
              source={{ uri: pronosticoData.mosaico_pronostico }}
              style={styles.mapImage}
              contentFit="contain"
              transition={200}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MapPin size={20} color="#3b82f6" />
            <Text style={styles.sectionTitle}>Ubicaciones</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{pronosticoData.markers.length}</Text>
            </View>
          </View>
          <View style={styles.markersGrid}>
            {pronosticoData.markers.map((marker: Marker, index: Key | null | undefined) => (
              <View key={index} style={styles.markerCard}>
                <View style={styles.markerHeader}>
                  <MapPin size={16} color="#3b82f6" />
                  <Text style={styles.markerName}>{marker.nombre}</Text>
                </View>
                <Text style={styles.markerCoords}>
                  {marker.lat.toFixed(4)}, {marker.lng.toFixed(4)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Análisis por Sectores</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{pronosticoData.sectores.length}</Text>
            </View>
          </View>

          {/* Sector Selection */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sectorScrollContainer}
          >
            {pronosticoData.sectores.map((sector: Sector) => (
              <TouchableOpacity
                key={sector.id}
                style={[styles.sectorChip, selectedSector.id === sector.id && styles.selectedSectorChip]}
                onPress={() => handleSectorPress(sector)}
                activeOpacity={0.7}
              >
                <Text style={[styles.sectorChipText, selectedSector.id === sector.id && styles.selectedSectorChipText]}>
                  {sector.nombre}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Divider style={styles.divider} />

          {/* Selected Sector Info */}
          <View style={styles.selectedSectorContainer}>
            <Text style={styles.selectedSectorTitle}>{selectedSector.nombre}</Text>

            {/* Enhanced Tabs */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tabsScrollContainer}
            >
              {tabConfig.map((tab) => (
                <TouchableOpacity
                  key={tab.key}
                  style={[styles.modernTab, selectedTab === tab.key && styles.selectedModernTab]}
                  onPress={() => handleTabPress(tab.key)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.tabEmoji}>{tab.icon}</Text>
                  <Text style={[styles.modernTabText, selectedTab === tab.key && styles.selectedModernTabText]}>
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Tab Content */}
            <View style={styles.tabContentContainer}>{renderTabContent()}</View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    backgroundColor: "#1e40af",
    paddingTop: StatusBar.currentHeight || 44,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 2,
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    fontWeight: "400",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
    marginLeft: 8,
    flex: 1,
  },
  badge: {
    backgroundColor: "#dbeafe",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#3b82f6",
  },
  imageContainer: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f1f5f9",
  },
  expandButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  mapImage: {
    width: "100%",
    height: 220,
  },
  dataImage: {
    width: "100%",
    height: 250,
  },
  markersGrid: {
    gap: 12,
  },
  markerCard: {
    backgroundColor: "#f8fafc",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6",
  },
  markerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  markerName: {
    fontWeight: "600",
    fontSize: 16,
    color: "#1f2937",
    marginLeft: 8,
  },
  markerCoords: {
    fontSize: 14,
    color: "#6b7280",
    fontFamily: "monospace",
  },
  sectorScrollContainer: {
    paddingHorizontal: 4,
    gap: 8,
  },
  sectorChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#f1f5f9",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  selectedSectorChip: {
    backgroundColor: "#3b82f6",
    borderColor: "#3b82f6",
  },
  sectorChipText: {
    color: "#64748b",
    fontWeight: "600",
    fontSize: 14,
  },
  selectedSectorChipText: {
    color: "white",
  },
  divider: {
    marginVertical: 20,
    backgroundColor: "#e2e8f0",
  },
  selectedSectorContainer: {
    alignItems: "center",
  },
  selectedSectorTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    color: "#1f2937",
    textAlign: "center",
  },
  tabsScrollContainer: {
    paddingHorizontal: 4,
    gap: 8,
    marginBottom: 20,
  },
  modernTab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f8fafc",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    alignItems: "center",
    minWidth: 90,
  },
  selectedModernTab: {
    backgroundColor: "#3b82f6",
    borderColor: "#3b82f6",
  },
  tabEmoji: {
    fontSize: 16,
    marginBottom: 4,
  },
  modernTabText: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "600",
  },
  selectedModernTabText: {
    color: "white",
  },
  tabContentContainer: {
    width: "100%",
    minHeight: 280,
    borderRadius: 16,
    overflow: "hidden",
  },
  loadingContainer: {
    height: 280,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fafc",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
})

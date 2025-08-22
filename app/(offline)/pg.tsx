"use client"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView } from "react-native"
import { StatusBar } from "expo-status-bar"
import data from "@/data/data.json"
import { router } from "expo-router"
import type { Pronostico } from "@/types/type"
import { ChevronRight, MapPin, Waves, Map, Navigation } from "lucide-react-native"
import InteractiveMap_Modal from "@/components/Pg/InteractiveMap_modal"
const datosEjemplo = {
  pronosticos: data.pronosticos.map((p: any) => ({
    ...p,
    markers: p.markers ?? [],
  })),
}

const PronosticoGeneralScreen = () => {
  const [pronosticos, setPronosticos] = useState<Pronostico[]>([])
  const [cargando, setCargando] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setPronosticos(datosEjemplo.pronosticos)
      setCargando(false)
    }, 1000)
  }, [])

  const navegarADetalle = (pronostico: Pronostico) => {
    router.push({
      pathname: "/pd_modal",
      params: { pronostico: JSON.stringify(pronostico) },
    })
  }

  const calcularCoordenadasDisponibles = (sectores: any[]) => {
    const sectoresConCoordenadas = sectores.filter((sector) => sector.coordenadas)
    return sectoresConCoordenadas.length
  }

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={styles.textoIndicador}>Cargando pronósticos...</Text>
      </View>
    )
  }

  const closeMapModal = () => {
    setModalVisible(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Zonas Oceánicas</Text>
            <Text style={styles.headerSubtitle}>Selecciona un pronostico para ver detalles</Text>
          </View>
          <TouchableOpacity style={styles.headerButton} activeOpacity={0.7} onPress={() => setModalVisible(true)}>
            <Map size={24} color="#fff" />
            <Text style={styles.headerButtonText}>Ver mapa oceánico</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={pronosticos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.tarjeta} onPress={() => navegarADetalle(item)} activeOpacity={0.7}>
            <View style={styles.cardHeader}>
              <View style={styles.titleRow}>
                <Waves size={24} color="#3b82f6" />
                <Text style={styles.tarjetaTitulo}>{item.nombre}</Text>
              </View>

              <View style={styles.infoGrid}>
                <View style={styles.infoCard}>
                  <MapPin size={16} color="#10b981" />
                  <Text style={styles.infoLabel}>Sectores disponibles</Text>
                  <Text style={styles.infoValue}>{item.sectores.length}</Text>
                </View>
                <View style={styles.infoCard}>
                  <Navigation size={16} color="#f59e0b" />
                  <Text style={styles.infoLabel}>Coordenadas</Text>
                  <Text style={styles.infoValue}>
                    {calcularCoordenadasDisponibles(item.sectores) > 0
                      ? `${calcularCoordenadasDisponibles(item.sectores)}/${item.sectores.length}`
                      : "Próximamente"}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.sectoresPreview}>
              <Text style={styles.sectoresTitle}>Sectores disponibles:</Text>
              <View style={styles.sectoresContainer}>
                {item.sectores.slice(0, 4).map((sector, index) => (
                  <View key={sector.id} style={styles.sectorChip}>
                    <Text style={styles.sectorNombre}>{sector.nombre}</Text>
                  </View>
                ))}
                {item.sectores.length > 4 && (
                  <View style={styles.sectorChip}>
                    <Text style={styles.masTexto}>+{item.sectores.length - 4}</Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.cardFooter}>
              <Text style={styles.cardFooterText}>Ver pronóstico completo</Text>
              <ChevronRight size={18} color="#3b82f6" />
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.lista}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={10}
      />
      <InteractiveMap_Modal
        visible={modalVisible}
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
  centrado: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  textoIndicador: {
    marginTop: 16,
    fontSize: 16,
    color: "#555",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: "#2196F3",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerContent: {
    flex: 4, // Changed from flex: 2 to flex: 4 to give title/subtitle 4/5 of the width
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
  headerButton: {
    flex: 1, // Keeping flex: 1 so button takes 1/5 of the width (1 out of 5 total flex units)
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  headerButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
  lista: {
    padding: 16,
  },
  tarjeta: {
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  cardHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  tarjetaTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
    marginLeft: 12,
    flex: 1,
  },
  infoGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  infoCard: {
    backgroundColor: "#f8fafc",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
  },
  sectoresPreview: {
    padding: 20,
    paddingTop: 16,
  },
  sectoresTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 12,
  },
  sectoresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  sectorChip: {
    backgroundColor: "#e0f2fe",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#b3e5fc",
  },
  sectorNombre: {
    fontSize: 13,
    color: "#0277bd",
    fontWeight: "500",
  },
  masTexto: {
    fontSize: 13,
    color: "#0277bd",
    fontWeight: "600",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#f8fafc",
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  cardFooterText: {
    fontSize: 15,
    color: "#3b82f6",
    fontWeight: "600",
  },
})

export default PronosticoGeneralScreen

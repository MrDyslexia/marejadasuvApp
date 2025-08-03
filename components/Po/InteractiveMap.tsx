import {Region} from "@/types/type"
import MapView, { Marker, Callout, PROVIDER_GOOGLE} from "react-native-maps"
import { StyleSheet, Text, View } from "react-native"
const InteractiveMap = ({
  regions,
  onRegionSelect,
}: {
  regions: Region[]
  onRegionSelect: (region: Region) => void
}) => {
  // Calcular la región inicial del mapa basada en las coordenadas de las regiones
  const getInitialRegion = () => {
    if (regions.length === 0) {
      return {
        latitude: -33.4489,
        longitude: -70.6693,
        latitudeDelta: 20,
        longitudeDelta: 20,
      }
    }

    // Calcular el centro aproximado de todas las regiones
    const lats = regions.map((r) => r.lat)
    const lons = regions.map((r) => r.lon)
    const minLat = Math.min(...lats)
    const maxLat = Math.max(...lats)
    const minLon = Math.min(...lons)
    const maxLon = Math.max(...lons)

    return {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLon + maxLon) / 2,
      latitudeDelta: Math.max(Math.abs(maxLat - minLat) * 1.5, 5),
      longitudeDelta: Math.max(Math.abs(maxLon - minLon) * 1.5, 5),
    }
  }

  return (
    <View style={styles.interactiveMapContainer}>
      <Text style={styles.sectionTitle}>Mapa Interactivo</Text>
      <View style={styles.mapContainer}>
        <MapView style={styles.map} initialRegion={getInitialRegion()} provider={PROVIDER_GOOGLE}>
          {regions.map((region) => (
            <Marker
              key={region.id}
              coordinate={{
                latitude: region.lat,
                longitude: region.lon,
              }}
              title={region.nombre}
              description={`Lat: ${region.lat}° | Lon: ${region.lon}°`}
              onCalloutPress={() => onRegionSelect(region)}
            >
              <Callout tooltip>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>{region.nombre}</Text>
                  <Text style={styles.calloutSubtitle}>
                    Lat: {region.lat}° | Lon: {region.lon}°
                  </Text>
                  <Text style={styles.calloutAction}>Toca para ver detalles</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
    },
    header: {
      padding: 16,
      backgroundColor: "#2196F3",
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: "bold",
      color: "#fff",
    },
    content: {
      flex: 1,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 12,
      color: "#333",
    },
    // Estilos para la lista de regiones
    regionListContainer: {
      padding: 16,
      backgroundColor: "#fff",
      marginBottom: 16,
    },
    regionListContent: {
      paddingRight: 16,
    },
    regionCard: {
      width: 160,
      backgroundColor: "#f9f9f9",
      borderRadius: 12,
      padding: 12,
      marginRight: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    regionName: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 4,
    },
    regionCoords: {
      fontSize: 12,
      color: "#666",
      marginBottom: 8,
    },
    viewDetailsContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    viewDetailsText: {
      fontSize: 12,
      color: "#2196F3",
      marginRight: 4,
    },
    // Estilos para el mapa animado
    animatedMapContainer: {
      padding: 16,
      backgroundColor: "#fff",
      marginBottom: 16,
    },
    mapFrameContainer: {
      height: 250,
      backgroundColor: "#f0f0f0",
      borderRadius: 12,
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    loaderContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1,
      backgroundColor: "rgba(255, 255, 255, 0.7)",
    },
    mapFrame: {
      width: "100%",
      height: "100%",
    },
    frameCounter: {
      position: "absolute",
      bottom: 8,
      right: 8,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      color: "#fff",
      padding: 4,
      borderRadius: 4,
      fontSize: 12,
    },
    controlsContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 16,
    },
    controlButton: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: "#f0f0f0",
      marginHorizontal: 12,
    },
    playPauseButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: "#2196F3",
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 16,
    },
    // Estilos para el mapa interactivo
    interactiveMapContainer: {
      padding: 16,
      backgroundColor: "#fff",
      marginBottom: 16,
      borderRadius: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    mapContainer: {
      height: 300,
      borderRadius: 12,
      overflow: "hidden",
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    calloutContainer: {
      width: 160,
      backgroundColor: "#fff",
      borderRadius: 8,
      padding: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    calloutTitle: {
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 2,
    },
    calloutSubtitle: {
      fontSize: 12,
      color: "#666",
      marginBottom: 4,
    },
    calloutAction: {
      fontSize: 12,
      color: "#2196F3",
      fontStyle: "italic",
    },
    // Estilos para el modal
    modalContainer: {
      flex: 1,
      backgroundColor: "#f5f5f5",
    },
    modalHeader: {
      padding: 16,
      backgroundColor: "#fff",
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },
    closeButton: {
      position: "absolute",
      top: 16,
      right: 16,
      zIndex: 1,
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: "bold",
      marginTop: 8,
    },
    modalSubtitle: {
      fontSize: 14,
      color: "#666",
      marginTop: 4,
    },
    modalContent: {
      flex: 1,
      padding: 16,
    },
    detailsContainer: {
      backgroundColor: "#fff",
      borderRadius: 12,
      padding: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    detailsTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 16,
      color: "#333",
    },
    detailItem: {
      marginBottom: 20,
    },
    detailLabel: {
      fontSize: 16,
      fontWeight: "500",
      marginBottom: 8,
      color: "#555",
    },
    detailImage: {
      width: "100%",
      height: 200,
      borderRadius: 8,
      backgroundColor: "#f9f9f9",
    },
  })
export default InteractiveMap
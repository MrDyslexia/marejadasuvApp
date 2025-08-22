import { useRef } from "react";
import { Region } from "@/types/type";
import MapView, {
  Marker,
  Callout,
  PROVIDER_GOOGLE,
  MarkerPressEvent,
} from "react-native-maps";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const InteractiveMap = ({
  regions,
  onRegionSelect,
}: {
  regions: Region[];
  onRegionSelect: (region: Region) => void;
}) => {
  const markerRefs = useRef<{ [key: string]: any }>({});

  const getInitialRegion = () => {
    if (regions.length === 0) {
      return {
        latitude: -33.4489,
        longitude: -70.6693,
        latitudeDelta: 20,
        longitudeDelta: 20,
      };
    }

    const lats = regions.map((r) => r.lat);
    const lons = regions.map((r) => r.lon);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);

    return {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLon + maxLon) / 2,
      latitudeDelta: Math.max(Math.abs(maxLat - minLat) * 1.5, 5),
      longitudeDelta: Math.max(Math.abs(maxLon - minLon) * 1.5, 5),
    };
  };

  const handleMarkerPress = (e: MarkerPressEvent, region: Region) => {
    e.stopPropagation();
    // Cerrar cualquier callout abierto
    Object.values(markerRefs.current).forEach((ref) => {
      if (ref && ref.hideCallout) ref.hideCallout();
    });
    // Mostrar el callout del marcador actual
    if (
      markerRefs.current[region.id] &&
      markerRefs.current[region.id].showCallout
    ) {
      markerRefs.current[region.id].showCallout();
    }
  };

  return (
    <View style={styles.interactiveMapContainer}>
      <Text style={styles.sectionTitle}>Mapa Interactivo</Text>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={getInitialRegion()}
          provider={PROVIDER_GOOGLE}
          onPress={() => {
            // Cerrar callouts al tocar el mapa
            Object.values(markerRefs.current).forEach((ref) => {
              if (ref && ref.hideCallout) ref.hideCallout();
            });
          }}
        >
          {regions.map((region) => (
            <Marker
              key={region.id}
              coordinate={{
                latitude: region.lat,
                longitude: region.lon,
              }}
              ref={(ref) => {
                if (ref) markerRefs.current[region.id] = ref;
              }}
              onPress={(e) => handleMarkerPress(e, region)}
            >
              <Callout
                style={styles.calloutContainer}
                onPress={(e) => {
                  e.stopPropagation();
                  onRegionSelect(region);
                }}
              >
                <View style={styles.calloutInner}>
                  <View style={styles.calloutHeader}>
                    <Ionicons name="location" size={16} color="#2196F3" />
                    <Text style={styles.calloutTitle}>{region.nombre}</Text>
                  </View>
                  <Text style={styles.calloutSubtitle}>
                    ¿Deseas ver más detalles?
                  </Text>
                  <TouchableOpacity
                    style={styles.calloutButton}
                    onPress={() => onRegionSelect(region)}
                  >
                    <Text style={styles.calloutButtonText}>Ver detalles</Text>
                    <Ionicons name="arrow-forward" size={14} color="#fff" />
                  </TouchableOpacity>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>
    </View>
  );
};
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
    width: 200,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  calloutHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#333",
  },
  calloutSubtitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 12,
  },
  calloutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2196F3",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  calloutButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    marginRight: 4,
  },
  calloutAction: {
    fontSize: 12,
    color: "#2196F3",
    fontStyle: "italic",
  },
  calloutInner: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
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
});
export default InteractiveMap;

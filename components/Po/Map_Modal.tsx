"use client";

import { useRef, useState, useEffect } from "react";
import type { Region } from "@/types/type";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  type MapPressEvent,
} from "react-native-maps";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

const InteractiveMap_Modal = ({
  regions,
  onRegionSelect,
  visible,
  onClose,
}: {
  regions: Region[];
  onRegionSelect: (region: Region) => void;
  visible: boolean;
  onClose: () => void;
}) => {
  const mapRef = useRef<MapView>(null);
  const [mapReady, setMapReady] = useState(false);

  // Función mejorada para calcular la región que muestra todos los marcadores
  const getInitialRegion = () => {
    if (regions.length === 0) {
      return {
        latitude: -33.4489,
        longitude: -70.6693,
        latitudeDelta: 10,
        longitudeDelta: 10,
      };
    }

    const lats = regions.map((r) => r.lat);
    const lons = regions.map((r) => r.lon);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);

    // Calcular el centro
    const centerLat = (minLat + maxLat) / 2;
    const centerLon = (minLon + maxLon) / 2;

    // Calcular los deltas con un padding adicional
    const latDelta = (maxLat - minLat) * 1.5;
    const lonDelta = (maxLon - minLon) * 1.5;

    // Asegurar un zoom mínimo para que los marcadores sean visibles
    const minDelta = 0.5; // Zoom máximo (más cercano)
    const maxDelta = 50; // Zoom mínimo (más lejano)

    return {
      latitude: centerLat,
      longitude: centerLon,
      latitudeDelta: Math.max(minDelta, Math.min(maxDelta, latDelta)),
      longitudeDelta: Math.max(minDelta, Math.min(maxDelta, lonDelta)),
    };
  };

  // Ajustar el mapa para mostrar todos los marcadores cuando esté listo
  useEffect(() => {
    if (visible && mapReady && regions.length > 0 && mapRef.current) {
      // Pequeño delay para asegurar que el mapa esté completamente renderizado
      setTimeout(() => {
        mapRef.current?.fitToCoordinates(
          regions.map((region) => ({
            latitude: region.lat,
            longitude: region.lon,
          })),
          {
            edgePadding: {
              top: 50,
              right: 50,
              bottom: 50,
              left: 50,
            },
            animated: true,
          }
        );
      }, 300);
    }
  }, [visible, mapReady, regions]);

  const handleMapPress = (e: MapPressEvent) => {
    // Map press will automatically hide callouts
  };

  const handleMapReady = () => {
    setMapReady(true);
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <StatusBar style="auto" hidden />
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Ionicons name="close" size={24} color="#fff" />
      </TouchableOpacity>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={getInitialRegion()}
        provider={PROVIDER_GOOGLE}
        onPress={handleMapPress}
        onMapReady={handleMapReady}
        showsUserLocation={true}
        showsMyLocationButton={true}
        zoomControlEnabled={true}
        zoomEnabled={true}
        scrollEnabled={true}
      >
        {regions.map((region) => (
          <Marker
            key={region.id}
            coordinate={{
              latitude: region.lat,
              longitude: region.lon,
            }}
            title={region.nombre}
            description="Ver detalles"
            onCalloutPress={() => {
              onClose();
              onRegionSelect(region);
            }}
          ></Marker>
        ))}
      </MapView>

      {regions.length === 0 && (
        <View style={styles.noRegionsContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#ccc" />
          <Text style={styles.noRegionsText}>No hay regiones disponibles</Text>
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#2196F3",
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  calloutContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    minWidth: 120,
    alignItems: "center",
  },
  calloutTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  calloutButtonText: {
    color: "#2196F3",
    fontSize: 12,
    fontWeight: "500",
  },
  noRegionsContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    zIndex: 5,
  },
  noRegionsText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
});

export default InteractiveMap_Modal;

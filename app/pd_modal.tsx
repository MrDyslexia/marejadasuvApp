import { Key, SetStateAction, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Divider } from "react-native-paper";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { Sector, Marker } from "@/types/type";
import { CircleX, Expand, X } from "lucide-react-native";
export default function Modal() {
  const pronostco = useLocalSearchParams().pronostico;
  const pronosticoData = JSON.parse(pronostco as string);
  const [selectedSector, setSelectedSector] = useState(
    pronosticoData.sectores[0]
  );
  const [selectedTab, setSelectedTab] = useState("categoria");
  const [loading, setLoading] = useState(false);

  const handleSectorPress = (sector: Sector) => {
    setLoading(true);
    setSelectedSector(sector);
    // Simular carga de imágenes
    setTimeout(() => setLoading(false), 500);
  };

  const handleTabPress = (tab: SetStateAction<string>) => {
    setLoading(true);
    setSelectedTab(tab);
    // Simular carga de imágenes
    setTimeout(() => setLoading(false), 500);
  };

  const renderTabContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066cc" />
        </View>
      );
    }

    let imageUrl = "";
    switch (selectedTab) {
      case "categoria":
        imageUrl = selectedSector.datos.categoria;
        break;
      case "altura":
        imageUrl = selectedSector.datos.altura;
        break;
      case "periodo":
        imageUrl = selectedSector.datos.periodo;
        break;
      case "direccion":
        imageUrl = selectedSector.datos.direccion;
        break;
      case "marea":
        imageUrl = selectedSector.datos.marea;
        break;
      default:
        imageUrl = selectedSector.datos.categoria;
    }

    return (
      <>
      <TouchableOpacity
        onPress={() => {
          expand(imageUrl);
        }}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 1,
        }}
      ><Expand size={24} color="#000" /></TouchableOpacity>
      
      <Image
        source={{ uri: imageUrl }}
        style={styles.dataImage}
        contentFit="contain"
      /></>
    );
  };
  const expand = (url: string) => {
    router.push({
      pathname: "/img_expand",
      params: { expandedImage: url },
    });
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{pronosticoData.nombre}</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.closeButton}
        >
          <X size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Mapa y Mosaico */}
        <View style={styles.mapContainer}>
          <Text style={styles.sectionTitle}>Mapa de Pronóstico</Text>
          <TouchableOpacity
            onPress={() => {
              expand(pronosticoData.mapa_pronostico);
            }}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 1,
            }}
          >
            <Expand size={24} color="#000" />
          </TouchableOpacity>
          <Image
            source={{ uri: pronosticoData.mapa_pronostico }}
            style={styles.mapImage}
            contentFit="contain"
          />
        </View>

        <View style={styles.mapContainer}>
          <Text style={styles.sectionTitle}>Mosaico de Pronóstico</Text>
          <TouchableOpacity
            onPress={() => {
              expand(pronosticoData.mosaico_pronostico);
            }}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 1,
            }}
          ><Expand size={24} color="#000" /></TouchableOpacity>
          <Image
            source={{ uri: pronosticoData.mosaico_pronostico }}
            style={styles.mapImage}
            contentFit="contain"
          />
        </View>

        {/* Marcadores */}
        <View style={styles.markersContainer}>
          <Text style={styles.sectionTitle}>Ubicaciones</Text>
          {pronosticoData.markers.map(
            (marker: Marker, index: Key | null | undefined) => (
              <View key={index} style={styles.markerItem}>
                <Text style={styles.markerName}>{marker.nombre}</Text>
                <Text style={styles.markerCoords}>
                  Lat: {marker.lat}, Lng: {marker.lng}
                </Text>
              </View>
            )
          )}
        </View>
        {/* Sectores */}
        <View style={styles.sectorDataContainer}>
          <Text style={styles.sectionTitle}>Sectores</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {pronosticoData.sectores.map((sector: Sector) => (
              <TouchableOpacity
                key={sector.id}
                style={[
                  styles.sectorButton,
                  selectedSector.id === sector.id &&
                    styles.selectedSectorButton,
                ]}
                onPress={() => handleSectorPress(sector)}
              >
                <Text
                  style={[
                    styles.sectorButtonText,
                    selectedSector.id === sector.id &&
                      styles.selectedSectorButtonText,
                  ]}
                >
                  {sector.nombre}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Divider />
          {/* Datos del sector seleccionado */}
          <Text style={styles.selectedSectorTitle}>
            {selectedSector.nombre}
          </Text>

          {/* Tabs para los diferentes tipos de datos */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === "categoria" && styles.selectedTab,
              ]}
              onPress={() => handleTabPress("categoria")}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === "categoria" && styles.selectedTabText,
                ]}
              >
                Categoría
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === "altura" && styles.selectedTab,
              ]}
              onPress={() => handleTabPress("altura")}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === "altura" && styles.selectedTabText,
                ]}
              >
                Altura
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === "periodo" && styles.selectedTab,
              ]}
              onPress={() => handleTabPress("periodo")}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === "periodo" && styles.selectedTabText,
                ]}
              >
                Periodo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === "direccion" && styles.selectedTab,
              ]}
              onPress={() => handleTabPress("direccion")}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === "direccion" && styles.selectedTabText,
                ]}
              >
                Dirección
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === "marea" && styles.selectedTab,
              ]}
              onPress={() => handleTabPress("marea")}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === "marea" && styles.selectedTabText,
                ]}
              >
                Marea
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tabContent}>{renderTabContent()}</View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#2196F3",
    paddingTop: 20,
    paddingBottom: 15,
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  closeButton: {
    marginRight: 15,
  },
  closeButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  mapContainer: {
    padding: 15,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  mapImage: {
    width: "100%",
    height: 200,
    borderRadius: 5,
  },
  markersContainer: {
    padding: 15,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  markerItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  markerName: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },
  markerCoords: {
    fontSize: 12,
    color: "#666",
    marginTop: 3,
  },
  sectorButton: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 1,
    marginVertical: 10,
  },
  selectedSectorButton: {
    backgroundColor: "#0066cc",
  },
  sectorButtonText: {
    color: "#333",
    fontWeight: "500",
  },
  selectedSectorButtonText: {
    color: "white",
  },
  sectorDataContainer: {
    padding: 15,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  selectedSectorTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15,
    color: "#333",
    textAlign: "center",
  },
  tabsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 15,
  },
  tab: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 15,
    marginHorizontal: 2,
    marginVertical: 4,
  },
  selectedTab: {
    backgroundColor: "#0066cc",
  },
  tabText: {
    color: "#333",
    fontSize: 12,
    fontWeight: "500",
  },
  selectedTabText: {
    color: "white",
  },
  tabContent: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 250,
  },
  dataImage: {
    width: "100%",
    height: 200,
  },
  loadingContainer: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
});

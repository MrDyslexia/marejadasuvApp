import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import type { Region } from "@/types/type";
import { router } from "expo-router";
const RegionDetailModal = ({
  visible,
  region,
  onClose,
}: {
  visible: boolean;
  region: Region | null;
  onClose: () => void;
}) => {
  if (!region) return null;
  const attributeNames = {
    categoria: "Categoría",
    altura: "Altura",
    periodo: "Periodo",
    direccion: "Dirección",
    espectro: "Espectro",
  };
  const expandedImage = (image: string) => {
    // Cerrar el modal ANTES de navegar
    onClose();
    // Pequeño delay para asegurar que el modal se cierre
    setTimeout(() => {
      router.push({
        pathname: "/img_expand",
        params: { expandedImage: image },
      });
    }, 100);
  };
  type AttributeKey = keyof typeof attributeNames;

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>{region.nombre}</Text>
          <Text style={styles.detailsTitle}>Datos de Pronóstico</Text>
          <Text style={styles.modalSubtitle}>
            Lat: {region.lat}° | Lon: {region.lon}°
          </Text>
        </View>

        <ScrollView
          style={styles.modalContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.detailsContainer}>
            {(Object.keys(attributeNames) as AttributeKey[]).map((key) => (
              <View key={key} style={styles.detailItem}>
                <Text style={styles.detailLabel}>{attributeNames[key]}</Text>
                <TouchableOpacity
                  onPress={() => expandedImage(region.datosPronostico[key])}
                >
                  <Image
                    source={{ uri: region.datosPronostico[key] }}
                    style={styles.detailImage}
                    contentFit="contain"
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  modalHeader: {
    paddingHorizontal: 16,
    paddingBottom: 8,
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
    padding: 8,
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
    marginBottom: 16,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
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
    backgroundColor: "white",
  },
  expandedModalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  expandedImageContainer: {
    width: "95%",
    height: "80%",
    position: "relative",
  },
  expandedImage: {
    width: "100%",
    height: "100%",
  },
  closeExpandedButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 5,
  },
});

export default RegionDetailModal;

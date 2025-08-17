"use client";

import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import data from "@/data/data.json";

const { width } = Dimensions.get("window");

type FolletosScreenProps = {
  onBack: () => void;
};

export default function FolletosScreen({ onBack }: FolletosScreenProps) {
  const { folletos } = data.categorias;
  const [loadingImages, setLoadingImages] = useState<{
    [key: string]: boolean;
  }>({});

  const handleImageLoadStart = (imageId: string) => {
    setLoadingImages((prev) => ({ ...prev, [imageId]: true }));
  };

  const handleImageLoadEnd = (imageId: string) => {
    setLoadingImages((prev) => ({ ...prev, [imageId]: false }));
  };
  const expand = (currentImage: string) => {
    router.push({
      pathname: "/img_expand",
      params: { expandedImage: currentImage },
    });
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={onBack}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Volver a la pantalla anterior"
            accessibilityHint="Toca para regresar"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.backButtonText}>← Volver</Text>
          </TouchableOpacity>
          <Text style={styles.header} accessibilityRole="header">
            Folletos
          </Text>
        </View>

        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>
            {folletos.length}{" "}
            {folletos.length === 1
              ? "folleto disponible"
              : "folletos disponibles"}
          </Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          accessibilityLabel="Lista de folletos"
        >
          {folletos.map((folleto, index) => (
            <View
              key={folleto.id}
              style={styles.itemContainer}
              accessibilityLabel={`Folleto ${index + 1} de ${
                folletos.length
              }: ${folleto.nombre || folleto.descripcion}`}
            >
              <Text style={styles.itemName} accessibilityRole="header">
                {folleto.nombre || folleto.descripcion}
              </Text>

              <View style={styles.imagesContainer}>
                {folleto.imagenes.map((imagen, imageIndex) => (
                  <View
                    key={imagen.id}
                    style={styles.imageWrapper}
                    accessibilityRole="image"
                  >
                    <View style={styles.imageContainer}>
                      <TouchableOpacity onPress={() => { expand(imagen.url) }}>
                        <Image
                          source={{ uri: imagen.url }}
                          style={styles.image}
                          accessibilityLabel={`Imagen ${imageIndex + 1}: ${
                            imagen.descripcion
                          }`}
                          accessibilityHint="Imagen del folleto"
                          onLoadStart={() => handleImageLoadStart(imagen.id)}
                          onLoadEnd={() => handleImageLoadEnd(imagen.id)}
                          onError={() => handleImageLoadEnd(imagen.id)}
                        />
                        {loadingImages[imagen.id] && (
                          <View style={styles.loadingOverlay}>
                            <ActivityIndicator size="small" color="#6366f1" />
                          </View>
                        )}
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={styles.imageDescription}
                      accessibilityLabel={`Descripción: ${imagen.descripcion}`}
                    >
                      {imagen.descripcion}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}

          {folletos.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No hay folletos disponibles
              </Text>
              <Text style={styles.emptyStateSubtext}>
                Los folletos aparecerán aquí cuando estén disponibles
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#f1f5f9",
    marginRight: 16,
    minWidth: 44,
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6366f1",
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1e293b",
    flex: 1,
  },
  counterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
  },
  counterText: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  itemContainer: {
    marginBottom: 24,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  itemName: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: "#1e293b",
    lineHeight: 28,
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  imageWrapper: {
    width: (width - 64) / 2, // Account for container padding and gap
    marginBottom: 16,
  },
  imageContainer: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f8fafc",
  },
  image: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
    borderRadius: 12,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(248, 250, 252, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  imageDescription: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    color: "#64748b",
    lineHeight: 20,
    fontWeight: "500",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#64748b",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 20,
  },
});

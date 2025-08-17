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
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState, useEffect, useRef } from "react";
import data from "@/data/data.json";

const { width } = Dimensions.get("window");

type FolletosScreenProps = { onBack: () => void };

export default function FolletosScreen({ onBack }: FolletosScreenProps) {
  const { folletos } = data.categorias;
  const [loadingImages, setLoadingImages] = useState<{ [key: string]: boolean }>({});

  /* header animation */
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
  }, []);

  const handleImageLoadStart = (id: string) => setLoadingImages(p => ({ ...p, [id]: true }));
  const handleImageLoadEnd = (id: string) => setLoadingImages(p => ({ ...p, [id]: false }));

  const expand = (url: string) => router.push({ pathname: "/img_expand", params: { expandedImage: url } });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* HEADER REDISEÑADO */}
      <Animated.View style={{ opacity: fadeAnim }}>
        <LinearGradient
          colors={["#ffffff", "#f8fafc"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="#2196F3" />
            </TouchableOpacity>

            <View style={styles.titleGroup}>
              <Text style={styles.headerTitle}>Folletos</Text>
              <Text style={styles.headerCounter}>
                {folletos.length} {folletos.length === 1 ? "folleto" : "folletos"} disponibles
              </Text>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {folletos.map((folleto, idx) => (
          <View key={folleto.id} style={styles.itemContainer}>
            <Text style={styles.itemName}>{folleto.nombre || folleto.descripcion}</Text>

            <View style={styles.imagesContainer}>
              {folleto.imagenes.map(img => (
                <View key={img.id} style={styles.imageWrapper}>
                  <TouchableOpacity onPress={() => expand(img.url)}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={{ uri: img.url }}
                        style={styles.image}
                        onLoadStart={() => handleImageLoadStart(img.id)}
                        onLoadEnd={() => handleImageLoadEnd(img.id)}
                        onError={() => handleImageLoadEnd(img.id)}
                      />
                      {loadingImages[img.id] && (
                        <View style={styles.loadingOverlay}>
                          <ActivityIndicator size="small" color="#6366f1" />
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.imageDescription}>{img.descripcion}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        {!folletos.length && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No hay folletos disponibles</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- Estilos ---------- */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8fafc" },

  /* header */
  headerGradient: {
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingTop: 12,
    paddingBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 5,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    marginRight: 12,
    padding: 8,
    backgroundColor: "rgba(5, 121, 150, 0.12)",
    borderRadius: 20,
  },
  titleGroup: { flex: 1 },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 2,
  },
  headerCounter: {
    fontSize: 14,
    color: "#6b7280",
  },

  /* contenido */
  scrollContent: { padding: 20, paddingBottom: 40 },
  itemContainer: {
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 12,
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  imageWrapper: { width: (width - 64) / 2 },
  imageContainer: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f3f4f6",
  },
  image: { width: "100%", height: 160, borderRadius: 12 },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(248,250,252,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageDescription: {
    fontSize: 13,
    color: "#4b5563",
    textAlign: "center",
    marginTop: 6,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyStateText: { fontSize: 16, color: "#9ca3af" },
});
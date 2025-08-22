"use client"

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
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { useState, useEffect, useRef } from "react"
import data from "@/data/data.json"

const { width } = Dimensions.get("window")

type FolletosScreenProps = { onBack: () => void }

export default function FolletosScreen({ onBack }: FolletosScreenProps) {
  const { folletos } = data.categorias
  const [loadingImages, setLoadingImages] = useState<{ [key: string]: boolean }>({})
  const [expandedFolders, setExpandedFolders] = useState<{ [key: string]: boolean }>({})

  /* header animation */
  const fadeAnim = useRef(new Animated.Value(0)).current
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start()
  }, [])

  const handleImageLoadStart = (id: string) => setLoadingImages((p) => ({ ...p, [id]: true }))
  const handleImageLoadEnd = (id: string) => setLoadingImages((p) => ({ ...p, [id]: false }))

  const expand = (folleto: any, selectedImageIndex: number) => {
    const imageUrls = folleto.imagenes.map((img: any) => img.url)
    router.push({
      pathname: "/img_expand",
      params: {
        images: JSON.stringify(imageUrls),
        selectedIndex: selectedImageIndex.toString(),
      },
    })
  }

  const toggleFolder = (folletId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folletId]: !prev[folletId],
    }))
  }

  const renderFolderPreview = (imagenes: any[]) => {
    const previewImages = imagenes.slice(0, 3)

    return (
      <View style={styles.folderPreview}>
        {previewImages.map((img, index) => (
          <View
            key={img.id}
            style={[
              styles.previewImageContainer,
              {
                zIndex: previewImages.length - index,
                transform: [{ translateX: index * 8 }, { translateY: index * 6 }, { rotate: `${index * 2 - 2}deg` }],
              },
            ]}
          >
            <Image
              source={{ uri: img.url }}
              style={styles.previewImage}
              onLoadStart={() => handleImageLoadStart(`preview-${img.id}`)}
              onLoadEnd={() => handleImageLoadEnd(`preview-${img.id}`)}
              onError={() => handleImageLoadEnd(`preview-${img.id}`)}
            />
            {loadingImages[`preview-${img.id}`] && (
              <View style={styles.previewLoadingOverlay}>
                <ActivityIndicator size="small" color="#6366f1" />
              </View>
            )}
          </View>
        ))}

        {/* Icono de carpeta en la esquina */}
        <View style={styles.folderIcon}>
          <Ionicons name="folder" size={20} color="#f59e0b" />
        </View>

        {/* Contador de imágenes */}
        <View style={styles.imageCounter}>
          <Text style={styles.imageCounterText}>{imagenes.length}</Text>
        </View>
      </View>
    )
  }

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

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {folletos.map((folleto, idx) => (
          <View key={folleto.id} style={styles.folderContainer}>
            <TouchableOpacity onPress={() => toggleFolder(folleto.id)} style={styles.folderHeader}>
              <View style={styles.folderInfo}>
                {renderFolderPreview(folleto.imagenes)}
                <View style={styles.folderDetails}>
                  <Text style={styles.folderName}>{folleto.nombre || folleto.descripcion}</Text>
                  <Text style={styles.folderSubtitle}>
                    {folleto.imagenes.length} {folleto.imagenes.length === 1 ? "imagen" : "imágenes"}
                  </Text>
                </View>
              </View>

              <View style={styles.expandButton}>
                <Ionicons
                  name={expandedFolders[folleto.id] ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#6b7280"
                />
              </View>
            </TouchableOpacity>

            {expandedFolders[folleto.id] && (
              <Animated.View style={styles.expandedContent}>
                <View style={styles.imagesGrid}>
                  {folleto.imagenes.map((img, imageIndex) => (
                    <View key={img.id} style={styles.imageWrapper}>
                      <TouchableOpacity onPress={() => expand(folleto, imageIndex)}>
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
              </Animated.View>
            )}
          </View>
        ))}

        {!folletos.length && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No hay folletos disponibles</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
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

  folderContainer: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    overflow: "hidden",
  },

  folderHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },

  folderInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  folderPreview: {
    width: 80,
    height: 60,
    marginRight: 16,
    position: "relative",
  },

  previewImageContainer: {
    position: "absolute",
    width: 50,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
  },

  previewLoadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(248,250,252,0.8)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },

  folderIcon: {
    position: "absolute",
    top: -6,
    right: 8,
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 12,
  },

  imageCounter: {
    position: "absolute",
    bottom: -2,
    right: 8,
    backgroundColor: "#6366f1",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
    zIndex: 1,
  },

  imageCounterText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  folderDetails: {
    flex: 1,
  },

  folderName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
  },

  folderSubtitle: {
    fontSize: 14,
    color: "#6b7280",
  },

  expandButton: {
    padding: 8,
  },

  expandedContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  imagesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "flex-start",
    marginTop: 8,
  },

  // Estilos existentes para las imágenes expandidas
  imageWrapper: {
    width: (width - 64) / 2 - 8, // Dividir en 2 columnas con margen
    marginBottom: 12,
  },
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
})

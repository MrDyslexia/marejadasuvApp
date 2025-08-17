import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import data from "@/data/data.json";
import { useEffect, useRef, useState } from "react";

type VideosScreenProps = { onBack: () => void };

export default function VideosScreen({ onBack }: VideosScreenProps) {
  const { videos } = data.categorias;

  /* Animación del header */
  const fadeAnim = useRef(new Animated.Value(0)).current;

  /* Estado de carga */
  const [loading, setLoading] = useState(true);
  const contentAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    // Simulamos carga inicial
    const timer = setTimeout(() => {
      setLoading(false);
      Animated.timing(contentAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* HEADER */}
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
              <Text style={styles.headerTitle}>Galería de GIFs</Text>
              <Text style={styles.headerSubtitle}>
                Aprende a tu ritmo con nuestras animaciones educativas
              </Text>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* LOADING ANIMATION */}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loaderText}>Cargando contenido...</Text>
        </View>
      ) : (
        <Animated.View style={{ flex: 1, opacity: contentAnim }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {videos.map((video) => (
              <View key={video.id} style={styles.videoCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.videoTitle}>{video.nombre}</Text>
                  <View style={styles.videoBadge}>
                    <Text style={styles.videoBadgeText}>GIF</Text>
                  </View>
                </View>

                <View style={styles.mediaContainer}>
                  <Image
                    source={{ uri: video.url }}
                    style={styles.videoGif}
                    accessibilityLabel={video.descripcion}
                  />
                </View>

                <View style={styles.cardContent}>
                  <Text style={styles.videoDescription}>{video.descripcion}</Text>
                  {video.limitante && (
                    <View style={styles.limitanteContainer}>
                      <Text style={styles.limitanteLabel}>Limitante:</Text>
                      <Text style={styles.limitanteText}>
                        {video.limitante}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </ScrollView>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

/* ---------- ESTILOS ---------- */
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
  headerSubtitle: {
    fontSize: 14,
    color: "#6b7280",
  },

  /* loader */
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: 10,
    fontSize: 14,
    color: "#6b7280",
  },

  /* contenido */
  scrollContent: { padding: 20, paddingBottom: 40 },
  videoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  videoTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
  },
  videoBadge: {
    backgroundColor: "#ecfdf5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  videoBadgeText: {
    fontSize: 11,
    color: "#059669",
    fontWeight: "600",
  },
  mediaContainer: {
    position: "relative",
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  videoGif: { width: "100%", height: 200, resizeMode: "cover" },

  cardContent: {
    padding: 16,
  },
  videoDescription: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 20,
    marginBottom: 12,
  },
  limitanteContainer: {
    backgroundColor: "#fffbeb",
    padding: 12,
    borderRadius: 8,
  },
  limitanteLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#b45309",
    marginBottom: 2,
  },
  limitanteText: {
    fontSize: 12,
    color: "#b45309",
    lineHeight: 16,
  },
});

import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  Text,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Banner, Divider } from "react-native-paper";
import FeatureCard from "@/components/ui/FeatureCard";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
const Home = () => {
  const [bannerVisible, setBannerVisible] = React.useState(true);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Marejadas UV</Text>
        <Text style={styles.headerSubtitle}>Información oceánica de Chile</Text>
      </View>
      <Banner
        visible={bannerVisible}
        actions={[
          {
            label: "Iniciar sesión",
            textColor: "white",
            onPress: () => router.push("/"),
            mode: "contained",
          },
          {
            label: "Más tarde",
            onPress: () => setBannerVisible(false),
          },
        ]}
        icon={({ size }) => (
          <Ionicons name="lock-open-outline" size={size} color="#2196F3" />
        )}
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        Inicia sesión para desbloquear funcionalidades adicionales como guardar
        ubicaciones favoritas y recibir alertas personalizadas.
      </Banner>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Servicios de Pronóstico</Text>
          <Text style={styles.sectionDescription}>
            Explora nuestros diferentes servicios.
          </Text>
          <FeatureCard
            title="Pronóstico Costero"
            description="Acá encontrarás el pronóstico de oleaje para los próximos 7 días en el Océano Pacífico y las principales ciudades costeras de Chile. Este pronóstico indica el comportamiento esperado en la zona oceánica (lejos de la costa), y puede dar una idea del oleaje esperado en la costa, que dependerá de la orientación de ésta y la dirección de llegada del oleaje."
            icon="Waves"
            gradient={["#4A90E2", "#5C6BC0"]}
            onPress={() => router.push("/pc")}
          />
          <FeatureCard
            title="Pronóstico Oceánico"
            description="Aquí encontrarás el pronóstico de oleaje para los próximos 7 días en las principales bahías. Este pronóstico, calculado a una profundidad de 20 metros, indica cómo será el comportamiento del oleaje en la costa."
            icon="ChartSpline"
            gradient={["#26A69A", "#00796B"]}
            onPress={() => router.push("/po")}
          />
          <FeatureCard
            title="Categorías"
            description="Explora material educativo como folletos y videos animados diseñados para mejorar tu comprensión del pronóstico marítimo."
            icon="FolderOpen"
            gradient={["#8E24AA", "#6A1B9A"]}
            onPress={() => router.push("/Categorias")}
          />
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Información Adicional</Text>
          <Divider style={styles.divider} />

          <TouchableOpacity style={styles.infoItem}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="#2196F3"
              style={styles.infoIcon}
            />
            <View style={styles.infoContent}>
              <Text style={styles.infoItemTitle}>
                Acerca de los pronósticos
              </Text>
              <Text style={styles.infoItemDescription}>
                Conoce más sobre nuestros modelos de pronóstico
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoItem}>
            <Ionicons
              name="help-circle-outline"
              size={24}
              color="#2196F3"
              style={styles.infoIcon}
            />
            <View style={styles.infoContent}>
              <Text style={styles.infoItemTitle}>Preguntas frecuentes</Text>
              <Text style={styles.infoItemDescription}>
                Respuestas a las dudas más comunes
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoItem}>
            <Ionicons
              name="mail-outline"
              size={24}
              color="#2196F3"
              style={styles.infoIcon}
            />
            <View style={styles.infoContent}>
              <Text style={styles.infoItemTitle}>Contacto</Text>
              <Text style={styles.infoItemDescription}>
                Ponte en contacto con nuestro equipo
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 Marejadas UV</Text>
          <Text style={styles.footerText}>
            Desarrollado por el equipo de investigación oceánica
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: "#2196F3",
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
  content: {
    flex: 1,
  },
  featuredSection: {
    padding: 16,
  },
  sectionTitle: {
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  sectionDescription: {
    color: "#666",
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  cardGradient: {
    borderRadius: 16,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardIcon: {
    marginRight: 12,
  },
  cardTitle: {
    color: "white",
    fontWeight: "bold",
    flex: 1,
  },
  imageContainer: {
    height: 150,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardDescription: {
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 16,
  },
  cardButton: {
    borderRadius: 8,
    marginTop: 8,
  },
  infoSection: {
    backgroundColor: "#fff",
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  infoTitle: {
    fontWeight: "bold",
    color: "#333",
  },
  divider: {
    marginVertical: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoIcon: {
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoItemTitle: {
    fontWeight: "500",
    color: "#333",
  },
  infoItemDescription: {
    color: "#666",
  },
  footer: {
    padding: 16,
    alignItems: "center",
  },
  footerText: {
    color: "#999",
    textAlign: "center",
    marginBottom: 4,
  },
});
export default Home;

"use client";

import { type SetStateAction, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import FolletosScreen from "@/components/categorias/FolletosScreen";
import VideosScreen from "@/components/categorias/VideosScreen";
import TideBackground from "./TideBackground";
import { BookOpenText, Clapperboard } from "lucide-react-native";
const { width, height } = Dimensions.get("window");

export default function CategoriesView() {
  const [currentView, setCurrentView] = useState("main");

  const handleSelectView = (viewName: SetStateAction<string>) => {
    setCurrentView(viewName);
  };

  const handleBack = () => {
    setCurrentView("main");
  };

  switch (currentView) {
    case "folletos":
      return <FolletosScreen onBack={handleBack} />;
    case "videos":
      return <VideosScreen onBack={handleBack} />;
    case "main":
    default:
      return (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={StyleSheet.absoluteFill} pointerEvents="none">
            <TideBackground />
          </View>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.header}>Explora Nuestras Categorías</Text>
              <Text style={styles.subtext}>
                Descubre contenido educativo que te inspire
              </Text>
            </View>

            <View style={styles.categoriesContainer}>
              <TouchableOpacity
                style={[styles.categoryCard, styles.folletosCard]}
                onPress={() => handleSelectView("folletos")}
                activeOpacity={0.8}
              >
                <View style={styles.cardIcon}>
                  <BookOpenText size={40} color="#3661a7ff" />
                </View>
                <Text style={styles.categoryTitle}>Folletos</Text>
                <Text style={styles.categoryDescription}>
                  Accede a recursos visuales que te ayudarán a aprender
                </Text>
                <View style={styles.cardButton}>
                  <Text style={styles.buttonText}>Explorar</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.categoryCard, styles.videosCard]}
                onPress={() => handleSelectView("videos")}
                activeOpacity={0.8}
              >
                <View style={styles.cardIcon}>
                  <Clapperboard size={40} color="#3661a7ff" />
                </View>
                <Text style={styles.categoryTitle}>Videos</Text>
                <Text style={styles.categoryDescription}>
                  Aprende a tu ritmo con nuestros videos educativos
                </Text>
                <View style={styles.cardButton}>
                  <Text style={styles.buttonText}>Ver Videos</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    minHeight: height,
  },
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05, // 5% del ancho
    paddingTop: height * 0.05, // 5% de la altura
    paddingBottom: 40,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: height * 0.04, // 4% de la altura
  },
  header: {
    fontSize: width * 0.07, // 7% del ancho
    fontWeight: "bold",
    color: "#2196F3",
    textAlign: "center",
    marginBottom: 8,
  },
  subtext: {
    fontSize: width * 0.04, // 4% del ancho
    color: "#64748b",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: width * 0.05, // 5% del ancho
  },
  categoriesContainer: {
    flex: 1,
    justifyContent: "center",
    gap: height * 0.03, // 3% de la altura
    marginBottom: height * 0.05, // 5% de la altura
  },
  categoryCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: width * 0.06, // 6% del ancho
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    width: "100%",
    maxWidth: 500, // Máximo ancho para tablets
    alignSelf: "center",
  },
  folletosCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },
  videosCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },
  cardIcon: {
    width: width * 0.15, // 15% del ancho
    height: width * 0.15,
    maxWidth: 70,
    maxHeight: 70,
    backgroundColor: "#b9e0ffff",
    borderRadius: width * 0.075, // Mitad del width
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.02, // 2% de la altura
  },
  iconText: {
    fontSize: width * 0.06, // 6% del ancho
  },
  categoryTitle: {
    fontSize: width * 0.055, // 5.5% del ancho
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 8,
  },
  categoryDescription: {
    fontSize: width * 0.035, // 3.5% del ancho
    color: "#64748b",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: height * 0.02, // 2% de la altura
    paddingHorizontal: width * 0.02, // 2% del ancho
  },
  cardButton: {
    backgroundColor: "#2196F3",
    paddingVertical: height * 0.015, // 1.5% de la altura
    paddingHorizontal: width * 0.08, // 8% del ancho
    borderRadius: 25,
    minWidth: width * 0.3, // 30% del ancho
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: width * 0.04, // 4% del ancho
    fontWeight: "600",
  },
});

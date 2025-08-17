"use client"

import { type SetStateAction, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import FolletosScreen from "@/components/categorias/FolletosScreen"
import VideosScreen from "@/components/categorias/VideosScreen"

const { width } = Dimensions.get("window")

export default function CategoriesView() {
  const [currentView, setCurrentView] = useState("main")

  const handleSelectView = (viewName: SetStateAction<string>) => {
    setCurrentView(viewName)
  }

  const handleBack = () => {
    setCurrentView("main")
  }

  switch (currentView) {
    case "folletos":
      return <FolletosScreen onBack={handleBack} />
    case "videos":
      return <VideosScreen onBack={handleBack} />
    case "main":
    default:
      return (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Explora Nuestras Categorías</Text>
            <Text style={styles.subtext}>Descubre contenido educativo que te inspire</Text>
          </View>

          <View style={styles.categoriesContainer}>
            <TouchableOpacity
              style={[styles.categoryCard, styles.folletosCard]}
              onPress={() => handleSelectView("folletos")}
              activeOpacity={0.8}
            >
              <View style={styles.cardIcon}>
                <Text style={styles.iconText}>📋</Text>
              </View>
              <Text style={styles.categoryTitle}>Folletos</Text>
              <Text style={styles.categoryDescription}>Accede a recursos visuales que te ayudarán a aprender</Text>
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
                <Text style={styles.iconText}>🎥</Text>
              </View>
              <Text style={styles.categoryTitle}>Videos</Text>
              <Text style={styles.categoryDescription}>Aprende a tu ritmo con nuestros videos educativos</Text>
              <View style={styles.cardButton}>
                <Text style={styles.buttonText}>Ver Videos</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2196F3",
    textAlign: "center",
    marginBottom: 8,
    fontFamily: "System", // Work Sans Bold equivalent
  },
  subtext: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 20,
    fontFamily: "System", // Open Sans Regular equivalent
  },
  categoriesContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 24,
  },
  categoryCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
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
    width: 60,
    height: 60,
    backgroundColor: "#b9e0ffff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  iconText: {
    fontSize: 24,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 8,
    fontFamily: "System",
  },
  categoryDescription: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontFamily: "System",
  },
  cardButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    minWidth: 120,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "System",
  },
})

"use client"

import { SetStateAction, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import FolletosScreen from "@/components/categorias/FolletosScreen"
import VideosScreen from "@/components/categorias/VideosScreen"

export default function CategoriesView() {
  // 'main' para la selección, 'folletos' para la vista de folletos, 'videos' para la vista de videos
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
          <Text style={styles.header}>Categorías</Text>

          <TouchableOpacity style={styles.optionButton} onPress={() => handleSelectView("folletos")}>
            <Text style={styles.optionButtonText}>Folletos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={() => handleSelectView("videos")}>
            <Text style={styles.optionButtonText}>Videos</Text>
          </TouchableOpacity>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333",
  },
  optionButton: {
    backgroundColor: "#6200ee",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  optionButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
})

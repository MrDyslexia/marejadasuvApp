"use client"

import { StyleSheet, TouchableOpacity, View, Dimensions, ScrollView, Image } from "react-native"
import ImageViewer from "react-native-image-zoom-viewer"
import { Ionicons } from "@expo/vector-icons"
import { useLocalSearchParams, router } from "expo-router"
import { useState, useEffect, Key } from "react"
import { AlignCenter } from "lucide-react-native"

const Img_expand = () => {
  const { images, selectedIndex } = useLocalSearchParams<{
    images: string
    selectedIndex: string
  }>()

  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showHUD, setShowHUD] = useState(true)

  const imageUrls = JSON.parse(images).map((url: string) => ({ url }))
  const initialIndex = selectedIndex ? Number.parseInt(selectedIndex) : 0
  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get("window")
      setOrientation(width > height ? "landscape" : "portrait")
    }

    updateOrientation()
    const subscription = Dimensions.addEventListener("change", updateOrientation)

    return () => subscription?.remove()
  }, [])

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  const navigateToImage = (index: number) => {
    setCurrentIndex(index)
  }

  const toggleHUD = () => {
    setShowHUD(!showHUD)
  }

  if (!images) return null

  return (
    <View style={{ flex: 1 }}>
      <ImageViewer
        imageUrls={imageUrls}
        index={currentIndex}
        enableSwipeDown
        onSwipeDown={() => router.back()}
        renderIndicator={() => <></>}
        enableImageZoom={true}
        saveToLocalByLongPress={false}
        onChange={(index) => setCurrentIndex(index || 0)}
        onClick={toggleHUD}
      />

      <TouchableOpacity style={styles.closeExpandedButton} onPress={() => router.back()}>
        <Ionicons name="close" size={30} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.hudToggleButton,
          orientation === "landscape" ? styles.hudToggleLandscape : styles.hudTogglePortrait,
        ]}
        onPress={toggleHUD}
      >
        <Ionicons name={showHUD ? "eye-off" : "eye"} size={24} color="#fff" />
      </TouchableOpacity>

      {showHUD && (
        <View style={[styles.hudContainer, orientation === "landscape" ? styles.hudLandscape : styles.hudPortrait]}>
          <ScrollView
            horizontal={orientation === "portrait"}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              orientation === "landscape" ? styles.hudContentVertical : styles.hudContentHorizontal
            }
          >
            {imageUrls.map((image: { url: any }, index: number) => (
              <TouchableOpacity
                key={index}
                style={[styles.thumbnailContainer, currentIndex === index && styles.thumbnailActive]}
                onPress={() => navigateToImage(index)}
              >
                <Image source={{ uri: image.url }} style={styles.thumbnail} resizeMode="cover" />
                {currentIndex === index && (
                  <View style={styles.thumbnailIndicator}>
                    <Ionicons name="checkmark-circle" size={20} color="#007AFF" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  closeExpandedButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 20,
    padding: 8,
    zIndex: 3,
  },
  hudToggleButton: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 20,
    padding: 8,
    zIndex: 3,
  },
  hudTogglePortrait: {
    top: 20,
    left: 20,
  },
  hudToggleLandscape: {
    top: 20,
    left: 20,
  },
  hudContainer: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.8)",
    zIndex: 2,
  },
  hudPortrait: {
    bottom: 0,
    left: 50,
    right: 0,
    height: 120,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  hudLandscape: {
    right: 0,
    top: 100,
    bottom: 0,
    width: 100,
    paddingHorizontal: 8,
    paddingVertical: 10,

  },
  hudContentHorizontal: {
    alignItems: "center",
    paddingHorizontal: 5,
  },
  hudContentVertical: {
    alignItems: "center",
    paddingVertical: 5,
  },
  thumbnailContainer: {
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  thumbnailActive: {
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  thumbnailIndicator: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 10,
  },
  imageCounter: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  counterText: {
    marginLeft: 4,
    flexDirection: "row",
    alignItems: "center",
  },
})

export default Img_expand

"use client"

import { useState, useEffect, useRef } from "react"
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Dimensions, Platform } from "react-native"
import { Image } from "expo-image"
import { Ionicons } from "@expo/vector-icons"
import * as FileSystem from "expo-file-system"
import { SegmentedButtons } from "react-native-paper"

const AnimatedMap = () => {
  const [currentFrame, setCurrentFrame] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [preloadProgress, setPreloadProgress] = useState(0)
  const [preloadedFrames, setPreloadedFrames] = useState<Record<number, string>>({})
  const [activeImageIndex, setActiveImageIndex] = useState(0) // Para alternar entre las dos imágenes
  const [frameRate, setFrameRate] = useState<number>(200) // ms entre frames
  const totalFrames = 61
  const animationRef = useRef<NodeJS.Timeout | null>(null)

  // Función para generar la URL de la imagen
  const getImageUrl = (frame: number) => {
    return `https://marejadas.uv.cl/images/SAM/pacifico/Campo${frame}.png`
  }

  // Función para precargar todas las imágenes
  useEffect(() => {
    const preloadImages = async () => {
      setIsInitialLoading(true)
      const frames: Record<number, string> = {}

      // Crear directorio temporal si no existe (solo para FileSystem)
      if (Platform.OS !== "web") {
        const dirInfo = await FileSystem.getInfoAsync(FileSystem.cacheDirectory + "map-frames/")
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(FileSystem.cacheDirectory + "map-frames/")
        }
      }

      // Precargar imágenes en grupos para no sobrecargar la memoria
      const batchSize = 5
      for (let batch = 0; batch < Math.ceil(totalFrames / batchSize); batch++) {
        const batchPromises = []

        for (let i = 0; i < batchSize; i++) {
          const frameNumber = batch * batchSize + i + 1
          if (frameNumber <= totalFrames) {
            batchPromises.push(preloadSingleImage(frameNumber))
          }
        }

        const batchResults = await Promise.all(batchPromises)

        batchResults.forEach((result, index) => {
          if (result) {
            const frameNumber = batch * batchSize + index + 1
            frames[frameNumber] = result
          }
        })

        // Actualizar progreso
        setPreloadProgress(Math.min(100, Math.round(((batch + 1) * batchSize * 100) / totalFrames)))
      }

      setPreloadedFrames(frames)
      setIsInitialLoading(false)
    }

    const preloadSingleImage = async (frameNumber: number): Promise<string> => {
      try {
        const remoteUrl = getImageUrl(frameNumber)

        // En plataformas nativas, descargamos y almacenamos localmente
        if (Platform.OS !== "web") {
          const localUri = FileSystem.cacheDirectory + `map-frames/frame-${frameNumber}.png`
          const fileInfo = await FileSystem.getInfoAsync(localUri)

          if (!fileInfo.exists) {
            const downloadResult = await FileSystem.downloadAsync(remoteUrl, localUri)
            if (downloadResult.status === 200) {
              return localUri
            }
          } else {
            return localUri
          }
        }

        // En web, simplemente precargamos la imagen
        return remoteUrl
      } catch (error) {
        console.error(`Error preloading frame ${frameNumber}:`, error)
        // Si hay error, devolvemos la URL original como fallback
        return getImageUrl(frameNumber)
      }
    }

    preloadImages()

    // Limpieza al desmontar
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current)
      }
    }
  }, [])

  // Función para actualizar el intervalo de animación
  const updateAnimationInterval = (newFrameRate: number) => {
    setFrameRate(newFrameRate)

    if (isPlaying) {
      if (animationRef.current) {
        clearInterval(animationRef.current)
      }

      animationRef.current = setInterval(() => {
        setCurrentFrame((prev) => {
          const nextFrame = prev === totalFrames ? 1 : prev + 1
          setActiveImageIndex((current) => (current === 0 ? 1 : 0))
          return nextFrame
        })
      }, newFrameRate)
    }
  }

  // Iniciar/detener la animación
  useEffect(() => {
    if (isPlaying && !isInitialLoading) {
      animationRef.current = setInterval(() => {
        setCurrentFrame((prev) => {
          const nextFrame = prev === totalFrames ? 1 : prev + 1
          // Alternar entre las dos imágenes para evitar parpadeo
          setActiveImageIndex((current) => (current === 0 ? 1 : 0))
          return nextFrame
        })
      }, frameRate)
    } else if (animationRef.current) {
      clearInterval(animationRef.current)
    }

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current)
      }
    }
  }, [isPlaying, isInitialLoading, frameRate])

  // Controles de la animación
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const goToNextFrame = () => {
    if (isPlaying) setIsPlaying(false)
    setCurrentFrame((prev) => {
      const nextFrame = prev === totalFrames ? 1 : prev + 1
      setActiveImageIndex((current) => (current === 0 ? 1 : 0))
      return nextFrame
    })
  }

  const goToPrevFrame = () => {
    if (isPlaying) setIsPlaying(false)
    setCurrentFrame((prev) => {
      const nextFrame = prev === 1 ? totalFrames : prev - 1
      setActiveImageIndex((current) => (current === 0 ? 1 : 0))
      return nextFrame
    })
  }

  // Función para obtener el frame siguiente (para precargar)
  const getNextFrame = (frame: number) => {
    return frame === totalFrames ? 1 : frame + 1
  }

  // Renderizar pantalla de carga inicial
  if (isInitialLoading) {
    return (
      <View style={styles.animatedMapContainer}>
        <Text style={styles.sectionTitle}>Mapa Animado</Text>
        <View style={styles.mapFrameContainer}>
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#2196F3" />
            <Text style={styles.loadingText}>Precargando frames: {preloadProgress}%</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${preloadProgress}%` }]} />
            </View>
          </View>
        </View>
      </View>
    )
  }

  // Obtener URLs para las dos imágenes (actual y siguiente)
  const currentImageUrl = preloadedFrames[currentFrame] || getImageUrl(currentFrame)
  const nextImageUrl = preloadedFrames[getNextFrame(currentFrame)] || getImageUrl(getNextFrame(currentFrame))

  return (
    <View style={styles.animatedMapContainer}>
      <Text style={styles.sectionTitle}>Mapa Animado</Text>
      <View style={styles.mapFrameContainer}>
        {/* Técnica de doble buffer: dos imágenes superpuestas, alternando cuál está visible */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: activeImageIndex === 0 ? currentImageUrl : nextImageUrl }}
            style={[styles.mapFrame, { opacity: 1 }]}
            contentFit="contain"
            cachePolicy="memory"
          />
          <Image
            source={{ uri: activeImageIndex === 1 ? currentImageUrl : nextImageUrl }}
            style={[styles.mapFrame, { opacity: 1, position: "absolute", top: 0, left: 0 }]}
            contentFit="contain"
            cachePolicy="memory"
          />
        </View>
        <Text style={styles.frameCounter}>
          Frame: {currentFrame}/{totalFrames}
        </Text>
      </View>
      <View style={styles.sliderTrack}>
          <View style={[styles.sliderFill, { width: `${((currentFrame - 1) / (totalFrames - 1)) * 100}%` }]} />
        </View>
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={goToPrevFrame}>
          <Ionicons name="play-back" size={24} color="#2196F3" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.playPauseButton} onPress={togglePlayPause}>
          <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={goToNextFrame}>
          <Ionicons name="play-forward" size={24} color="#2196F3" />
        </TouchableOpacity>
      </View>
      <View style={styles.speedControlContainer}>
        <SegmentedButtons
          density="small"
          value={frameRate.toString()}
          onValueChange={(value) => updateAnimationInterval(Number.parseInt(value))}
          buttons={[
            {
              value: "500",
              label: "0.5x",
            },
            {
              value: "200",
              label: "1x",
            },
            {
              value: "100",
              label: "2x",
            },
          ]}
          style={styles.segmentedButtons}
        />
      </View>
    </View>
  )
}

const { width } = Dimensions.get("window")
const styles = StyleSheet.create({
  animatedMapContainer: {
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  mapFrameContainer: {
    height: 250,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
    backgroundColor: "white",
  },
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  progressBarContainer: {
    width: "80%",
    height: 8,
    backgroundColor: "#ddd",
    borderRadius: 4,
    marginTop: 8,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#2196F3",
  },
  mapFrame: {
    width: "100%",
    height: "100%",
  },
  frameCounter: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "#fff",
    padding: 4,
    borderRadius: 4,
    fontSize: 12,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  controlButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 12,
  },
  playPauseButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
  },
  speedControlContainer: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  segmentedButtons: {
    flex: 1,
    maxWidth: "70%",
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    paddingHorizontal: 8,
  },
  sliderButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  sliderButtonText: {
    fontSize: 12,
    color: "#555",
  },
  sliderTrack: {
    flex: 1,
    height: 4,
    backgroundColor: "#ddd",
    borderRadius: 2,
    marginHorizontal: 8,
    overflow: "hidden",
  },
  sliderFill: {
    height: "100%",
    backgroundColor: "#2196F3",
  },
})

export default AnimatedMap

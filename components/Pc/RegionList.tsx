import { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import type { Region } from "@/types/type"
import { ChartSpline, TreePalm, MapPin } from "lucide-react-native"

const { width } = Dimensions.get("window")
const CARD_WIDTH = width * 0.7

const RegionList = ({
  regions,
  onRegionSelect,
  modalVisible
}: {
  regions: Region[]
  onRegionSelect: (region: Region) => void
  selectedRegionId?: string
  modalVisible: (visible: boolean) => void
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollX = new Animated.Value(0)

  // Renderizar cada tarjeta de región
  const renderRegionCard = ({ item, index }: { item: Region; index: number }) => {
    // Animación para el efecto de parallax
    const inputRange = [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, (index + 1) * CARD_WIDTH]

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: "clamp",
    })

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 1, 0.7],
      extrapolate: "clamp",
    })

    return (
      <Animated.View
        style={[
          styles.cardContainer,
          {
            transform: [{ scale }],
            opacity,
          },
        ]}
      >
        <LinearGradient
          colors={["#34b1fd", "#1863b5"]}
          style={styles.cardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <MapPin size={20} color="white" />
              </View>
              <View style={styles.regionInfo}>
                <Text style={styles.regionName}>{item.nombre}</Text>
                <Text style={styles.regionCoords}>
                  Lat: {item.lat}° | Lon: {item.lon}°
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.cardFooter}>
              <View style={styles.oceanDataPreview}>
                <ChartSpline size={28} color={"white"} />
                <Text style={styles.dataPreviewText}>Datos</Text>
              </View>

              <TouchableOpacity 
                style={styles.viewDetailsButton} 
                onPress={() => onRegionSelect(item)}
              >
                <Text style={styles.viewDetailsText}>Ver detalles</Text>
                <Ionicons name="chevron-forward" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      {/* Header con título y botón */}
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Ionicons name="location" size={24} color="#2196F3" />
          <Text style={styles.sectionTitle}>Zonas Costeras</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.coastalMapButton} 
          onPress={() => modalVisible(true)}
        >
          <View style={styles.mapButtonContent}>
            <TreePalm size={28} color="#9CA3AF" />
            <Text style={styles.mapButtonText}>Mapa Costero</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Lista de regiones con scroll horizontal */}
      <View style={styles.regionListContainer}>
        <Animated.FlatList
          data={regions}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 20}
          decelerationRate="fast"
          contentContainerStyle={styles.regionListContent}
          renderItem={renderRegionCard}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          initialScrollIndex={activeIndex}
          getItemLayout={(_, index) => ({
            length: CARD_WIDTH + 20,
            offset: (CARD_WIDTH + 20) * index,
            index,
          })}
        />

        {/* Indicadores de paginación */}
        <View style={styles.paginationContainer}>
          {regions.map((_, index) => {
            const inputRange = [
              (index - 1) * (CARD_WIDTH + 20), 
              index * (CARD_WIDTH + 20), 
              (index + 1) * (CARD_WIDTH + 20)
            ]

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 16, 8],
              extrapolate: "clamp",
            })

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            })

            return (
              <Animated.View 
                key={index} 
                style={[styles.paginationDot, { width: dotWidth, opacity }]} 
              />
            )
          })}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    marginVertical: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
    marginLeft: 8,
  },
  coastalMapButton: {
    backgroundColor: "#ffffff",
    borderWidth: 3,
    borderColor: "#9CA3AF",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mapButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  mapButtonText: {
    color: "#9CA3AF",
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 8,
  },
  regionListContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 16,
    paddingLeft: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  regionListContent: {
    paddingBottom: 16,
  },
  cardContainer: {
    width: CARD_WIDTH,
    marginRight: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  cardGradient: {
    borderRadius: 16,
    overflow: "hidden",
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  regionInfo: {
    flex: 1,
  },
  regionName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  regionCoords: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginVertical: 12,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  oceanDataPreview: {
    alignItems: "center",
  },
  dataPreviewText: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
  },
  viewDetailsButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  viewDetailsText: {
    fontSize: 12,
    color: "white",
    fontWeight: "500",
    marginRight: 4,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2196F3",
    marginHorizontal: 4,
  },
})

export default RegionList
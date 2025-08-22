import { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Animated} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import type { Region } from "@/types/type"
import { ChartSpline } from "lucide-react-native"

const { width } = Dimensions.get("window")
const CARD_WIDTH = width * 0.7

const RegionList = ({
  regions,
  onRegionSelect,
}: {
  regions: Region[]
  onRegionSelect: (region: Region) => void
  selectedRegionId?: string
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
                <Ionicons name="map" size={24} color="white" style={styles.regionIcon} />
                <View>
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
                </View>

                <TouchableOpacity style={styles.viewDetailsButton} onPress={() => onRegionSelect(item)}>
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
    <View style={styles.regionListContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>Zonas</Text>
      </View>

      <Animated.FlatList
        data={regions}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH}
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
          length: CARD_WIDTH,
          offset: CARD_WIDTH * index,
          index,
        })}
      />

      {/* Indicadores de paginación */}
      <View style={styles.paginationContainer}>
        {regions.map((_, index) => {
          const inputRange = [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, (index + 1) * CARD_WIDTH]

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

          return <Animated.View key={index} style={[styles.paginationDot, { width: dotWidth, opacity }]} />
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  regionListContainer: {
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  regionListContent: {
    paddingBottom: 8,
  },
  cardContainer: {
    width: CARD_WIDTH,
    paddingHorizontal: 10,
  },
  cardGradient: {
    flex: 1,
    justifyContent: "space-between",
    borderRadius: 16,
  },
  cardContent: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  regionIcon: {
    marginRight: 12,
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
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginVertical: 12,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  oceanDataPreview: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  viewDetailsButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  viewDetailsText: {
    fontSize: 12,
    color: "white",
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

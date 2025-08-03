import { Acc } from "@/types/type"
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import ImageViewer from "@/components/Acc/ImageViewer"
const DetailModal = () => {
  const { datos } = useLocalSearchParams()
  const acc = JSON.parse(datos as string) as Acc
  return (
    <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={()=>router.back()} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>{acc.nombre}</Text>
          <Text style={styles.modalSubtitle}>
            Lat: {acc.lat}° | Lon: {acc.lon}°
          </Text>
        </View>

        <View style={styles.modalContent}>
          <ImageViewer acc={acc} />
        </View>
      </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    modalHeader: {
        paddingHorizontal: 16,
        paddingBottom: 8,
        paddingTop: 16,
        backgroundColor: "#2196F3",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    closeButton: {
        position: "absolute",
        top: 16,
        right: 16,
        zIndex: 1,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 8,
        color: "#fff",
    },
    modalSubtitle: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.8)",
        marginTop: 4,
    },
    modalContent: {
        flex: 1,
        padding: 16,
    },
})
  

export default DetailModal
import { Acc } from "@/types/type"
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
} from "react-native"
import LocationCard from "@/components/Acc/LocationCard"
import { router } from "expo-router"
const AccDataView = ({ accData }: { accData: Acc[] }) => {
  const handleCardPress = (acc: Acc) => {
    router.push({
      pathname: '/acc_modal',
      params: { datos: JSON.stringify(acc) },
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Aproximación costera de Chile</Text>
        <Text style={styles.headerSubtitle}>Selecciona una ubicación para ver detalles</Text>
      </View>

      <FlatList
        data={accData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <LocationCard acc={item} onPress={() => handleCardPress(item)} />}
        contentContainerStyle={styles.cardList}
      />
    </SafeAreaView>
  )
}
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
  cardList: {
    padding: 16,
  },
})

export default AccDataView

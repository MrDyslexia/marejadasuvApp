import { ScrollView, View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native"
import data from "@/data/data.json" // Importa el archivo JSON

const { width } = Dimensions.get("window")

type VideosScreenProps = {
  onBack: () => void;
};

export default function VideosScreen({ onBack }: VideosScreenProps) {
  const { videos } = data.categorias

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>{"< Volver"}</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Videos</Text>
      {videos.map((video) => (
        <View key={video.id} style={styles.itemContainer}>
          <Text style={styles.itemName}>{video.nombre}</Text>
          <Image source={{ uri: video.url }} style={styles.videoGif} accessibilityLabel={video.descripcion} />
          <Text style={styles.videoDescription}>{video.descripcion}</Text>
          {video.limitante && (
            <Text style={styles.videoLimitante}>
              <Text style={{ fontWeight: "bold" }}>Limitante:</Text> {video.limitante}
            </Text>
          )}
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 16,
  },
  backButton: {
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
    alignSelf: "flex-start",
  },
  backButtonText: {
    fontSize: 18,
    color: "#6200ee",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#333",
  },
  itemContainer: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  videoGif: {
    width: "100%",
    height: 250, // Fixed height for video GIFs
    resizeMode: "contain",
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  videoDescription: {
    fontSize: 14,
    marginBottom: 8,
    color: "#444",
    lineHeight: 20,
  },
  videoLimitante: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#777",
    lineHeight: 20,
  },
})

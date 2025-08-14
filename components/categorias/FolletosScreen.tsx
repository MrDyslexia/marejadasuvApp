import { ScrollView, View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native"
import data from "@/data/data.json" // Importa el archivo JSON

const { width } = Dimensions.get("window")

type FolletosScreenProps = {
  onBack: () => void;
};

export default function FolletosScreen({ onBack }: FolletosScreenProps) {
  const { folletos } = data.categorias

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>{"< Volver"}</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Folletos</Text>
      {folletos.map((folleto) => (
        <View key={folleto.id} style={styles.itemContainer}>
          <Text style={styles.itemName}>{folleto.nombre || folleto.descripcion}</Text>
          <View style={styles.imagesContainer}>
            {folleto.imagenes.map((imagen) => (
              <View key={imagen.id} style={styles.imageWrapper}>
                <Image source={{ uri: imagen.url }} style={styles.image} accessibilityLabel={imagen.descripcion} />
                <Text style={styles.imageDescription}>{imagen.descripcion}</Text>
              </View>
            ))}
          </View>
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
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10, // Using gap for spacing, requires React Native 0.71+
  },
  imageWrapper: {
    width: width / 2 - 30, // Adjust width for two columns with padding
    marginBottom: 10,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200, // Fixed height for brochure images
    resizeMode: "contain",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  imageDescription: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 8,
    color: "#666",
  },
})

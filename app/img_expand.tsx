import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
const Img_expand = () => {
  const { expandedImage } = useLocalSearchParams();
  if (!expandedImage) return null;
  const close_back = () => {
    router.back();
  };
  return (
    <View style={styles.modalContainer}>
      <SafeAreaView style={styles.modalContainer}>
        <Image
          style={styles.expandedImage}
          source={{ uri: expandedImage || "" }}
          contentFit="contain"
        />
        <TouchableOpacity
          style={styles.closeExpandedButton}
          onPress={() => close_back()}
        >
          <Ionicons name="close" size={30} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  expandedImage: {
    width: "100%",
    height: "100%",
  },
  closeExpandedButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 5,
  },
});

export default Img_expand;

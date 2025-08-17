import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Attribute, Direction } from "@/types/type";
import { Image } from "expo-image";
import { useState } from "react";
import { Acc } from "@/types/type";
import { router } from "expo-router";
import { Expand } from "lucide-react-native";
const ImageViewer = ({ acc }: { acc: Acc }) => {
  const [direction, setDirection] = useState<Direction>("oeste");
  const [attribute, setAttribute] = useState<Attribute>("categoria");
  const [loading, setLoading] = useState(true);

  // Obtener la imagen actual basada en la dirección y atributo seleccionados
  const currentImage = acc[direction][attribute];

  // Mapeo de nombres para mostrar
  const directionNames = {
    norOeste: "Nor-Oeste",
    oeste: "Oeste",
    surOeste: "Sur-Oeste",
  };

  const attributeNames = {
    categoria: "Categoría",
    altura: "Altura",
    periodo: "Periodo",
    direccion: "Dirección",
    marea: "Marea",
  };
  const expand = (currentImage:string) => {
    router.push({ pathname: "/img_expand", params: { expandedImage: currentImage } })
  };
  return (
    <View style={styles.imageViewerContainer}>
      {/* Selector de dirección */}
      <View style={styles.tabContainer}>
        {(["norOeste", "oeste", "surOeste"] as Direction[]).map((dir) => (
          <TouchableOpacity
            key={dir}
            style={[styles.tab, direction === dir && styles.activeTab]}
            onPress={() => {
              setDirection(dir);
              setLoading(true);
            }}
          >
            <Text
              style={[
                styles.tabText,
                direction === dir && styles.activeTabText,
              ]}
            >
              {directionNames[dir]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Visor de imagen */}
      <View style={styles.imageContainer}>
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#2196F3" />
          </View>
        )}
        <TouchableOpacity
          onPress={()=>{expand(currentImage)}}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 1,
          }}
        >
          <Expand size={24} color="#000" />
        </TouchableOpacity>
        <Image
          source={{ uri: currentImage }}
          style={[styles.fullImage, loading ? { opacity: 0 } : { opacity: 1 }]}
          contentFit="contain"
          onLoad={() => setLoading(false)}
        />
      </View>

      {/* Selector de atributo */}
      <View style={styles.attributeContainer}>
        {(
          [
            "categoria",
            "altura",
            "periodo",
            "direccion",
            "marea",
          ] as Attribute[]
        ).map((attr) => (
          <TouchableOpacity
            key={attr}
            style={[
              styles.attributeButton,
              attribute === attr && styles.activeAttributeButton,
            ]}
            onPress={() => {
              setAttribute(attr);
              setLoading(true);
            }}
          >
            <Text
              style={[
                styles.attributeText,
                attribute === attr && styles.activeAttributeText,
              ]}
            >
              {attributeNames[attr]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    imageViewerContainer: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    tabContainer: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: "center",
        backgroundColor: "#f9f9f9",
    },
    activeTab: {
        backgroundColor: "#fff",
        borderBottomWidth: 2,
        borderBottomColor: "#2196F3",
    },
    tabText: {
        fontSize: 14,
        color: "#666",
        fontWeight: "500",
    },
    activeTabText: {
        color: "#2196F3",
        fontWeight: "bold",
    },
    imageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        position: "relative",
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
    },
    fullImage: {
        width: "100%",
        height: "100%",
    },
    attributeContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 8,
        backgroundColor: "#f9f9f9",
        justifyContent: "center",
    },
    attributeButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 4,
        borderRadius: 20,
        backgroundColor: "#eee",
    },
    activeAttributeButton: {
        backgroundColor: "#2196F3",
    },
    attributeText: {
        fontSize: 13,
        color: "#666",
    },
    activeAttributeText: {
        color: "#fff",
        fontWeight: "500",
    },
});
export default ImageViewer;
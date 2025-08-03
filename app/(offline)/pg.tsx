"use client";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { pronosticos } from "@/data/data.json";
import { router } from "expo-router";
import { Pronostico } from "@/types/type";
import { ChevronRight } from "lucide-react-native";
// Datos de ejemplo (normalmente vendrían de una API)
const datosEjemplo = {
  pronosticos: pronosticos,
};

const PronosticoGeneralScreen = () => {
  const [pronosticos, setPronosticos] = useState<Pronostico[]>([]);
  const [cargando, setCargando] = useState(true);

  // Simular carga de datos
  useEffect(() => {
    // aquí harías una llamada a la API
    setTimeout(() => {
      setPronosticos(datosEjemplo.pronosticos);
      setCargando(false);
    }, 1000);
  }, []);

  const navegarADetalle = (pronostico: Pronostico) => {
    router.push({
      pathname: "/pd_modal",
      params: { pronostico: JSON.stringify(pronostico) },
    });
  };

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={styles.textoIndicador}>Cargando pronósticos...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pronósticos Marítimos</Text>
        <Text style={styles.headerSubtitle}>
          Selecciona un pronostico para ver detalles
        </Text>
      </View>

      <FlatList
        data={pronosticos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tarjeta}>
            <View style={styles.cardHeader}>
            <Text style={styles.tarjetaTitulo}>{item.nombre}</Text>
            <Text style={styles.tarjetaSubtitulo}>
              {item.sectores.length} sectores disponibles
            </Text>
            </View>

            <View style={styles.imagenContainer}>
              <Image
                source={{ uri: item.mapa_pronostico }}
                style={styles.tarjetaImagen}
                contentFit="cover"
              />
            </View>

            <View style={styles.sectoresPreview}>
              {item.sectores.slice(0, 3).map((sector) => (
                <View key={sector.id} style={styles.sectorItem}>
                  <Text style={styles.sectorNombre}>{sector.nombre}</Text>
                </View>
              ))}
              {item.sectores.length > 3 && (
                <Text style={styles.masTexto}>
                  +{item.sectores.length - 3} más
                </Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.cardFooter}
              onPress={() => navegarADetalle(item)}
              activeOpacity={0.7}
            >
              <Text style={styles.cardFooterText}>Ver pronóstico</Text>
              <ChevronRight size={16} color="#3b82f6" />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.lista}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  cardHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    backgroundColor: "#f8fafc",
  },
  cardFooterText: {
    fontSize: 15,
    color: "#3b82f6",
    fontWeight: "600",
  },
  centrado: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  textoIndicador: {
    marginTop: 16,
    fontSize: 16,
    color: "#555",
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
  lista: {
    padding: 16,
  },
  tarjeta: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  tarjetaTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  tarjetaSubtitulo: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  imagenContainer: {
    height: 250,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 12,
    backgroundColor: "#f0f0f0",
  },
  tarjetaImagen: {
    width: "100%",
    height: "100%",
  },
  sectoresPreview: {
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  sectorItem: {
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sectorNombre: {
    fontSize: 14,
    color: "#444",
  },
  masTexto: {
    fontSize: 14,
    color: "#0066cc",
    marginTop: 4,
    fontWeight: "500",
  },
  botonVer: {
    backgroundColor: "#0066cc",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  botonVerTexto: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PronosticoGeneralScreen;

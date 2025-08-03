import { useState } from "react";
import { Acc } from "@/types/type";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Star, MapPin } from "lucide-react-native";
const LocationCard = ({
  acc,
  onPress,
  onToggleFavorite,
  isFavorite = false,
}: {
  acc: Acc;
  onPress: () => void;
  onToggleFavorite?: (acc: Acc) => void;
  isFavorite?: boolean;
}) => {
  const [isFav, setIsFav] = useState(isFavorite);

  const handleToggleFavorite = () => {
    alert("Debe iniciar sesión para guardar favoritos");
    /** 
    const newState = !isFav;
    setIsFav(newState);
    if (onToggleFavorite) {
      onToggleFavorite(acc);
    }*/
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.titleContainer}>
            <View style={styles.titleWithIcon}>
              <MapPin size={24} color="#3b82f6" style={styles.locationIcon} />
              <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">
                {acc.nombre}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleToggleFavorite}
              style={styles.favoriteButton}
            >
              <Star
                size={32}
                color="#FFD700"
                fill={isFav ? "#FFD700" : "transparent"}
                strokeWidth={2}
              />
            </TouchableOpacity>
          </View>
          
          <View style={styles.coordinatesContainer}>
            <Text style={styles.coordinateLabel}>Latitud</Text>
            <Text style={styles.coordinateValue}>{acc.lat}°</Text>
          </View>
          
          <View style={styles.coordinatesContainer}>
            <Text style={styles.coordinateLabel}>Longitud</Text>
            <Text style={styles.coordinateValue}>{acc.lon}°</Text>
          </View>
          
          <View style={styles.dateContainer}>
            <Ionicons name="calendar-outline" size={18} color="#64748b" />
            <Text style={styles.dateText}>
              {new Date().toLocaleDateString("es-CL")}
            </Text>
          </View>
        </View>
        
        {/* Volviendo al estilo original del footer */}
        <TouchableOpacity 
          style={styles.cardFooter} 
          onPress={onPress}
          activeOpacity={0.7}
        >
          <Text style={styles.cardFooterText}>Ver detalles</Text>
          <Ionicons name="chevron-forward" size={16} color="#3b82f6" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: "#1e293b",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#ffffff",
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  titleWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  locationIcon: {
    marginRight: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    flex: 1,
  },
  favoriteButton: {
    padding: 8,
    marginRight: -8,
  },
  coordinatesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  coordinateLabel: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
  coordinateValue: {
    fontSize: 14,
    color: "#334155",
    fontWeight: "600",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  dateText: {
    fontSize: 13,
    color: "#64748b",
    marginLeft: 4,
  },
  // Estilo del footer similar al original
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
});

export default LocationCard;
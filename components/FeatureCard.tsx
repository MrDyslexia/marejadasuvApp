"use client"

import { LinearGradient } from "expo-linear-gradient"
import { Text, Button, Card, useTheme } from "react-native-paper"
import { Image } from "expo-image"
import { StyleSheet, View, Platform } from "react-native"
import * as LucideIcons from "lucide-react-native"

// Definir el tipo para las props
export type FeatureCardProps = {
  title: string
  description: string
  icon: keyof typeof LucideIcons
  gradient: [string, string, ...string[]]
  onPress: () => void
  image?: string
}

const FeatureCard = ({ title, description, icon, gradient, onPress }: FeatureCardProps) => {
  const theme = useTheme()

  // Obtener el componente de icono dinámicamente de lucide-react-native
  const IconComponent = LucideIcons[icon] as React.ComponentType<{ size: number; color: string; strokeWidth: number }>

  return (
    <Card style={styles.card}>
      <LinearGradient colors={gradient} style={styles.cardGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: "rgba(255, 255, 255, 0.2)" }]}>
              {IconComponent && <IconComponent size={24} color="white" strokeWidth={2} />}
            </View>
            <Text variant="titleLarge" style={styles.cardTitle}>
              {title}
            </Text>
          </View>
          <Text variant="bodyMedium" style={styles.cardDescription}>
            {description}
          </Text>

          <Button
            mode="contained"
            onPress={onPress}
            style={styles.cardButton}
            buttonColor="rgba(255, 255, 255, 0.2)"
            textColor="white"
          >
            Explorar
          </Button>
        </View>
      </LinearGradient>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  cardGradient: {
    borderRadius: 16,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardTitle: {
    color: "white",
    fontWeight: "bold",
    flex: 1,
  },
  imageContainer: {
    height: 150,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardDescription: {
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 16,
  },
  cardButton: {
    borderRadius: 8,
    marginTop: 8,
  },
})

export default FeatureCard

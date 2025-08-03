import { Image, StyleSheet, Platform } from 'react-native';
import {router} from 'expo-router';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StatusBar } from "expo-status-bar"
export default function IndexScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <StatusBar style="auto" />
        <ThemedView style={{ padding: 16 }}>
          <ThemedText style={{ fontSize: 18, marginBottom: 16 }}>
            Navega a las siguientes secciones:
          </ThemedText>
          <ThemedView style={styles.stepContainer}>
            <ThemedView style={styles.titleContainer}>
              <ThemedText>Modo Offline</ThemedText>
            </ThemedView>
            <ThemedText
              style={{ color: 'blue' }}
              onPress={() => {
                // Navegar a offline/index.tsx
                router.replace('/(offline)/Home');
              }}
            >
              Ir a Offline
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <ThemedView style={styles.titleContainer}>
              <ThemedText>Modo Online</ThemedText>
            </ThemedView>
            <ThemedText
              style={{ color: 'blue' }}
              onPress={() => {
                router.replace('/(online)/Home');
              }}
            >
              Ir a Online
            </ThemedText>
          </ThemedView>
        </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

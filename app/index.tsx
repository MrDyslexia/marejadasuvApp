import {router} from 'expo-router';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }
    // Lógica de login aquí
    Alert.alert("Éxito", `Bienvenido ${email}`);
    router.replace('/(offline)/Home'); // ejemplo
  };

  const handleGoogleLogin = () => {
    // Lógica de login con Google
    Alert.alert("Google", "Login con Google en desarrollo");
  };

  const handleSkip = () => {
    router.replace('/(offline)/Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Icono de la app */}
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Bienvenido 👋</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="ejemplo@email.com"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => Alert.alert("Recuperar contraseña")}
        >
          <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleLogin}
        >
          <Ionicons name="logo-google" size={20} color="#fff" />
          <Text style={styles.googleText}>Continuar con Google</Text>
        </TouchableOpacity>

        {/* Botón de omitir */}
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Ionicons name="cloud-offline-outline" size={20} color="#2196F3" />
          <Text style={styles.skipText}>Entrar en modo offline</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>¿No tienes cuenta?</Text>
        <TouchableOpacity onPress={() => Alert.alert("Registro")}>
          <Text style={styles.registerText}> Regístrate</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 20 },

  logoContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  logo: {
    width: 180,
    height: 180,
    borderRadius: 16,
  },

  header: { marginBottom: 20, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", color: "#111" },
  subtitle: { fontSize: 14, color: "#666", marginTop: 4 },

  form: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: { elevation: 3 },
    }),
  },
  label: { fontSize: 14, fontWeight: "500", color: "#333", marginBottom: 6 },
  input: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 14,
    color: "#111",
  },
  forgotPassword: { alignSelf: "flex-end", marginBottom: 16 },
  forgotText: { color: "#2196F3", fontSize: 13 },

  loginButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 14,
  },
  loginText: { color: "#fff", fontWeight: "600", fontSize: 15 },

  googleButton: {
    flexDirection: "row",
    backgroundColor: "#DB4437",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 14,
  },
  googleText: { color: "#fff", fontWeight: "600", fontSize: 15 },

  skipButton: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#2196F3",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  skipText: { color: "#2196F3", fontWeight: "600", fontSize: 15 },

  footer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: { color: "#666", fontSize: 14 },
  registerText: { color: "#2196F3", fontSize: 14, fontWeight: "600" },
});

export default LoginScreen;

import { router } from "expo-router";
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
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import Svg, { Defs, LinearGradient, Stop, Path, G } from "react-native-svg";

const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }
    Alert.alert("Éxito", `Bienvenido ${email}`);
    router.replace("/(offline)/Home");
  };

  const handleGoogleLogin = () => {
    Alert.alert("Google", "Login con Google en desarrollo");
  };

  const handleSkip = () => {
    router.replace("/(offline)/Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Fondo SVG geométrico tipo marejada */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <TideBackground />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* Icono de la app */}
          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/images/icon.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>Bienvenido!!</Text>
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

            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Ionicons
                name="cloud-offline-outline"
                size={20}
                color="#2196F3"
              />
              <Text style={styles.skipText}>Entrar en modo offline</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>¿No tienes cuenta?</Text>
            <TouchableOpacity onPress={() => Alert.alert("Registro")}>
              <Text style={styles.registerText}> Regístrate</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

/** SVG de fondo representando marejada geométrica */
function TideBackground() {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 390 844"
      preserveAspectRatio="xMidYMid slice"
    >
      <Defs>
        <LinearGradient id="ocean" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#2196F3" stopOpacity="1" />
          <Stop offset="100%" stopColor="#0D47A1" stopOpacity="1" />
        </LinearGradient>
        <LinearGradient id="foam" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#BBDEFB" stopOpacity="0.45" />
          <Stop offset="100%" stopColor="#64B5F6" stopOpacity="0.35" />
        </LinearGradient>
      </Defs>

      {/* Fondo base */}
      <Path d="M0 0 H390 V844 H0 Z" fill="url(#ocean)" />

      {/* Olas geométricas más bajas (subimos Y unos 100px) */}
      <G opacity="0.6">
        <Path
          d="M0 300 C 90 260, 150 360, 240 320 C 300 295, 340 300, 390 270 V0 H0 Z"
          fill="url(#foam)"
        />
        <Path
          d="M0 500 C 80 460, 150 560, 230 520 C 300 495, 340 500, 390 470 V270 C 340 300, 300 295, 230 320 C 150 360, 80 260, 0 300 Z"
          fill="#1565C0"
          opacity="0.4"
        />
        <Path
          d="M0 700 C 90 660, 150 760, 240 720 C 300 695, 340 700, 390 670 V470 C 340 500, 300 495, 230 520 C 150 560, 80 460, 0 500 Z"
          fill="#0D47A1"
          opacity="0.35"
        />
      </G>
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D47A1",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: width * 0.05, // 5% del ancho de pantalla
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: height * 0.02, // 2% de la altura
    marginBottom: height * 0.02,
  },
  logo: {
    width: width * 0.4, // 40% del ancho
    height: width * 0.4,
    maxWidth: 180,
    maxHeight: 180,
    borderRadius: 16,
  },
  header: {
    marginBottom: height * 0.02,
    alignItems: "center",
  },
  title: {
    fontSize: width * 0.06, // 6% del ancho
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: width * 0.035,
    color: "#eee",
    marginTop: 4,
  },
  form: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: width * 0.05,
    borderRadius: 16,
    marginTop: height * 0.03,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
      },
      android: { elevation: 3 },
    }),
  },
  label: {
    fontSize: width * 0.035,
    fontWeight: "500",
    color: "#333",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 10,
    marginBottom: height * 0.015,
    fontSize: width * 0.035,
    color: "#111",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: height * 0.015,
  },
  forgotText: {
    color: "#2196F3",
    fontSize: width * 0.03,
  },
  loginButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: height * 0.015,
  },
  loginText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: width * 0.04,
  },
  googleButton: {
    flexDirection: "row",
    backgroundColor: "#DB4437",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: height * 0.015,
  },
  googleText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: width * 0.04,
  },
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
  skipText: {
    color: "#2196F3",
    fontWeight: "600",
    fontSize: width * 0.04,
  },
  footer: {
    marginTop: height * 0.02,
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: {
    color: "#fff",
    fontSize: width * 0.035,
  },
  registerText: {
    color: "#BBDEFB",
    fontSize: width * 0.035,
    fontWeight: "600",
  },
});

export default LoginScreen;

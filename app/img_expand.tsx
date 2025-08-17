import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";

const Img_expand = () => {
  const { expandedImage } = useLocalSearchParams();
  if (!expandedImage) return null;

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  // Gesture: Zoom con pinza
  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = savedScale.value * event.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  // Gesture: Doble tap -> zoom x2 / reset
  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      if (scale.value > 1) {
        scale.value = withTiming(1);
        savedScale.value = 1;
      } else {
        scale.value = withTiming(2);
        savedScale.value = 2;
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const close_back = () => {
    router.back();
  };

  return (
    <View style={styles.modalContainer}>
      <SafeAreaView style={styles.modalContainer}>
        <GestureDetector gesture={Gesture.Exclusive(doubleTapGesture, pinchGesture)}>
          <Animated.Image
            style={[styles.expandedImage, animatedStyle]}
            source={{ uri: Array.isArray(expandedImage) ? expandedImage[0] ?? "" : expandedImage || "" }}
            resizeMode="contain"
          />
        </GestureDetector>

        <TouchableOpacity
          style={styles.closeExpandedButton}
          onPress={close_back}
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
    backgroundColor: "black",
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

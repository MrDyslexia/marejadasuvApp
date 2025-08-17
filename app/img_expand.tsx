import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Img_expand = () => {
  const { expandedImage } = useLocalSearchParams<{ expandedImage: string }>();

  if (!expandedImage) return null;

  const images = [{ url: expandedImage }];

  return (
    <View style={{ flex: 1 }}>
      <ImageViewer
        imageUrls={images}
        enableSwipeDown
        onSwipeDown={() => router.back()}
        renderIndicator={() => <></>}
      />
      <TouchableOpacity
        style={styles.closeExpandedButton}
        onPress={() => router.back()}
      >
        <Ionicons name="close" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  closeExpandedButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 5,
    zIndex: 2,
  },
});

export default Img_expand;
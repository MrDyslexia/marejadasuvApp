"use client";

import { useRef, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
    StyleSheet,
    TouchableOpacity,
    Modal,
    Dimensions,
    Platform,
    StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const InteractiveMap_Modal = ({
    visible,
    onClose,
}: {
    visible: boolean;
    onClose: () => void;
}) => {
    const mapRef = useRef<MapView>(null);

    // Región inicial fija (puedes cambiarla si quieres)
    const initialRegion = {
        latitude: -33.4489,
        longitude: -70.6693,
        latitudeDelta: 10,
        longitudeDelta: 10,
    };

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={onClose}
            statusBarTranslucent={true}
        >
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={initialRegion}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                showsMyLocationButton={true}
                zoomControlEnabled={true}
                zoomEnabled={true}
                scrollEnabled={true}
            />
        </Modal>
    );
};

const styles = StyleSheet.create({
    closeButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: "#2196F3",
        position: "absolute",
        top: 16,
        right: 16,
        zIndex: 10,
    },
    map: {
        width: "100%",
        height: "100%",
    },
});

export default InteractiveMap_Modal;

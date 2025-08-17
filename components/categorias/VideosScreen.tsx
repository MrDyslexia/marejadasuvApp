import { ScrollView, View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native"
import { VideoView, useVideoPlayer } from "expo-video"
import data from "@/data/data.json"

const { width } = Dimensions.get("window")

type VideosScreenProps = {
  onBack: () => void
}

export default function VideosScreen({ onBack }: VideosScreenProps) {
  const { videos } = data.categorias

  const videoPlayer1 = useVideoPlayer(videos[0]?.url || "", (p) => {
    p.loop = false
  })
  const videoPlayer2 = useVideoPlayer(videos[1]?.url || "", (p) => {
    p.loop = false
  })
  const videoPlayer3 = useVideoPlayer(videos[2]?.url || "", (p) => {
    p.loop = false
  })
  const videoPlayer4 = useVideoPlayer(videos[3]?.url || "", (p) => {
    p.loop = false
  })
  const videoPlayer5 = useVideoPlayer(videos[4]?.url || "", (p) => {
    p.loop = false
  })

  const players = [videoPlayer1, videoPlayer2, videoPlayer3, videoPlayer4, videoPlayer5]

  const isVideoFile = (url: string) => {
    const lower = url.toLowerCase()
    return lower.endsWith(".mp4") || lower.endsWith(".mov") || lower.includes("youtube")
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Reproductor de Videos</Text>
        <Text style={styles.subheader}>Aprende a tu ritmo con nuestros videos educativos</Text>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {videos.map((video, index) => {
          const player = players[index]

          return (
            <View key={video.id} style={[styles.videoCard, { marginTop: index === 0 ? 0 : 20 }]}>
              <View style={styles.cardHeader}>
                <Text style={styles.videoTitle}>{video.nombre}</Text>
                <View style={styles.videoBadge}>
                  <Text style={styles.videoBadgeText}>{isVideoFile(video.url) ? "VIDEO" : "GIF"}</Text>
                </View>
              </View>

              <View style={styles.mediaContainer}>
                {isVideoFile(video.url) && player ? (
                  <VideoView style={styles.videoPlayer} player={player} allowsFullscreen allowsPictureInPicture />
                ) : (
                  <Image source={{ uri: video.url }} style={styles.videoGif} accessibilityLabel={video.descripcion} />
                )}

                {isVideoFile(video.url) && (
                  <TouchableOpacity style={styles.playButton} onPress={() => player?.play()}>
                    <Text style={styles.playButtonText}>▶</Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.videoDescription}>{video.descripcion}</Text>
                {video.limitante && (
                  <View style={styles.limitanteContainer}>
                    <Text style={styles.limitanteLabel}>Limitante:</Text>
                    <Text style={styles.limitanteText}>{video.limitante}</Text>
                  </View>
                )}
              </View>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },
  headerContainer: {
    backgroundColor: "#ffffff",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  backButton: {
    alignSelf: "flex-start",
    padding: 8,
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: "#059669",
    fontWeight: "600",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 8,
  },
  subheader: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  videoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingBottom: 16,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    flex: 1,
  },
  videoBadge: {
    backgroundColor: "#ecfdf5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  videoBadgeText: {
    fontSize: 10,
    color: "#059669",
    fontWeight: "600",
  },
  mediaContainer: {
    position: "relative",
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  videoPlayer: {
    width: "100%",
    height: 200,
    backgroundColor: "#000",
  },
  videoGif: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
    width: 50,
    height: 50,
    backgroundColor: "rgba(5, 150, 105, 0.9)",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  playButtonText: {
    color: "#ffffff",
    fontSize: 18,
    marginLeft: 2,
  },
  cardContent: {
    padding: 20,
  },
  videoDescription: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
    marginBottom: 12,
  },
  limitanteContainer: {
    backgroundColor: "#fef3c7",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#f59e0b",
  },
  limitanteLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#92400e",
    marginBottom: 4,
  },
  limitanteText: {
    fontSize: 12,
    color: "#92400e",
    lineHeight: 16,
  },
})

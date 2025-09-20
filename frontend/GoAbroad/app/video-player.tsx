import React, { useState, useRef } from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Image,
  Dimensions,
  StatusBar
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const { width, height } = Dimensions.get('window');

export default function VideoPlayerScreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const videoData = {
    title: "Set up Figma account",
    duration: "08:45",
    currentTime: "03:20",
    thumbnail: "https://picsum.photos/400/300?random=2"
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  if (isFullscreen) {
    return (
      <View style={styles.fullscreenContainer}>
        <StatusBar hidden />
        
        {/* Video Area */}
        <View style={styles.fullscreenVideo}>
          <Image source={{ uri: videoData.thumbnail }} style={styles.fullscreenImage} />
          
          {/* Video Controls Overlay */}
          {showControls && (
            <View style={styles.fullscreenControls}>
              {/* Top Controls */}
              <View style={styles.topControls}>
                <TouchableOpacity onPress={toggleFullscreen}>
                  <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.fullscreenTitle}>{videoData.title}</Text>
                <TouchableOpacity>
                  <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              {/* Center Play Button */}
              <View style={styles.centerControls}>
                <TouchableOpacity 
                  style={styles.playButton}
                  onPress={togglePlayPause}
                >
                  <Ionicons 
                    name={isPlaying ? "pause" : "play"} 
                    size={48} 
                    color="#FFFFFF" 
                  />
                </TouchableOpacity>
              </View>

              {/* Bottom Controls */}
              <View style={styles.bottomControls}>
                <Text style={styles.timeText}>{videoData.currentTime}</Text>
                <View style={styles.progressBar}>
                  <View style={styles.progressFill} />
                </View>
                <Text style={styles.timeText}>{videoData.duration}</Text>
              </View>
            </View>
          )}

          {/* Tap to show/hide controls */}
          <TouchableOpacity 
            style={styles.tapArea}
            onPress={toggleControls}
            activeOpacity={1}
          />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{videoData.title}</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Video Player */}
      <View style={styles.videoContainer}>
        <Image source={{ uri: videoData.thumbnail }} style={styles.videoImage} />
        
        {/* Video Controls Overlay */}
        {showControls && (
          <View style={styles.videoControls}>
            {/* Center Play Button */}
            <View style={styles.centerPlayButton}>
              <TouchableOpacity 
                style={styles.playButton}
                onPress={togglePlayPause}
              >
                <Ionicons 
                  name={isPlaying ? "pause" : "play"} 
                  size={48} 
                  color="#FFFFFF" 
                />
              </TouchableOpacity>
            </View>

            {/* Bottom Controls */}
            <View style={styles.videoBottomControls}>
              <Text style={styles.timeText}>{videoData.currentTime}</Text>
              <View style={styles.progressBar}>
                <View style={styles.progressFill} />
              </View>
              <Text style={styles.timeText}>{videoData.duration}</Text>
              <TouchableOpacity onPress={toggleFullscreen}>
                <Ionicons name="expand" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Tap to show/hide controls */}
        <TouchableOpacity 
          style={styles.tapArea}
          onPress={toggleControls}
          activeOpacity={1}
        />
      </View>

      {/* Video Content Area */}
      <View style={styles.contentArea}>
        <View style={styles.contentPlaceholder}>
          <Text style={styles.contentText}>Video Content Area</Text>
          <Text style={styles.contentSubtext}>
            Additional video information and controls will appear here
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D5543",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  videoContainer: {
    height: height * 0.4,
    position: "relative",
  },
  videoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  videoControls: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "space-between",
  },
  centerPlayButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  videoBottomControls: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 2,
  },
  progressFill: {
    width: "40%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
  },
  timeText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  tapArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  contentArea: {
    flex: 1,
    backgroundColor: "#0D5543",
    justifyContent: "center",
    alignItems: "center",
  },
  contentPlaceholder: {
    alignItems: "center",
    paddingHorizontal: 40,
  },
  contentText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  contentSubtext: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    lineHeight: 20,
  },
  // Fullscreen styles
  fullscreenContainer: {
    flex: 1,
    backgroundColor: "#000000",
  },
  fullscreenVideo: {
    flex: 1,
    position: "relative",
  },
  fullscreenImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  fullscreenControls: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "space-between",
  },
  topControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  fullscreenTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  centerControls: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomControls: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
    gap: 12,
  },
});

import Svg, { Defs, LinearGradient, Stop, Path, G } from "react-native-svg";
function TideBackground() {
  //#8E24AA", "#6A1B9A
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 390 844"
      preserveAspectRatio="xMidYMid slice"
    >
      <Defs>
        <LinearGradient id="ocean" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#ffffffff" stopOpacity="1" />
          <Stop offset="100%" stopColor="#6A1B9A" stopOpacity="1" />
        </LinearGradient>
        <LinearGradient id="foam" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#ffffffff" stopOpacity="0.45" />
          <Stop offset="100%" stopColor="#a2d1f7ff" stopOpacity="0.35" />
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
export default TideBackground;
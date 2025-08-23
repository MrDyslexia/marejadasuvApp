import { StyleSheet, View } from "react-native"
import PronosticoOseanico from "@/components/Po/PoDataView"
import type { Region } from "@/types/type"
import {pc} from "@/data/data.json"
export default function PronosticoOseanicoScreen() {
  const regionesEjemplo: Region[] = pc
  return (
    <View style={styles.container}>
      <PronosticoOseanico regions={regionesEjemplo} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
})

import { StyleSheet, View } from "react-native"
import PronosticoOceanico from "@/components/PoDataView"
import type { Region } from "@/types/type"
import {po} from "@/data/data.json"
export default function PronosticoOseanicoScreen() {
  const regionesEjemplo: Region[] = po
  return (
    <View style={styles.container}>
      <PronosticoOceanico regions={regionesEjemplo} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
})

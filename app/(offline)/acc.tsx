import { StyleSheet, View } from "react-native"
import AccDataView from "@/components/Acc/AccDataView"
import {acc} from "@/data/data.json"
export default function Acc() {
  return (
    <View style={styles.container}>
      <AccDataView accData={acc} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
})

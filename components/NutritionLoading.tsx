import { ActivityIndicator, Modal, Text, View } from "react-native";

interface NutritionLoadingProps {
  visible: boolean;
}

export default function NutritionLoading({ visible }: NutritionLoadingProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.4)"
      }}>
        <View style={{
          padding: 20,
          borderRadius: 12,
          backgroundColor: "#fff",
          width: 200,
          alignItems: "center"
        }}>
          <ActivityIndicator size="small" color="#4CAF50" />
          <Text style={{ marginTop: 10, fontSize: 16 }}>
            Analyzing nutrition...
          </Text>
          <Text
            style={{
              marginTop: 8,
              fontSize: 12,
              color: "#555",
              textAlign: "center",
              lineHeight: 18, 
              width: 180, 
            }}
          >
            This may take a few seconds.{"\n"}Thanks for your patience!
          </Text>
        </View>
      </View>
    </Modal>
  );
}

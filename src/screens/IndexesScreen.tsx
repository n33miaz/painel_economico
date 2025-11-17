import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function IndexesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Índices</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
  },
});

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../theme/colors";

interface HighlightCardProps {
  title: string;
  value: number;
  variation: number;
  iconName: keyof typeof Ionicons.glyphMap;
}

export default function HighlightCard({
  title,
  value,
  variation,
  iconName,
}: HighlightCardProps) {
  const isPositive = variation >= 0;
  const variationColor = isPositive ? colors.success : colors.danger;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name={iconName} size={24} color={colors.textSecondary} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.value}>R$ {value.toFixed(2)}</Text>
      <View style={styles.variationContainer}>
        <Ionicons
          name={isPositive ? "caret-up" : "caret-down"}
          size={16}
          color={variationColor}
        />
        <Text style={[styles.variationText, { color: variationColor }]}>
          {variation.toFixed(2)}%
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    flex: 1,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: "Roboto_400Regular",
    color: colors.textSecondary,
    marginLeft: 8,
  },
  value: {
    fontSize: 28,
    fontFamily: "Roboto_700Bold",
    color: colors.textPrimary,
  },
  variationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  variationText: {
    fontSize: 16,
    fontFamily: "Roboto_700Bold",
    marginLeft: 4,
  },
});

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";

import { colors } from "../theme/colors";
import NewsCard from "../components/NewsCard";
import useNewsData from "../hooks/useNewsData";

export default function NewsScreen() {
  const { articles, loading, error } = useNewsData({ pageSize: 20 });

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando notícias...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => <NewsCard article={item} />}
        ListHeaderComponent={
          <Text style={styles.headerTitle}>Principais Notícias</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 10,
    color: colors.textSecondary,
  },
  errorText: {
    color: colors.danger,
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: "Roboto_700Bold",
    color: colors.textPrimary,
    marginHorizontal: 16,
    marginVertical: 20,
  },
});

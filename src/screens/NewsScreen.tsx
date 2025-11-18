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
import newsApi, { NewsArticle } from "../services/newsApi";
import NewsCard from "../components/NewsCard";

export default function NewsScreen() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await newsApi.get("/top-headlines", {
          params: {
            country: "br",
            category: "business",
            pageSize: 20,
          },
        });
        setArticles(response.data.articles);
      } catch (e: any) {
        setError("Não foi possível carregar as notícias.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

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

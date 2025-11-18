import { useState, useEffect } from "react";

import newsApi, { NewsArticle } from "../services/newsApi";

interface UseNewsDataParams {
  country?: string;
  category?: string;
  pageSize?: number;
}

interface UseNewsDataResult {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
}

export default function useNewsData({
  country = "br",
  category = "business",
  pageSize = 10,
}: UseNewsDataParams): UseNewsDataResult {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await newsApi.get("/top-headlines", {
          params: { country, category, pageSize },
        });
        setArticles(response.data.articles);
      } catch (e: any) {
        setError("Não foi possível carregar as notícias.");
        console.error("Erro ao buscar notícias:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [country, category, pageSize]);

  return { articles, loading, error };
}

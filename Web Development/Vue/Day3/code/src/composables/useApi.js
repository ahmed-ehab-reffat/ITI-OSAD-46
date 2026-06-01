import { ref } from "vue";

export const useApi = (baseUrl, resourcePath, options) => {
  const accessToken = localStorage.getItem("access_token") || "";

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const url = `${baseUrl}/${resourcePath}`;

  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);

  const fetchData = async () => {
    loading.value = true;
    try {
      const response = await fetch(url, { ...options, headers });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      data.value = await response.json();
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return { data, error, loading, fetchData };
};

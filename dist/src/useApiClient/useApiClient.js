import { ref } from "vue";
import axios from "axios";
const globalConfig = ref({});
const cache = new Map();
export function setApiConfig(config) {
    globalConfig.value = config;
}
export function clearCache() {
    cache.clear();
}
export function useApiClient() {
    const API = axios.create({
        baseURL: globalConfig.value.baseURL || "",
        timeout: 5000,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...globalConfig.value.headers,
        },
    });
    const data = ref(null);
    const error = ref(null);
    const status = ref(null);
    const isLoading = ref(false);
    const request = async (config, useCache = true) => {
        isLoading.value = true;
        error.value = null;
        const cacheKey = JSON.stringify({ url: config.url, params: config.params });
        const cacheEntry = cache.get(cacheKey);
        const cacheTime = globalConfig.value.cacheTime ?? 60000;
        if (useCache && cacheEntry && Date.now() - cacheEntry.timestamp < cacheTime) {
            data.value = cacheEntry.data;
            isLoading.value = false;
            return;
        }
        try {
            const response = await API.request(config);
            data.value = response.data;
            status.value = response.status;
            if (useCache) {
                cache.set(cacheKey, { data: response.data, timestamp: Date.now() });
            }
        }
        catch (err) {
            const axiosError = err;
            error.value = axiosError.response?.data ?? "Unknown error";
            status.value = axiosError.response?.status ?? null;
        }
        finally {
            isLoading.value = false;
        }
    };
    return {
        data,
        error,
        status,
        isLoading,
        request,
        clearCache,
    };
}

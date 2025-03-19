import { ref } from "vue";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

interface ApiConfig {
    baseURL?: string;
    headers?: Record<string, string>;
    cacheTime?: number;
}

const globalConfig = ref<ApiConfig>({});
const cache = new Map<string, { data: any; timestamp: number }>();

export function setApiConfig(config: ApiConfig) {
    globalConfig.value = config;
}

export function clearCache() {
    cache.clear();
}

export function useApiClient<T = any>() {
    const API = axios.create({
        baseURL: globalConfig.value.baseURL || "",
        timeout: 5000,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...globalConfig.value.headers,
        },
    });

    const data = ref<T | null>(null);
    const error = ref<string | null>(null);
    const status = ref<number | null>(null);
    const isLoading = ref<boolean>(false);

    const request = async (config: AxiosRequestConfig, useCache = true) => {
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
            const response: AxiosResponse<T> = await API.request<T>(config);
            data.value = response.data;
            status.value = response.status;

            if (useCache) {
                cache.set(cacheKey, { data: response.data, timestamp: Date.now() });
            }
        } catch (err) {
            const axiosError = err as AxiosError;
            error.value = (axiosError.response?.data as string) ?? "Unknown error";
            status.value = axiosError.response?.status ?? null;
        } finally {
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

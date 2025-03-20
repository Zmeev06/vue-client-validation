import { ref } from "vue";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

interface ApiConfig {
    baseURL?: string;
    headers?: Record<string, string>;
    cacheTime?: number;
}

type RequestSettings = {
    useCache?: boolean;
    cancelPrevious?: boolean;
};

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

    let controller: AbortController | null = null;

    const request = async (
        config: AxiosRequestConfig,
        settings: RequestSettings = { useCache: true, cancelPrevious: false }
    ) => {
        isLoading.value = true;
        error.value = null;

        if (settings.cancelPrevious && controller) {
            controller.abort();
        }

        controller = new AbortController();
        config.signal = controller.signal;

        const cacheKey = JSON.stringify({ url: config.url, params: config.params });
        const cacheEntry = cache.get(cacheKey);
        const cacheTime = globalConfig.value.cacheTime ?? 60000;

        if (settings.useCache && cacheEntry && Date.now() - cacheEntry.timestamp < cacheTime) {
            data.value = cacheEntry.data;
            isLoading.value = false;
            return;
        }

        try {
            const response: AxiosResponse<T> = await API.request<T>(config);
            data.value = response.data;
            status.value = response.status;

            if (settings.useCache) {
                cache.set(cacheKey, { data: response.data, timestamp: Date.now() });
            }
        } catch (err) {
            if (axios.isCancel(err)) {
                console.log("Запрос отменён:", config.url);
                return;
            }

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

import { ref } from "vue";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

interface ApiConfig {
    baseURL?: string;
    headers?: Record<string, string>;
}

const globalConfig = ref<ApiConfig>({}); // Глобальный конфиг

export function setApiConfig(config: ApiConfig) {
    globalConfig.value = config;
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

    const request = async (config: AxiosRequestConfig) => {
        isLoading.value = true;
        error.value = null;

        try {
            const response: AxiosResponse<T> = await API.request<T>(config);
            data.value = response.data;
            status.value = response.status;
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
    };
}

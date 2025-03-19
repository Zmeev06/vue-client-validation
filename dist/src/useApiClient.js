import { ref } from "vue";
import axios from "axios";
const globalConfig = ref({}); // Глобальный конфиг
export function setApiConfig(config) {
    globalConfig.value = config;
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
    const request = async (config) => {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await API.request(config);
            data.value = response.data;
            status.value = response.status;
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
    };
}

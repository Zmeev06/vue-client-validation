import { AxiosRequestConfig } from "axios";
interface ApiConfig {
    baseURL?: string;
    headers?: Record<string, string>;
    cacheTime?: number;
}
export declare function setApiConfig(config: ApiConfig): void;
export declare function clearCache(): void;
export declare function useApiClient<T = any>(): {
    data: [T | null] extends [import("vue").Ref<any, any>] ? import("@vue/shared").IfAny<import("vue").Ref<any, any> & T, import("vue").Ref<import("vue").Ref<any, any> & T, import("vue").Ref<any, any> & T>, import("vue").Ref<any, any> & T> : import("vue").Ref<import("vue").UnwrapRef<T> | null, T | import("vue").UnwrapRef<T> | null>;
    error: import("vue").Ref<string | null, string | null>;
    status: import("vue").Ref<number | null, number | null>;
    isLoading: import("vue").Ref<boolean, boolean>;
    request: (config: AxiosRequestConfig, useCache?: boolean) => Promise<void>;
    clearCache: typeof clearCache;
};
export {};

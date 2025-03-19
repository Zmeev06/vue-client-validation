import { setApiConfig, useApiClient } from "./useApiClient";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
describe("useApiClient", () => {
    let mock;
    beforeEach(() => {
        mock = new MockAdapter(axios);
        setApiConfig({ baseURL: "https://api.example.com" }); // Устанавливаем тестовый baseURL
    });
    afterEach(() => {
        mock.reset();
    });
    it("должен выполнять GET-запрос и получать данные", async () => {
        mock.onGet("/test").reply(200, { message: "success" });
        const { data, request, isLoading, error, status } = useApiClient();
        await request({ url: "/test", method: "GET" });
        expect(data.value).toEqual({ message: "success" });
        expect(status.value).toBe(200);
        expect(isLoading.value).toBe(false);
        expect(error.value).toBeNull();
    });
    it("должен обрабатывать ошибки запроса", async () => {
        mock.onGet("/error").reply(500, { error: "Server error" });
        const { data, request, isLoading, error, status } = useApiClient();
        await request({ url: "/error", method: "GET" });
        expect(data.value).toBeNull();
        expect(status.value).toBe(500);
        expect(isLoading.value).toBe(false);
        expect(error.value).toBe("Server error");
    });
    it("должен отправлять POST-запрос с данными", async () => {
        const payload = { name: "John Doe" };
        mock.onPost("/users", payload).reply(201, { id: 1, ...payload });
        const { data, request, status } = useApiClient();
        await request({ url: "/users", method: "POST", data: payload });
        expect(data.value).toEqual({ id: 1, name: "John Doe" });
        expect(status.value).toBe(201);
    });
});

# Vue API Client & Form Validation

🚀 **Vue API Client & Form Validation** – a universal library for Vue 3, featuring a convenient API client and form validation with built-in and custom rules.

## 📦 Installation

Install the package using npm:
```sh
npm install vue-api-client-form-validation
```

Or via yarn:
```sh
yarn add vue-api-client-form-validation
```

---

# 📌 Configuration

Before using the API client, you need to create a configuration file. This configuration defines the base API URL and global headers.

### 📌 Create `apiConfig.ts`

In the root of your project, create a file named **`apiConfig.ts`** and set up the configuration:

```ts
import { setApiConfig } from "vue-api-client-form-validation";

setApiConfig({
    baseURL: "https://api.example.com", // Replace with your API base URL
    headers: {
        Authorization: "Bearer your-token", // Set default headers if needed
    },
    cacheTime: 60000, // Cache time in milliseconds (default: 60s)
});
```

Then, import this file in your `main.ts` (or `main.js`) before using `useApiClient`:

```ts
import "./apiConfig"; // Ensure the config is loaded globally
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.mount("#app");
```

By doing this, all API requests will automatically use the configured `baseURL` and headers.

---

# 📌 `useApiClient` – API Client

`useApiClient` is a composable that allows you to easily make HTTP requests with built-in caching.

## ✅ Features:
- `GET`, `POST`, `PUT`, `DELETE` requests
- Reactive loading and error state
- Automatically uses the configured `baseURL` and headers
- Built-in caching with configurable expiration time

### 📌 Usage

```ts
import { useApiClient } from "vue-api-client-form-validation";
import { ref } from "vue";

const { data, status, isLoading, error, request, clearCache } = useApiClient();
const formData = ref({ name: "", email: "" });

const onSubmit = () => {
    request({
        url: "/users",
        method: "POST",
        data: formData.value
    });
};
```

### 🌜 Parameters
| Parameter        | Type                           | Description                        |
|------------------|--------------------------------|------------------------------------|
| `config`        | `AxiosRequestConfig`           | Axios request configuration, including `url`, `method`, `data`, `headers`, `params`, etc. |
| `settings`      | `RequestSettings`              | Additional request settings. |
| `settings.useCache`       | `boolean` (default: `true`)    | Determines whether to use caching for the request. |
| `settings.cancelPrevious` | `boolean` (default: `false`)   | Cancels the previous request before executing a new one, preventing race conditions and reducing server load. Useful for autocomplete and dynamic updates. |

### 🛠️ Cache Management
`useApiClient` includes a caching mechanism that stores responses to avoid redundant requests. The cache expiration time can be configured via `cacheTime` in `setApiConfig`.

#### Clear Cache Manually
```ts
const { clearCache } = useApiClient();
clearCache(); // Clears all cached API responses
```

#### Disable Cache for a Specific Request
```ts
request({ url: "/users", method: "GET" }, false);
```

---

# 📌 `useFormValidation` – Form Validation

`useFormValidation` is a universal composable for validating form data.

## ✅ Features:
- Reactive form state
- Built-in validation rules (`email`, `phone`)
- Custom validation rules

### 📌 Usage

```vue
<template>
  <input
      v-model="form.name.value"
      type="text"
  >
  <input
      v-model="form.phone.value"
      type="text"
  >
</template>
<script setup>
  import { useFormValidation } from "vue-api-client-form-validation";
  import { ref } from "vue";

  const formData = ref({ name: "", email: "", phone: "" });

  const {
    form, errors, isValid, validateForm, resetForm
  } = useFormValidation(
      {
        name: { value: '' },
        phone: { value: '' },
      },
      {
        name: { required: true },
        phone: { required: true, type: 'phone' },
      }
  )

  const onSubmit = () => {
    if (validateForm()) {
      console.log("Form submitted", form.value);
      resetForm()
    }
  };
</script>
```

---

# 🔄 Changelog

## v1.1.0
- Added support for `cancelPrevious` to prevent race conditions.
- Improved TypeScript typings for `useApiClient`.
- Enhanced error handling for better debugging.
- Updated caching mechanism for more efficient API requests.

## v1.0.0
- Initial release with `useApiClient` and `useFormValidation`.
- Supports caching, reactive states, and built-in validation rules.

---

# 🔗 GitHub Repository
For more details, visit the official GitHub repository:
👉 [GitHub Repository](https://github.com/Zmeev06/vue-client-validation)

---

# 🎯 Conclusion

This package makes working with APIs and validating forms in Vue 3 easy! 🚀

- Easily configure API requests with automatic `baseURL` and headers
- Use built-in caching for optimized performance
- Implement form validation with built-in and custom rules

Start using `vue-api-client-form-validation` today! 🎯


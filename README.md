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

### 📜 Parameters
| Parameter  | Type                 | Description |
|------------|---------------------|-------------|
| `url`      | `string`             | API endpoint (relative to `baseURL`) |
| `method`   | `string` (`GET`, `POST`, etc.) | HTTP method |
| `data`     | `object`             | Request data (for `POST`, `PUT`) |
| `headers`  | `object`             | Additional headers |
| `params`   | `object`             | URL parameters |
| `useCache` | `boolean` (default: `true`) | Whether to use cache |

### 🔄 Reactive Data
| Variable   | Type     | Description |
|------------|--------|-------------|
| `data`     | `Ref<any>` | Server response |
| `status`   | `Ref<number>` | HTTP status code |
| `isLoading` | `Ref<boolean>` | Loading indicator |
| `error`    | `Ref<string>` | Request error |

### 🔧 Cache Management
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

```ts
import { useFormValidation } from "vue-api-client-form-validation";
import { ref } from "vue";

const formData = ref({ name: "", email: "", phone: "" });

const { form, errors, isValid, validateForm, validateField } = useFormValidation(
  formData,
  {
    name: { required: true },
    email: { required: true, type: "email" },
    phone: { required: true, type: "phone" }
  }
);

const onSubmit = () => {
  if (validateForm()) {
    console.log("Form submitted", form.value);
  }
};
```

### 📜 Parameters
| Parameter  | Type   | Description |
|------------|------|-------------|
| `form`    | `Ref<object>` | Reactive form data |
| `errors`  | `Ref<object>` | Validation errors |
| `isValid` | `Computed<boolean>` | Form validity |

### 🔄 Methods
| Method         | Description |
|--------------|-------------|
| `validateField(field: string)` | Validate a single field |
| `validateForm()` | Validate the entire form |

### 🔧 Custom Rules
```ts
const { form, errors, validateForm } = useFormValidation(
  { username: "" },
  {
    username: {
      required: true,
      customRules: [
        (value) => (value.length >= 3 ? true : "Minimum 3 characters")
      ]
    }
  }
);
```

### 📜 Supported Types
| Type    | Description |
|---------|-------------|
| `email` | Validates an email format |
| `phone` | Validates a phone number format |

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


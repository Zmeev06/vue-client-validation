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

`useApiClient` is a composable that allows you to easily make HTTP requests.

## ✅ Features:
- `GET`, `POST`, `PUT`, `DELETE` requests
- Reactive loading and error state
- Automatically uses the configured `baseURL` and headers

### 📌 Usage

```ts
import { useApiClient } from "vue-api-client-form-validation";
import { onMounted } from "vue";

const { data, status, isLoading, error, request } = useApiClient();

onMounted(() => {
  request({
    url: "/users",
    method: "GET",
  });
});
```

### 📜 Parameters
| Parameter  | Type                 | Description |
|------------|---------------------|-------------|
| `url`      | `string`             | API endpoint (relative to `baseURL`) |
| `method`   | `string` (`GET`, `POST`, etc.) | HTTP method |
| `data`     | `object`             | Request data (for `POST`, `PUT`) |
| `headers`  | `object`             | Additional headers |
| `params`   | `object`             | URL parameters |

### 🔄 Reactive Data
| Variable   | Type     | Description |
|------------|--------|-------------|
| `data`     | `Ref<any>` | Server response |
| `status`   | `Ref<number>` | HTTP status code |
| `isLoading` | `Ref<boolean>` | Loading indicator |
| `error`    | `Ref<string>` | Request error |

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

const { form, errors, isValid, validateForm, validateField } = useFormValidation(
  { name: "", email: "" },
  {
    name: { required: true },
    email: { required: true },
  }
);
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

---

# 🎯 Conclusion

This package makes working with APIs and validating forms in Vue 3 easy! 🚀

Now, you can set up your API configuration once and use `useApiClient` without worrying about manually specifying `baseURL` and headers every time. 🎯
import { reactive, computed, ref } from "vue";
const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const phoneRegex = /^\+?[0-9]{10,15}$/;
export function useFormValidation(initialValues, rules) {
    const form = reactive({});
    const errors = reactive({});
    for (const key in initialValues) {
        form[key] = ref(initialValues[key]);
    }
    const validateField = (field) => {
        const value = form[field].value;
        const fieldRules = rules[field];
        if (!fieldRules)
            return;
        if (fieldRules.required && (!value || (Array.isArray(value) && value.length === 0))) {
            errors[field] = "Это поле обязательно";
            return;
        }
        if (fieldRules.type === "email" && !emailRegex.test(value)) {
            errors[field] = "Введите корректный email";
            return;
        }
        if (fieldRules.type === "phone" && !phoneRegex.test(value)) {
            errors[field] = "Введите корректный номер телефона";
            return;
        }
        if (fieldRules.customRules) {
            for (const rule of fieldRules.customRules) {
                const errorMessage = rule(value);
                if (errorMessage !== true) {
                    errors[field] = errorMessage;
                    return;
                }
            }
        }
        errors[field] = null;
    };
    const validateForm = () => {
        for (const field in rules) {
            validateField(field);
        }
    };
    const isValid = computed(() => Object.values(errors).every((error) => !error));
    return {
        form,
        errors,
        isValid,
        validateField,
        validateForm,
    };
}

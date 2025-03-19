import { reactive, computed, ref } from "vue";

type Validator = (value: any) => string | true;

interface ValidationRules {
    required?: boolean;
    customRules?: Validator[];
    type?: "email" | "phone";
}

const emailRegex = /^(?=.{1,254}$)(?:(?:[A-Za-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+\/=?^_`{|}~-]+)*)|(?:"(?:\\.|[^"\\])*"))@(?:(?:[A-Za-z0-9-]{1,63}\.)*[A-Za-z0-9-]{1,63}\.[A-Za-z]{2,}|(?:\[(?:\d{1,3}\.){3}\d{1,3}\])|(?:\[IPv6:[a-fA-F0-9:]+\]))$/;
const phoneRegex = /^\+?[0-9]{10,15}$/;

export function useFormValidation(initialValues: Record<string, any>, rules: Record<string, ValidationRules>) {
    const form: Record<string, any> = reactive({});
    const errors: Record<string, string | null> = reactive({});

    for (const key in initialValues) {
        form[key] = ref(initialValues[key]);
    }

    const validateField = (field: string) => {
        const value = form[field].value;
        const fieldRules = rules[field];

        if (!fieldRules) return;

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

    const resetForm = () => {
        for (const key in initialValues) {
            form[key].value = initialValues[key];
            errors[key] = null;
        }
    };

    const isValid = computed(() => Object.values(errors).every((error) => !error));

    return {
        form,
        errors,
        isValid,
        validateField,
        validateForm,
        resetForm,
    };
}

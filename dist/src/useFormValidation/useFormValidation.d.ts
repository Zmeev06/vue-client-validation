type Validator = (value: any) => string | true;
interface ValidationRules {
    required?: boolean;
    customRules?: Validator[];
    type?: "email" | "phone";
}
export declare function useFormValidation(initialValues: Record<string, any>, rules: Record<string, ValidationRules>): {
    form: Record<string, any>;
    errors: Record<string, string | null>;
    isValid: import("vue").ComputedRef<boolean>;
    validateField: (field: string) => void;
    validateForm: () => void;
};
export {};

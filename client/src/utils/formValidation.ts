export interface FormData {
  [key: string]: string;
}

export interface FormErrors {
  [key: string]: string;
}

export type FieldValidator = (
  value: string,
  allValues?: FormData
) => string | null;

export interface ValidationSchema {
  [key: string]: FieldValidator[];
}

// Validation function
export const validateForm = (data: FormData, schema: ValidationSchema) => {
  const errors: FormErrors = {};

  for (const key in schema) {
    const validators = schema[key];
    for (const validator of validators) {
      const error = validator(data[key] || "", data);
      if (error) {
        errors[key] = error;
        break;
      }
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};

// Register schema
export const registerSchema: ValidationSchema = {
  email: [
    (value) => (!value ? "Email is required" : null),
    (value) =>
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? "Please enter a valid email"
        : null,
  ],
  password: [
    (value) => (!value ? "Password is required" : null),
    (value) =>
      value.length < 8 ? "Password must be at least 8 characters" : null,
    (value) =>
      !/[A-Z]/.test(value) || !/[0-9]/.test(value)
        ? "Password must include at least one uppercase letter and one number"
        : null,
  ],
  confirmPassword: [
    (value, allValues) =>
      value !== allValues?.password ? "Passwords do not match" : null,
  ],
};

// Login schema
export const loginSchema: ValidationSchema = {
  email: [
    (value) => (!value ? "Email is required" : null),
    (value) =>
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? "Please enter a valid email"
        : null,
  ],
  password: [(value) => (!value ? "Password is required" : null)],
};

import * as yup from 'yup';

// Login validation schema
export const loginSchema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

// Registration validation schema
export const registerSchema = yup.object({
  name: yup.string().required('Name is required'),
  age: yup
    .number()
    .required('Age is required')
    .min(18, 'You must be at least 18 years old')
    .max(99, 'Age must be less than 100'),
  gender: yup
    .string()
    .required('Gender is required')
    .oneOf(['male', 'female', 'other'], 'Gender must be male, female, or other'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  city: yup.string().required('City is required'),
  interests: yup
    .array()
    .of(yup.string())
    .min(1, 'At least one interest is required')
    .required('Interests are required'),
});

// Profile update validation schema
export const profileUpdateSchema = yup.object({
  name: yup.string().optional(),
  age: yup
    .number()
    .optional()
    .min(18, 'You must be at least 18 years old')
    .max(99, 'Age must be less than 100'),
  gender: yup
    .string()
    .optional()
    .oneOf(['male', 'female', 'other'], 'Gender must be male, female, or other'),
  email: yup.string().email('Invalid email address').optional(),
  city: yup.string().optional(),
  interests: yup.array().of(yup.string()).optional(),
});

// Match filters validation schema
export const matchFiltersSchema = yup.object({
  min_age: yup
    .number()
    .optional()
    .min(18, 'Minimum age must be at least 18')
    .max(99, 'Minimum age must be less than 100'),
  max_age: yup
    .number()
    .optional()
    .min(18, 'Maximum age must be at least 18')
    .max(99, 'Maximum age must be less than 100'),
  city: yup.string().optional(),
  interest_match: yup.boolean().optional(),
}); 
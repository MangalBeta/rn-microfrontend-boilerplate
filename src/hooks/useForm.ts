import { useState, useCallback } from 'react';

interface UseFormReturn<T> {
  formData: T;
  handleChange: (name: keyof T, value: any) => void;
  resetForm: () => void;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
}

export const useForm = <T extends Record<string, any>>(initialState: T): UseFormReturn<T> => {
  const [formData, setFormData] = useState<T>(initialState);

  const handleChange = useCallback((name: keyof T, value: any) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialState);
  }, [initialState]);

  return {
    formData,
    handleChange,
    resetForm,
    setFormData,
  };
};

export default useForm;


import { useState } from "react";

const useFormValues = (initialValues) => {
  const [formData, setFormData] = useState(initialValues);

  const setFormValues = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return [formData, setFormValues, setFormData];
};

export default useFormValues;

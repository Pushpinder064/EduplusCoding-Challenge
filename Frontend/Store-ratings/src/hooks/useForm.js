import { useState } from "react";
export default function useForm(initial = {}) {
  const [values, setValues] = useState(initial);
  const handleChange = (e) => {
    setValues(v => ({ ...v, [e.target.name]: e.target.value }));
  };
  return [values, handleChange, setValues];
}

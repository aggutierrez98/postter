import { compareObjects } from "helpers/deepCompare";
import { useCallback, useState } from "react";
import { useMemoCompare } from "./useMemoCompare";

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const initialStateRef = useMemoCompare(initialState, compareObjects);

  const reset = useCallback(
    (newFormState = initialStateRef) => {
      setValues(newFormState);
    },
    [initialStateRef]
  );

  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  return { values, handleInputChange, reset };
};

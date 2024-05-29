import { useCallback } from "react";
import { useStore } from "../store";

interface NinValidationFunction {
  onValidate: () => void;
}

const useNinValidation = (): NinValidationFunction => {
  const setState = useStore((state) => state.setState);

  const onValidate = useCallback(() => {
    setState("current", 1);
  }, [setState]);

  return {
    onValidate,
  };
};

export default useNinValidation;

import { useCallback } from "react";
import { useStore } from "../store";
import { NinValidation } from "../store/request";
import { axiosInstance } from "../../api/axiosInstance.config";
import { endpoints } from "../../api/endpoints";

interface NinValidationFunction {
  onValidate: (request: NinValidation) => void;
}

const useNinValidation = (): NinValidationFunction => {
  const setState = useStore((state) => state.setState);

  const onValidate = useCallback(
    (request: NinValidation) => {
      setState("loading", true);
      axiosInstance
        .post(endpoints.ninValidation, request)
        .then((data) => {
          setState("record", data.data);
          setState("loading", false);
          setState("showResponseModal", true);
        })
        .catch((error) => {
          setState("record", error.response.data);
          setState("loading", false);
          setState("showResponseModal", true);
        });
    },
    [setState]
  );

  return {
    onValidate,
  };
};

export default useNinValidation;

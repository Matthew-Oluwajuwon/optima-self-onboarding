/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { SubmitOnboarding } from "../store/request";
import { useStore } from "../store";
import { axiosInstance } from "../../api/axiosInstance.config";
import { endpoints } from "../../api/endpoints";

interface SubmitOnboardingFunction {
  onSubmit: (otpCode: any) => void;
  onSendOtp: (request: SubmitOnboarding) => void;
}

const useSubmitOnboarding = (): SubmitOnboardingFunction => {
  const { setState, request: fieldRequest } = useStore((state) => state);

  const onSendOtp = useCallback(
    (request: SubmitOnboarding) => {
      setState("loading", true);
      axiosInstance
        .get(endpoints.sendOtp + request.phoneNumber + `/${fieldRequest?.nin}`)
        .then((data) => {
          setState("showOtp", true);
          setState("record", data.data);
          setState("loading", false);
        })
        .catch((error) => {
          setState("record", error.response.data);
          setState("loading", false);
          setState("showOtp", false);
          setState("showResponseModal", true);
        });
    },
    [fieldRequest?.nin, setState]
  );

  const onSubmit = useCallback(
    (otpCode: any) => {
      setState("loading", true);
      axiosInstance
        .post(endpoints.submitOnboarding, { ...fieldRequest, otpCode })
        .then((data) => {
          setState("loading", false);
          setState("showResponseModal", true);
          setState("record", data.data);
          setState("showOtp", false);
        })
        .catch((error) => {
          setState("record", error.response.data);
          setState("loading", false);
          setState("showResponseModal", true);
          setState("showOtp", false);
        });
    },
    [fieldRequest, setState]
  );

  return {
    onSubmit,
    onSendOtp,
  };
};

export default useSubmitOnboarding;

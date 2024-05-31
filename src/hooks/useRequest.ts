/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { useStore } from "../store";

const useRequest = () => {
  const state = useStore((state) => state);

  const onSetFieldRequest = useCallback(
    (fieldName: string, fieldValue: any) => {
      if (fieldName === "noOfSpouse") {
        state.setAllState({
          ...state,
          request: {
            ...state.request,
            noOfSpouse: Number(fieldValue) < 1 ? 1 : fieldValue,
          },
        });
      } else {
        state.setAllState({
          ...state,
          request: {
            ...state.request,
            [fieldName]: fieldValue,
          },
        });
      }
    },
    [state]
  );

  return {
    onSetFieldRequest,
  };
};

export default useRequest;

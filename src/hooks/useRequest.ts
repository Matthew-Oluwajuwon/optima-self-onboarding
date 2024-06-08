/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { State } from "../store";

const useRequest = () => {

  const onSetFieldRequest = useCallback(
    (state: State, fieldName: string, fieldValue: any) => {
      state.setAllState({
        ...state,
        request: {
          ...state.request,
          [fieldName]: fieldValue,
        },
      });
    },
    []
  );

  return {
    onSetFieldRequest,
  };
};

export default useRequest;

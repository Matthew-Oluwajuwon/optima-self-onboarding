import { endpoints } from "./../../api/endpoints";
import { axiosInstance } from "./../../api/axiosInstance.config";
import { useCallback } from "react";
import { useStore } from "../store";

const useSelectOptions = () => {
  const { setState } = useStore((state) => state);
  const onGender = useCallback(async () => {
    setState("processing", true);
    const response = await axiosInstance.get(endpoints.gender);
    const genders = Array.isArray(response.data?.data)
      ? response.data?.data
      : [];
    setState("processing", false);
    setState("genders", genders);
  }, [setState]);

  const onReligion = useCallback(async () => {
    setState("processing", true);
    const response = await axiosInstance.get(endpoints.religion);
    const religions = Array.isArray(response.data?.data)
      ? response.data?.data
      : [];
    setState("processing", false);
    setState("religions", religions);
  }, [setState]);

  const onLga = useCallback(async () => {
    setState("processing", true);
    const response = await axiosInstance.get(endpoints.lga);
    const lga = Array.isArray(response.data?.data) ? response.data?.data : [];
    setState("processing", false);
    setState("lga", lga);
  }, [setState]);

  const onMoneyRange = useCallback(async () => {
    setState("processing", true);
    const response = await axiosInstance.get(endpoints.moneyRange);
    const moneyRange = Array.isArray(response.data?.data)
      ? response.data?.data
      : [];
    setState("processing", false);
    setState("moneyRange", moneyRange);
  }, [setState]);

  const onOffenses = useCallback(async () => {
    setState("processing", true);
    const response = await axiosInstance.get(endpoints.offenseList);
    const offenses = Array.isArray(response.data?.data)
      ? response.data?.data
      : [];
    setState("processing", false);
    setState("offenses", offenses);
  }, [setState]);

  const onMaritalStatus = useCallback(async () => {
    setState("processing", true);
    const response = await axiosInstance.get(endpoints.maritalStatus);
    const maritalStatus = Array.isArray(response.data?.data)
      ? response.data?.data
      : [];
    setState("processing", false);
    setState("maritalStatus", maritalStatus);
  }, [setState]);

  return {
    onGender,
    onReligion,
    onLga,
    onMoneyRange,
    onOffenses,
    onMaritalStatus,
  };
};

export default useSelectOptions;

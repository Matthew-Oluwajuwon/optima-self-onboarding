/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker, Input, InputNumber, Select } from "antd";
import { InputHTMLAttributes } from "react";
import { LoadingOutlined, CaretDownOutlined } from "@ant-design/icons";
import React from "react";

export interface CustomField extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  type?: "email" | "text" | "secure" | "date" | "select" | "number" | "amount";
  name?: string;
  form?: any;
  selectPlaceholder?: string;
  options?: Array<any>;
  loading?: boolean;
  onChange?: any;
}

const CustomFields: React.FC<CustomField> = ({
  label,
  required = false,
  type = "text",
  name,
  form,
  selectPlaceholder,
  options,
  loading,
  onChange,
  ...props
}) => {

  return (
    <div className="border border-[#DCE1EA] p-4 rounded-[4px] relative mt-5">
      <label
        htmlFor={label}
        className="absolute -top-3 bg-white z-10 px-2 text-[#717E95] flex items-center gap-1"
      >
        {label}
        {required && <div className="mt-1 text-[#FF0000]">*</div>}
      </label>
      {type === "date" ? (
        <DatePicker
          className="w-full -my-2 placeholder:text-[#8B98B9] text-[#8B98B9] !border-none"
          format="DD/MM/YYYY"
          placeholder="Select DOB"
          onChange={(_date, dateString) =>
            form?.setFieldsValue({ [name as string]: dateString })
          }
        />
      ) : type === "select" ? (
        <Select
          placeholder={selectPlaceholder}
          allowClear
          showSearch
          onChange={onChange}
          suffixIcon={
            loading ? (
              <LoadingOutlined className="text-[#109856]" spin={loading} />
            ) : (
              <CaretDownOutlined />
            )
          }
          loading={loading}
          className="!border-none -my-2 !text-[#8B98B9]"
          onFocus={props.onFocus}
          options={options}
        />
      ) : type === "amount" ? (
        <InputNumber<number>
        formatter={(value) => `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        // parser={(value) => value?.replace(/₦\s?|(,*)/g, '') as unknown as number}
          controls={false}
          className="w-full text-[#8B98B9] -my-2"
          placeholder={props.placeholder}
          onChange={onChange}
        />
      ) : (
        <Input
          type={type}
          className="w-full text-[#8B98B9] -my-2"
          placeholder={props.placeholder}
          onChange={onChange}
          maxLength={props.maxLength}
          minLength={props.minLength}
          value={props.value}
        />
      )}
    </div>
  );
};

export const CustomField = React.memo(CustomFields);

/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker, Select } from "antd";
import { InputHTMLAttributes } from "react";
import { LoadingOutlined, CaretDownOutlined } from "@ant-design/icons";

export interface CustomField extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  type?: "email" | "text" | "secure" | "date" | "select" | "number";
  name?: string;
  form?: any;
  selectPlaceholder?: string;
  options?: Array<any>;
  loading?: boolean;
}

const CustomField: React.FC<CustomField> = ({
  label,
  required = false,
  type = "text",
  name,
  form,
  selectPlaceholder,
  options,
  loading,
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
          onChange={props.onChange}
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
      ) : (
        <input type={type} className="w-full text-[#8B98B9]" {...props} />
      )}
    </div>
  );
};

export default CustomField;

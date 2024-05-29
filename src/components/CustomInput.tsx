/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker } from "antd";
import { InputHTMLAttributes } from "react";

export interface CustomInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  type?: "email" | "text" | "secure" | "date";
  name?: string;
  form?: any;
}

const CustomInput: React.FC<CustomInput> = ({
  label,
  required = false,
  type = "text",
  name,
  form,
  ...props
}) => {
  return (
    <div className="border border-[#DCE1EA] p-5 rounded-[4px] relative mt-5">
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
      ) : (
        <input type={type} className="w-full text-[#8B98B9]" {...props} />
      )}
    </div>
  );
};

export default CustomInput;

import { Form } from "antd";
import CustomField from "./CustomField";
import { SubmitButton } from "./SubmitButton";
import useNinValidation from "../hooks/useNinValidation";

const NINValidation: React.FC = () => {
  const [form] = Form.useForm();
  const { onValidate } = useNinValidation();

  return (
    <Form
      form={form}
      onFinish={onValidate}
      className="w-full mt-10 lg:max-w-lg lg:mx-auto"
      layout="vertical"
    >
      <Form.Item
        name="firstName"
        rules={[
          { required: true, message: "First name is required" },
          {
            pattern: /^[a-zA-Z\s]*$/,
            message: "Invalid input",
          },
        ]}
      >
        <CustomField
          label="First Name"
          placeholder="Enter first name"
          required
        />
      </Form.Item>
      <Form.Item
        name="middleName"
        rules={[
          {
            pattern: /^[a-zA-Z\s]*$/,
            message: "Invalid input",
          },
        ]}
      >
        <CustomField label="Middle Name" placeholder="Enter middle name" />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[
          { required: true, message: "Last name is required" },
          {
            pattern: /^[a-zA-Z\s]*$/,
            message: "Invalid input",
          },
        ]}
      >
        <CustomField label="Last Name" placeholder="Enter last name" required />
      </Form.Item>
      <Form.Item
        name="nin"
        rules={[
          { required: true, message: "NIN is required" },
          {
            pattern: /^\d{11}$/,
            message: "NIN must be 11 digits",
          },
        ]}
      >
        <CustomField
          label="National Identification Number (NIN)"
          placeholder="Enter NIN"
          minLength={11}
          maxLength={11}
          required
        />
      </Form.Item>
      <Form.Item
        name="dob"
        rules={[{ required: true, message: "Date of birth is required" }]}
      >
        <CustomField
          label="Date of birth"
          type="date"
          name="dob"
          form={form}
          required
        />
      </Form.Item>
      <SubmitButton form={form}>Submit</SubmitButton>
    </Form>
  );
};

export default NINValidation;

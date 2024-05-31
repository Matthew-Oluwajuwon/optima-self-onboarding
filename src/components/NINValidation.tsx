import { Form } from "antd";
import CustomField from "./CustomField";
import { SubmitButton } from "./SubmitButton";
import useNinValidation from "../hooks/useNinValidation";
import { useStore } from "../store";
import ResponseModal from "./ResponseModal";
import useRequest from "../hooks/useRequest";

const NINValidation: React.FC = () => {
  const [form] = Form.useForm();
  const state = useStore((state) => state);
  const { onValidate } = useNinValidation();
  const { onSetFieldRequest } = useRequest()

  return (
    <Form
      form={form}
      onFinish={onValidate}
      className="w-full mt-10 lg:max-w-lg lg:mx-auto"
      layout="vertical"
    >
      {state.showResponseModal && <ResponseModal />}
      <Form.Item
        name="firstname"
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
        name="lastname"
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
          onChange={(e) => {
            form.setFieldValue("nin", e.target.value)
            onSetFieldRequest("nin", e.target.value)
          }}
          required
        />
      </Form.Item>
      <Form.Item
        name="dateOfBirth"
        rules={[{ required: true, message: "Date of birth is required" }]}
      >
        <CustomField
          label="Date of birth"
          type="date"
          name="dateOfBirth"
          form={form}
          required
        />
      </Form.Item>
      <SubmitButton loading={state.loading} form={form}>
        Proceed
      </SubmitButton>
    </Form>
  );
};

export default NINValidation;

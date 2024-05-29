import { Form, Steps } from "antd";
import CustomInput from "./CustomInput";
import { SubmitButton } from "./SubmitButton";

const StepForm: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <div>
      <div className="lg:bg-[#F9FAFB] p-3 mb-5 rounded-full px-5">
        <Steps
          items={[
            {
              title: "NIN Validation",
            },
            {
              title: "Personal Info",
            },
          ]}
        />
      </div>
      <h1 className="text-[#1D2939] text-xl lg:text-3xl font-euclid-semibold">
        Self Onboarding
      </h1>
      <Form
        form={form}
        className="w-full mt-10 lg:max-w-lg lg:mx-auto"
        layout="vertical"
      >
        <Form.Item
          name="firstName"
          rules={[
            { required: true, message: "First name is required" },
            {
              pattern: /^[a-zA-Z\s\-'À-ÖØ-öø-ÿ]*$/,
              message: "First name must contain only letters and spaces!",
            },
          ]}
        >
          <CustomInput
            label="First Name"
            placeholder="Enter first name"
            required
          />
        </Form.Item>
        <Form.Item name="middleName">
          <CustomInput label="Middle Name" placeholder="Enter middle name" />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true, message: "Last name is required" }]}
        >
          <CustomInput
            label="Last Name"
            placeholder="Enter last name"
            required
          />
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
          <CustomInput
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
          <CustomInput
            label="Date of birth"
            type="date"
            name="dob"
            form={form}
            required
          />
        </Form.Item>
        <SubmitButton form={form}>Submit</SubmitButton>
      </Form>
    </div>
  );
};

export default StepForm;

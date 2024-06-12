import { Steps } from "antd";
import NINValidation from "./NINValidation";
import { useStore } from "../store";
import PersonalInfo from "./PersonalInfo";

const StepForm: React.FC = () => {
  const state = useStore((state) => state);

  const steps = [
    {
      content: <NINValidation />,
    },
    {
      content: <PersonalInfo />,
    },
  ];

  return (
    <div>
      <div className="lg:bg-[#F9FAFB] p-3 mb-5 rounded-full px-5">
        <Steps
          current={state.current}
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
      {steps[state.current as number]?.content}
    </div>
  );
};

export default StepForm;

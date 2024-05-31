import { ConfigProvider, Input, Modal, Spin } from "antd";
import { useStore } from "../store";
import { useCallback } from "react";
import useTimer from "../hooks/useTimer";
import useSubmitOnboarding from "../hooks/useSubmitOnboarding";

const OtpModal: React.FC = () => {
  const { showOtp, request, setState, loading } = useStore((state) => state);
  const { onSendOtp, onSubmit } = useSubmitOnboarding();
  const handleCancel = useCallback(() => {
    setState("showOtp", false);
  }, [setState]);

  const { resetTimer, timeRemaining } = useTimer();

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            controlOutlineWidth: 1,
            lineWidth: 1,
          },
        },
      }}
    >
      <Modal
        open={showOtp}
        footer={false}
        centered
        onCancel={handleCancel}
        closable={false}
      >
        <Spin spinning={loading}>
          <div className="grid place-content-center mt-5 mb-10">
            <h1 className="font-euclid-semibold text-center text-2xl">
              OTP Verification
            </h1>
            <h3 className="my-5 text-center">
              Kindly entere the OTP delivered to{" "}
              <strong>{request?.phoneNumber}</strong>
            </h3>
            <Input.OTP
              length={6}
              size={"large"}
              onChange={(e) => onSubmit(e)}
              mask
            />
          </div>
          <div className="text-center">
            Didn't receive an otp?{" "}
            <button
              type="button"
              className="text-[#109856] font-euclid-semibold"
              disabled={timeRemaining > 0}
              onClick={() => {
                resetTimer();
                onSendOtp(request);
              }}
            >
              {timeRemaining > 0 ? `${timeRemaining}secs` : "Resend"}
            </button>
          </div>
        </Spin>
      </Modal>
    </ConfigProvider>
  );
};

export default OtpModal;

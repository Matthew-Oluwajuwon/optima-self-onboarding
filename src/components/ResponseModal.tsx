import { Button, Modal } from "antd";
import { useStore } from "../store";
import { useCallback } from "react";
import failed from "../assets/images/failed.svg";
import success from "../assets/images/success.svg";

const ResponseModal: React.FC = () => {
  const { showResponseModal, record, current, setState, setAllState } =
    useStore((state) => state);
  const handleClick = useCallback(() => {
      setState("current", current === 1 ? (record?.responseCode === 200 ? 0 : 1) : 1);
      if (current === 1) {
        setAllState({
          genders: [],
          religions: [],
          processing: false,
          lga: [],
          moneyRange: [],
          offenses: [],
          maritalStatus: [],
          request: undefined,
          showResponseModal: false,
          loading: false,
          record: undefined,
          showOtp: false,
          setAllState: () => {},
          setState: () => {},
        });
    }
    setState("showResponseModal", false);
  }, [current, record?.responseCode, setAllState, setState]);

  return (
    <Modal
      open={showResponseModal}
      footer={false}
      centered
      onCancel={handleClick}
      closable={false}
    >
      <div className="grid place-content-center m-5">
        <img
          src={record?.responseCode === 200 ? success : failed}
          alt=""
          className="mx-auto"
        />
        <div className="my-10">
          <h1 className="text-center font-euclid-bold text-2xl mb-3">
            {record?.responseCode === 200 ? "Successful" : "Failed"}
          </h1>
          <p className="text-center text-md">
            {typeof record?.data === "string"
              ? record?.data
              : record?.responseMessage}
          </p>
        </div>
        <Button
          type="primary"
          className="py-6 flex items-center justify-center shadow-none"
          block
          onClick={handleClick}
          style={{
            backgroundColor: record?.responseCode === 200 ? "#109856" : "red",
          }}
        >
          {record?.responseCode === 200 ? "Continue" : "Close"}
        </Button>
      </div>
    </Modal>
  );
};

export default ResponseModal;

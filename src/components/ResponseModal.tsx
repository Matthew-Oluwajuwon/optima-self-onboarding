import { Button, Modal } from "antd";
import { useStore } from "../store";
import { useCallback } from "react";
import failed from "../assets/images/failed.svg";
import success from "../assets/images/success.svg";

const ResponseModal: React.FC = () => {
  const { showResponseModal, record, current, setState } =
    useStore((state) => state);
  const handleClick = useCallback(() => {
    if (current === 1) {
      setState("current", current === 1 ? (record?.responseCode === 200 ? 0 : 1) : 1);
      
    } else {
      
      setState("current", record?.responseCode === 200 ? 1 : 0);
    }
    setState("showResponseModal", false);
  }, [current, record?.responseCode, setState]);

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

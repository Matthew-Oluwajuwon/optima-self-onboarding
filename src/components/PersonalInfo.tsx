import { Col, Divider, Form, Radio, Row } from "antd";
import CustomField from "./CustomField";
import useSelectOptions from "../hooks/useSelectOptions";
import { useStore } from "../store";
import useRequest from "../hooks/useRequest";
import { SubmitButton } from "./SubmitButton";

const PersonalInfo: React.FC = () => {
  const state = useStore((state) => state);
  const [form] = Form.useForm();
  const { onSetFieldRequest } = useRequest();
  const {
    onGender,
    onReligion,
    onLga,
    onMoneyRange,
    onOffenses,
    onMaritalStatus,
  } = useSelectOptions();

  return (
    <Form
      form={form}
      layout="vertical"
      requiredMark="optional"
      className="w-full mt-10 lg:max-w-lg lg:mx-auto"
      initialValues={{
        name: "noOfSpouse",
        value: 1,
      }}
      fields={[
        {
          name: "noOfSpouse",
          value: state.request?.noOfSpouse ?? 1
        },
        {
          name: "spouse",
          value: state.request?.noOfSpouse
            ? Array.from(
                { length: Number(state.request?.noOfSpouse) },
                () => ({})
              )
            : [0],
        },
      ]}
    >
      <Form.Item
        name="gender"
        rules={[{ required: true, message: "Gender is required" }]}
      >
        <CustomField
          label="Gender"
          selectPlaceholder="Select gender"
          type="select"
          loading={state.processing}
          required
          onFocus={onGender}
          options={state.genders.map((gender) => ({
            label: gender,
            value: gender,
          }))}
        />
      </Form.Item>
      <Form.Item
        name="gender"
        rules={[{ required: true, message: "Gender is required" }]}
      >
        <CustomField
          label="Religion"
          selectPlaceholder="Select religion"
          type="select"
          loading={state.processing}
          required
          onFocus={onReligion}
          options={state.religions.map((religion) => ({
            label: religion,
            value: religion,
          }))}
        />
      </Form.Item>
      <Form.Item
        name="lga"
        rules={[{ required: true, message: "LGA is required" }]}
      >
        <CustomField
          label="LGA"
          selectPlaceholder="Select LGA"
          type="select"
          loading={state.processing}
          required
          onFocus={onLga}
          options={state.lga.map((lga) => ({
            label: lga,
            value: lga,
          }))}
        />
      </Form.Item>
      <Form.Item
        label={
          <p className="text-[#8B98B9]">
            Do you own your own house? <span className="text-[#FF0000]">*</span>
          </p>
        }
        name="houseType"
        rules={[{ required: true, message: "House type is required" }]}
      >
        <Radio.Group onChange={(e) => onSetFieldRequest("houseType", e.target.value)}>
          <Radio value="yes" className="text-[#8B98B9]">
            Yes
          </Radio>
          <Radio value="no" className="text-[#8B98B9]">
            No
          </Radio>
        </Radio.Group>
      </Form.Item>
      {state.request?.houseType === "no" && (
        <Form.Item
          name="moneyRange"
          rules={[{ required: true, message: "LGA is required" }]}
        >
          <CustomField
            label="Money range"
            selectPlaceholder="Select money range"
            type="select"
            loading={state.processing}
            required
            onFocus={onMoneyRange}
            options={state.moneyRange.map((moneyRange) => ({
              label: moneyRange,
              value: moneyRange,
            }))}
          />
        </Form.Item>
      )}
      <Form.Item
        label={
          <p className="text-[#8B98B9]">
            Have you been arrested before?{" "}
            <span className="text-[#FF0000]">*</span>
          </p>
        }
        name="arrestType"
        rules={[{ required: true, message: "House type is required" }]}
      >
        <Radio.Group onChange={(e) => onSetFieldRequest("arrestType", e.target.value)}>
          <Radio value="yes" className="text-[#8B98B9]">
            Yes
          </Radio>
          <Radio value="no" className="text-[#8B98B9]">
            No
          </Radio>
        </Radio.Group>
      </Form.Item>
      {state.request?.arrestType?.toLowerCase() === "yes" && (
        <Form.Item
          name="offense"
          rules={[{ required: true, message: "Offense is required" }]}
        >
          <CustomField
            label="Offense"
            selectPlaceholder="Select offense"
            type="select"
            loading={state.processing}
            required
            onFocus={onOffenses}
            options={state.offenses.map((offense) => ({
              label: offense,
              value: offense,
            }))}
          />
        </Form.Item>
      )}
      <Form.Item
        label={
          <p className="text-[#8B98B9]">
            Political view <span className="text-[#FF0000]">*</span>
          </p>
        }
        name="houseType"
        rules={[{ required: true, message: "House type is required" }]}
      >
        <Radio.Group>
          <Radio value="Active" className="text-[#8B98B9]">
            Active
          </Radio>
          <Radio value="passive" className="text-[#8B98B9]">
            Passive
          </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="maritalStatus"
        rules={[{ required: true, message: "Marital status is required" }]}
      >
        <CustomField
          label="Marital status"
          selectPlaceholder="Select marital status"
          type="select"
          loading={state.processing}
          required
          onChange={(e) => onSetFieldRequest("maritalStatus", e)}
          onFocus={onMaritalStatus}
          options={state.maritalStatus.map((maritalStatus) => ({
            label: maritalStatus,
            value: maritalStatus,
          }))}
        />
      </Form.Item>
      {state.request?.maritalStatus?.toLowerCase() === "married" && (
        <>
          <Form.Item
            name="noOfSpouse"
            rules={[
              {
                validator(_rule, value) {
                  if (Number(value) < 1) {
                    return Promise.reject(
                      new Error("Minimum number required is 1")
                    );
                  } else {
                    return Promise.resolve();
                  }
                },
              },
            ]}
          >
            <CustomField
              placeholder="Enter number of spouse"
              label="No of spouse"
              type="number"

              onChange={(e) => onSetFieldRequest("noOfSpouse", e.target.value)}
              required
            />
          </Form.Item>
          <Divider dashed>SPOUSE INFORMATION</Divider>
          <Form.List name="spouse">
            {(fields) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row key={key} className="w-full justify-between">
                    <Col xs={24} md={11}>
                      <Form.Item
                        {...restField}
                        name={[name, "spouseName"]}
                        rules={[
                          { required: true, message: "Missing spouse name" },
                        ]}
                        className="w-full"
                      >
                        <CustomField
                          placeholder="Enter spouse name"
                          label="Spouse name"
                          required
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={11}>
                      <Form.Item
                        {...restField}
                        name={[name, "spousePhoneNumber"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing spouse phone number",
                          },
                        ]}
                        className="w-full"
                      >
                        <CustomField
                          placeholder="Enter spouse phone number"
                          label="Spouse phone number"
                          required
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                ))}
              </>
            )}
          </Form.List>
        </>
      )}
      <SubmitButton form={form}>Submit</SubmitButton>
    </Form>
  );
};

export default PersonalInfo;

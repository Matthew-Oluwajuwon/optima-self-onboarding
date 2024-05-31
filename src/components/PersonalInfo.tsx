/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, Col, Divider, Form, Radio, Row } from "antd";
import CustomField from "./CustomField";
import useSelectOptions from "../hooks/useSelectOptions";
import { useStore } from "../store";
import useRequest from "../hooks/useRequest";
import { SubmitButton } from "./SubmitButton";
import useSubmitOnboarding from "../hooks/useSubmitOnboarding";
import ResponseModal from "./ResponseModal";
import OtpModal from "./OtpModal";
import { useState } from "react";

const PersonalInfo: React.FC = () => {
  const state = useStore((state) => state);
  const [form] = Form.useForm();
  const { onSendOtp } = useSubmitOnboarding();
  const { onSetFieldRequest } = useRequest();
  const { onGender, onReligion, onLga, onOffenses, onMaritalStatus } =
    useSelectOptions();

  // Local state to manage checkboxes in the Form List
  const [checkboxStates, setCheckboxStates] = useState<any>({});

  const handleCheckboxChange = (
    index: number,
    key: string,
    value: string | boolean | number
  ) => {
    setCheckboxStates({
      ...checkboxStates,
      [index]: value,
    });
    // Optionally, update your global state if necessary
    const updatedChildList = [...(state.request?.childList || [])];
    updatedChildList[index] = { ...updatedChildList[index], [key]: value };
    onSetFieldRequest("childList", updatedChildList);
  };

  const onChangeFormList = (index: number, key: string, value: string | number) => {
    const updatedSpouseList = [...(state.request?.spouseList || [])];
    updatedSpouseList[index] = { ...updatedSpouseList[index], [key]: value };
    onSetFieldRequest("spouseList", updatedSpouseList);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSendOtp}
      requiredMark="optional"
      autoComplete="true"
      className="w-full mt-10 lg:max-w-lg lg:mx-auto"
      fields={[
        {
          name: "noOfSpouse",
          value: state.request?.noOfSpouse ?? 1,
        },
        {
          name: "annualRent",
          value: state.request?.annualRent,
        },
        {
          name: "spouseList",
          value: state.request?.noOfSpouse
            ? Array.from(
                { length: Number(state.request?.noOfSpouse) },
                () => ({})
              )
            : [0],
        },
        {
          name: "childList",
          value: state.request?.noOfSpouse
            ? Array.from(
                { length: Number(state.request?.noOfSpouse) },
                () => ({})
              )
            : [0],
        },
      ]}
    >
      {state.showResponseModal && <ResponseModal />}
      {state.showOtp && <OtpModal />}
      <Form.Item
        name={"phoneNumber"}
        rules={[
          {
            required: true,
            message: "Phone number is required",
          },
          {
            pattern: /^0[7-9]\d{9}$/,
            message: "Invalid phone number",
          },
        ]}
      >
        <CustomField
          placeholder="Enter phone number"
          label="Phone number"
          maxLength={11}
          onChange={(e) => onSetFieldRequest("phoneNumber", e.target.value)}
          minLength={11}
          required
        />
      </Form.Item>
      <Form.Item
        name={"email"}
        rules={[
          {
            required: true,
            message: "Email is required",
          },
          {
            type: "email",
            message: "Invalid email entered",
          },
        ]}
      >
        <CustomField
          placeholder="Enter email address"
          label="Email"
          onChange={(e) => onSetFieldRequest("email", e.target.value)}
          required
        />
      </Form.Item>
      <Form.Item
        name="gender"
        rules={[{ required: true, message: "Gender is required" }]}
      >
        <CustomField
          label="Gender"
          selectPlaceholder="Select gender"
          type="select"
          loading={state.processing}
          onChange={(e) => onSetFieldRequest("gender", e)}
          required
          onFocus={onGender}
          options={state.genders.map((gender) => ({
            label: gender,
            value: gender,
          }))}
        />
      </Form.Item>
      <Form.Item
        name="religion"
        rules={[{ required: true, message: "Religion is required" }]}
      >
        <CustomField
          label="Religion"
          selectPlaceholder="Select religion"
          type="select"
          loading={state.processing}
          onChange={(e) => onSetFieldRequest("religion", e)}
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
          onChange={(e) => onSetFieldRequest("lga", e)}
          options={state.lga.map((lga) => ({
            label: lga,
            value: lga,
          }))}
        />
      </Form.Item>
      <Form.Item
        name="placeOfBirth"
        rules={[{ required: true, message: "Place of birth is required" }]}
      >
        <CustomField
          label="Place of birth"
          placeholder="Enter place of birth"
          onChange={(e) => onSetFieldRequest("placeOfBirth", e.target.value)}
          required
        />
      </Form.Item>
      <Form.Item
        name="address"
        rules={[{ required: true, message: "Address is required" }]}
      >
        <CustomField
          label="Address"
          onChange={(e) => onSetFieldRequest("address", e.target.value)}
          placeholder="Enter address"
          required
        />
      </Form.Item>
      <Form.Item
        label={
          <p className="text-[#8B98B9]">
            Do you own your own house? <span className="text-[#FF0000]">*</span>
          </p>
        }
        name="houseOwner"
        rules={[{ required: true, message: "House owner type is required" }]}
      >
        <Radio.Group
          onChange={(e) => onSetFieldRequest("houseOwner", e.target.value)}
        >
          <Radio value={true} className="text-[#8B98B9]">
            Yes
          </Radio>
          <Radio value={false} className="text-[#8B98B9]">
            No
          </Radio>
        </Radio.Group>
      </Form.Item>
      {state.request?.houseOwner === false && (
        <Form.Item
          name="annualRent"
          rules={[
            { required: true, message: "Annual rent is required" },
            {
              pattern: /^\d+$/,
              message: "Invalid input entered",
            },
          ]}
        >
          <CustomField
            label="Annual rent"
            placeholder="Enter annual rent"
            onChange={(e) => {
              onSetFieldRequest(
                "annualRent",
                e.target.value?.replace(/1/, ",")
              );
            }}
            type="text"
            required
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
        name="convicted"
        rules={[{ required: true, message: "Conviction is required" }]}
      >
        <Radio.Group
          onChange={(e) => onSetFieldRequest("convicted", e.target.value)}
        >
          <Radio value={true} className="text-[#8B98B9]">
            Yes
          </Radio>
          <Radio value={false} className="text-[#8B98B9]">
            No
          </Radio>
        </Radio.Group>
      </Form.Item>
      {state.request?.convicted && (
        <Form.Item
          name="crimeType"
          rules={[{ required: true, message: "Crime type is required" }]}
        >
          <CustomField
            label="Crime type"
            selectPlaceholder="Select offense"
            type="select"
            loading={state.processing}
            onChange={(e) => onSetFieldRequest("crimeType", e)}
            required
            onFocus={onOffenses}
            options={state.offenses.map((offense) => ({
              label: offense,
              value: offense,
            }))}
          />
        </Form.Item>
      )}
      {state.request?.crimeType?.toLowerCase().includes("other") && (
        <Form.Item
          name="specifyCrimeType"
          rules={[
            { required: true, message: "Specific crime type is required" },
          ]}
          className="w-full"
        >
          <CustomField
            placeholder="Specify offense"
            label="Please specify..."
            onChange={(e) =>
              onSetFieldRequest("specifyCrimeType", e.target.value)
            }
            required
          />
        </Form.Item>
      )}
      <Form.Item
        label={
          <p className="text-[#8B98B9]">
            Political view <span className="text-[#FF0000]">*</span>
          </p>
        }
        name="politicalView"
        rules={[{ required: true, message: "Political view is required" }]}
      >
        <Radio.Group
          onChange={(e) => onSetFieldRequest("politicalView", e.target.value)}
        >
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
              {
                pattern: /^\d+$/,
                message: "Only numbers are allowed"
              }
            ]}
          >
            <CustomField
              placeholder="Enter number of spouse"
              label="No of spouse"
              onChange={(e) => onSetFieldRequest("noOfSpouse", e.target.value)}
              required
            />
          </Form.Item>
          <Divider dashed>SPOUSE INFORMATION</Divider>
          <Form.List name="spouseList">
            {(fields) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <Row key={key} className="w-full justify-between">
                    <Col xs={24} md={11}>
                      <Form.Item
                        {...restField}
                        name={[name, "name"]}
                        rules={[
                          { required: true, message: "Missing spouse name" },
                        ]}
                        className="w-full"
                      >
                        <CustomField
                          placeholder="Enter spouse name"
                          label="Spouse name"
                          onChange={(e) =>
                            onChangeFormList(index, "name", e.target.value)
                          }
                          required
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={11}>
                      <Form.Item
                        {...restField}
                        name={[name, "phoneNumber"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing spouse phone number",
                          },
                          {
                            pattern: /^0[7-9]\d{9}$/,
                            message: "Invalid phone number",
                          },
                        ]}
                        className="w-full"
                      >
                        <CustomField
                          placeholder="Enter spouse phone number"
                          label="Spouse phone number"
                          onChange={(e) =>
                            onChangeFormList(
                              index,
                              "phoneNumber",
                              e.target.value
                            )
                          }
                          required
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                ))}
              </>
            )}
          </Form.List>
          <Divider dashed>CHILD INFORMATION</Divider>
          <Form.List name="childList">
            {(fields) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <Row key={key} className="w-full justify-between">
                    <Form.Item
                      {...restField}
                      name={[name, "inSchool"]}
                      rules={[{ required: true, message: "Missing child school status" }]}
                      className="w-full"
                    >
                      <>
                        Is this child in school?{" "}
                        <Checkbox
                          onChange={(e) =>
                            handleCheckboxChange(
                              index,
                              "inSchool",
                              e.target.checked
                            )
                          }
                          checked={checkboxStates[index]}
                          className="ml-2"
                        />
                      </>
                    </Form.Item>
                    <Col xs={24} md={11}>
                      <Form.Item
                        {...restField}
                        name={[name, "name"]}
                        rules={[
                          { required: true, message: "Missing child name" },
                        ]}
                        className="w-full"
                      >
                        <CustomField
                          placeholder="Enter child name"
                          label="Child name"
                          onChange={(e) =>
                            handleCheckboxChange(index, "name", e.target.value)
                          }
                          required
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={11}>
                      <Form.Item
                        {...restField}
                        name={[name, "phoneNumber"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing child phone number",
                          },
                          {
                            pattern: /^0[7-9]\d{9}$/,
                            message: "Invalid phone number",
                          },
                        ]}
                        className="w-full"
                      >
                        <CustomField
                          placeholder="Enter child phone number"
                          label="Child phone number"
                          onChange={(e) =>
                            handleCheckboxChange(
                              index,
                              "phoneNumber",
                              e.target.value
                            )
                          }
                          required
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={11}>
                      <Form.Item
                        {...restField}
                        name={[name, "age"]}
                        rules={[
                          { required: true, message: "Missing child age" },
                          {
                            pattern: /^\d+$/,
                            message: "Only numbers are allowed",
                          },
                        ]}
                        className="w-full"
                      >
                        <CustomField
                          placeholder="Enter child age"
                          label="Child age"
                          onChange={(e) =>
                            handleCheckboxChange(index, "age", Number(e.target.value))
                          }
                          required
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={11}>
                      {state.request?.childList &&
                        state.request?.childList[name]?.inSchool && (
                          <Form.Item
                            {...restField}
                            name={[name, "schoolName"]}
                            rules={[
                              {
                                required: true,
                                message: "Missing school name",
                              },
                            ]}
                            className="w-full"
                          >
                            <CustomField
                              placeholder="Enter school name"
                              label="School name"
                              onChange={(e) =>
                                handleCheckboxChange(
                                  index,
                                  "schoolName",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </Form.Item>
                        )}
                    </Col>
                  </Row>
                ))}
              </>
            )}
          </Form.List>
        </>
      )}
      <SubmitButton loading={state.loading} form={form}>
        Submit
      </SubmitButton>
    </Form>
  );
};

export default PersonalInfo;

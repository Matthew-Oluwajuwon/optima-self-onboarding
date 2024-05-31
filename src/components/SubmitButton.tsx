import React from "react";
import type { FormInstance } from "antd";
import { Button, Form } from "antd";

interface SubmitButtonProps {
  form: FormInstance;
  loading?: boolean;
}

export const SubmitButton: React.FC<
  React.PropsWithChildren<SubmitButtonProps>
> = ({ form, loading, children }) => {
  const [submittable, setSubmittable] = React.useState<boolean>(false);

  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button
      type="primary"
      htmlType="submit"
      className="py-6 flex items-center justify-center shadow-none disabled:!border-none disabled:!bg-[#B8B7C8] disabled:!text-white"
      disabled={!submittable}
      block
      loading={loading}
    >
      {children}
    </Button>
  );
};

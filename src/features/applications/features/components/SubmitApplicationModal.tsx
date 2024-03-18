import { Form, Modal, Select } from "antd";
import React, { useState } from "react";
import { AppButton } from "src/components/button/AppButton";
import { generalValidationRulesOpt } from "src/utils/formHelpers/validations";
import { useSubmitPaymentApplication } from "../../hooks/Application hooks/useSubmitPaymentApplication";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_APPLICATIONS } from "../../hooks/Application hooks/useGetApplication";
import { useQueryClient } from "react-query";
import { UploadProofofPaymentModal } from "./UploadProofofPaymentModal";

interface ISubmitProps {
  open: boolean;
  handleClose: () => void;
  applicantId: number;
}

export const SubmitApplicationModal: React.FC<ISubmitProps> = ({
  open,
  handleClose,
  applicantId,
}) => {
  const [form] = Form.useForm();
  const [openPaymentModal, setOpenPaymentModal] = useState<boolean>(false);
  const { mutate, isLoading } = useSubmitPaymentApplication();
  const queryClient = useQueryClient();

  const handleSubmit = (val: any) => {
    mutate(
      { threshold_payment: val.thresholdPayment, id: applicantId },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description: error.response.data.message,
            duration: 5,
          });
          form.resetFields();
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICATIONS]);
          form.resetFields();
          handleClose()
          setOpenPaymentModal(true)
        },
      }
    );
  };

  return (
    <>
      <Modal footer={null} open={open} onCancel={handleClose}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <h1 className="p-2 font-bold text-center text-lg">
            Choose an Option
          </h1>
          <Form.Item
            rules={generalValidationRulesOpt}
            name={"thresholdPayment"}
            label="Select a threshold payment option"
          >
            <Select
              options={[
                {
                  label: "Prospect is ready to pay full threshold payment",
                  value: true,
                },
                {
                  label:
                    "  Prospect is ready to pay 0% or less than the threshold payment",
                  value: false,
                },
              ]}
            />
          </Form.Item>

          <div className="flex items-center justify-center gap-4 p-4 mt-2">
            <AppButton
              label="Cancel"
              variant="transparent"
              containerStyle="border border-secondary text-secondary"
              type="reset"
            />
            <AppButton
              label="Next"
              type="submit"
              // handleClick={() => handleOpenImportModal()}
              isLoading={isLoading}
            />
          </div>
        </Form>
      </Modal>
      <UploadProofofPaymentModal
        applicantId={applicantId as unknown as number}
        open={openPaymentModal}
        onCancel={() => setOpenPaymentModal(false)}
      />
    </>
  );
};

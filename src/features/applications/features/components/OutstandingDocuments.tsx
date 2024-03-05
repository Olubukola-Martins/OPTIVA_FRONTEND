import { Empty, Modal } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { useFetchOutstandingDocuments } from "../../hooks/useFetchOutstandingDocuments";

export interface IModalProps {
  open: boolean;
  onCancel: () => void;
  applicantId: number | undefined;
}

export const OutstandingDocuments: React.FC<IModalProps> = ({
  onCancel,
  open,
  applicantId,
}) => {
  // const [form] = Form.useForm();
  const { data } = useFetchOutstandingDocuments({
    id: applicantId as unknown as number,
  });

  console.log("applicant doc", data);
  // const handleSubmit = () => {};
  return (
    <>
      <Modal open={open} onCancel={onCancel} footer={null}>
        <h1 className="p-4 font-bold text-center text-lg">
          Outstanding Document
        </h1>
        {data && data?.length > 0 ? (
          data?.map((item) => (
            <div>
              <p>{item.name}</p>
            </div>
          ))
        ) : (
          <Empty description="No outstanding documents for this applicant" />
        )}

        <div className="flex items-center justify-end gap-5">
          <AppButton
            label="Cancel"
            // type="reset"
            variant="transparent"
            handleClick={() => onCancel()}
          />
          {/* <AppButton label="Save" type="submit" /> */}
        </div>
        {/* <Form form={form} onFinish={handleSubmit} layout="vertical">
          <h1 className="p-4 font-bold text-center text-lg">
            Select Outstanding Document 
          </h1>
          <Form.Item
            name="outstandingDoc"
            label="Select Document(s)"
            rules={generalValidationRules}
          >
            <Select mode="multiple">
              {data?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>

           </Form.Item>

          <div className="flex items-center justify-center gap-5">
            <AppButton
              label="Cancel"
              type="reset"
              variant="transparent"
            />
            <AppButton label="Save" type="submit" />
          </div>
        </Form> */}
      </Modal>
    </>
  );
};

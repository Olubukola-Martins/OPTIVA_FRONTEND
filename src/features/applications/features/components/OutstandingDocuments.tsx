import { Empty, Modal } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { useFetchOutstandingDocuments } from "../../hooks/Documet hooks/useFetchOutstandingDocuments";

export interface IModalProps {
  open: boolean;
  onCancel: () => void;
  applicantId: number | undefined | string;
}

export const OutstandingDocuments: React.FC<IModalProps> = ({
  onCancel,
  open,
  applicantId,
}) => {
  const { data } = useFetchOutstandingDocuments(applicantId as number);
  return (
    <>
      <Modal open={open} onCancel={onCancel} footer={null}>
        <h1 className="p-4 font-bold text-center text-lg">
          Outstanding Document
        </h1>
        {data && data?.length > 0 ? (
          data?.map((item) => (
            <div>
              <h3 className="font-semibold text-base">
                {" "}
                The outstanding documents for this applicant is as follows:
              </h3>

              <p className="flex items-center gap-3"><i className="ri-check-line"></i>{item.name}</p>
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
      </Modal>
    </>
  );
};

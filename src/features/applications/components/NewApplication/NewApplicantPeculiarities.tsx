import { AppButton } from "src/components/button/AppButton";
import { NewApplicantPeculiaritiesTab } from "./NewApplicantPeculiaritiesTab";
import { FormInstance } from "antd";

export const NewApplicantPeculiarites = ({ form }: { form: FormInstance }) => {
  return (
    <>
      <NewApplicantPeculiaritiesTab />
      <div className="w-full flex justify-end gap-4 items-center">
       
      </div>
    </>
  );
};

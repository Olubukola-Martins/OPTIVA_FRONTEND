import { Form, InputNumber } from "antd";
import { generalValidationRules } from "src/utils/formHelpers/validations";

export const DominicaDonationQuestions = () => {
  return (
    <div className="flex gap-8">
      <div className="w-1/2">
        <Form.Item
          label="EDF Contribution for Applicant"
          name="edf_bution_for_main_applicant"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label={`EDF Contribution for Family of  \u22644`}
          name="edf_bution_for_family_ls_than_eq_to_four"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="EDF Contribution for Additonal Dependents >18yrs"
          name="edf_bution_for_add_depn_gt_than_eighteen"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Due Diligence Fee for Main Applicant"
          name="due_dil_fee_for_main_applicant"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Due Diligence Fee for Dependents <16yrs"
          name="due_dil_fee_for_depn_ls_than_sixteen"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Legal Fees (Flat Fee)"
          name="legal_fee"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Gov't  Passport Issuance Fee"
          name="govt_passport_issuance_fee"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Bank + Courier Charges"
          name="bank_and_courier_charges"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
      </div>
      <div className="w-1/2">
        <Form.Item
          label="EDF Contribution for Spouse"
          name="edf_bution_for_spouse"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="EDF Contribution for Additional Dependents <18yrs"
          name="edf_bution_for_add_depn_ls_than_eighteen"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Gov't Processing Fee (Per Individual)"
          name="govt_processing_fee"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Due Diligence Fee for Spouse"
          name="due_dil_fee_for_spouse"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label={`Due Diligence Fee for Dependents \u226516yrs`}
          name="due_dil_fee_for_additional_depn_gt_than_or_eq_sixteen"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Certificate of Naturalization Fee"
          name="govt_certificate_of_naturalization_fee"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Gov't Expedited Passport Issuance Fee "
          name="govt_expedited_passport_issuance_fee"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Local Agent Fee"
          name="local_agent_fee"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
      </div>
    </div>
  );
};

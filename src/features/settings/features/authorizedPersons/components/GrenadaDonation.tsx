import { Form, InputNumber } from "antd";
import { generalValidationRules } from "src/utils/formHelpers/validations";

// govt ntf > 55 ??

export const GrenadaDonation = () => {
  return (
    <div className="flex gap-8">
      <div className="w-1/2">
        <Form.Item
          label={`Gov't NTF Contribution for Family \u22644`}
          name="govt_ntf_bution_for_family_ls_than_eq_four"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Gov't NTF Contribution for Additional Dependents"
          name="govt_ntf_bution_for_add_depn"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Gov't NTF Contribution for Parents < 55"
          name="govt_ntf_bution_for_parents_ls_than_fifty_five"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Gov't NTF Application Fee"
          name="govt_ntf_application_fee"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          label="Gov't Due Diligence Fee for Spouse"
          name="govt_due_dil_fee_for_spouse"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label=" Gov't Due Diligence Fee for Dependents 17yrs - 25yrs"
          name="govt_due_dil_fee_for_depn_seventeen_to_twenty_five"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Gov't  Processing for Spouse"
          name="govt_prc_fee_for_spouse"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>

        <Form.Item
          label="Gov't Passport & Oath of Allegiance Fee"
          name="govt_passport_and_oath_of_allegiance_fee"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Local Agent Fee + VAT"
          name="local_agent_fee_and_vat"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Legal & Advisory Fee"
          name="legal_advisory_fee"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
      </div>
      <div className="w-1/2">
        <Form.Item
          label="Gov't Spouseless Fee"
          name="govt_spouseless_fee"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>

        <Form.Item
          label="Gov't  NTF Contribution for Parents < 55"
          name="govt_ntf_bution_for_parents_gt_than_fifty_five"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Gov't NTF Contribution for Unmarried Siblings"
          name="govt_ntf_bution_for_unmarried_siblings"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Gov't Due Diligence for Main Applicant"
          name="govt_due_dil_fee_for_main_applicant"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label={`Gov't  Processing for Additional Dependents \u226416yrs`}
          name="govt_prc_fee_for_add_depn_ls_than_eq_sixteen"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label={`Gov't  Processing for Additional Dependents \u226517yrs`}
          name="govt_prc_fee_for_add_depn_gt_than_seventeen"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Gov't Processing for Main Applicant"
          name="govt_prc_fee_for_main_applicant"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label={`Gov't  Due Diligence for Additional Dependents \u226416yrs`}
          name="govt_due_dil_fee_for_depn_ls_than_or_eq_to_sixteen"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>

        <Form.Item
          label="Grenada Bank Fees"
          name="grenada_bank_fees"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
      </div>
    </div>
  );
};

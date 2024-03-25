import { Form, InputNumber } from "antd";
import { generalValidationRules } from "src/utils/formHelpers/validations";

export const AntiguaBarbacudaDonationQuestions = () => {
  return (
    <div className="flex gap-8">
      <div className="w-1/2">
        {/* <Form.Item
          label="Contribution Fee for Applicants"
          name="bution_fee_for_applicants"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item> */}
        <Form.Item
          label={`Contribution Fee for Applicant Family \u22644`}
          name="bution_fee_for_applicants_ls_than_eq_to_four"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label={`Contribution Fee for Applicant Family Equal To 5`}
          name="bution_fee_for_applicants_eq_to_five"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label={`Contribution Fee for Applicant Family  \u22646`}
          name="bution_fee_for_applicants_gt_than_eq_to_six"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Gov't Processing Fee for Additional Dependents (For family > 4)"
          name="govt_prc_fee_for_family_gt_than_four"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Due Diligence Fee for Spouse"
          name="due_dil_for_spouse"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Due Diligence Fee for Dependent 12-17 years "
          name="due_dil_for_depn_twelve_to_seventeen"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Due Diligence Fee for Parent >58 years "
          name="due_dil_for_depn_gt_than_fifty_eight"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          rules={generalValidationRules}
          label="Bank & Escrow Fee "
          name="bank_and_escrow_fee"
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Legal & Advisory Fee "
          name="legal_and_advisory_fee"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Local Agent + VAT Fee "
          name="local_agent_fee_and_vat"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
      </div>
      <div className="w-1/2">
        <Form.Item
          label="Gov't Processing Fee for Family of 4"
          name="govt_prc_fee_for_family_of_four"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Due Diligence Fee for Main Applicant"
          name="due_dil_for_main_applicant"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Due Diligence Fee for Dependent 0-11 years "
          name="due_dil_for_depn_zero_to_eleven"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Due Diligence Fee for Dependent >18 years "
          name="due_dil_for_depn_gt_than_eighteen"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Gov't Passport & Oath of Allegiance Fee "
          name="goverment_passport_and_oath_of_allegiance_fee"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
      </div>
    </div>
  );
};

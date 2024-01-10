import { Form, InputNumber } from "antd";
import { generalValidationRules } from "src/utils/formHelpers/validations";
          
export const GrenadaRealEstate = () => {
  return (
    <div className="flex gap-8">
      <div className="w-1/2">
        <Form.Item
          label="Real Estate Investment for Family"
          name="real_estate_investment_for_family"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          label="Gov't Fee for Family of 4"
          name="govt_fee_for_family_of_four"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          label="Gov't Fee for Parents < 55"
          name="govt_fee_for_parents_ls_than_fifty_five"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          label="Gov't Fee for Unmarried Siblings"
          name="govt_fee_for_unmarried_siblings"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          label="Due Diligence Fee for Main Applicant"
          name="due_dil_fee_for_main_applicant"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          label={`Grenada Gov't Due Diligence Fee for Additional Dependents \u226416yrs`}
          name="due_dil_fee_for_add_depn_ls_than_or_eq_sixteen"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          label={`Grenada Gov't Due Diligence Fee for Additional Dependents \u226417yrs`}
          name="due_dil_fee_for_add_depn_gt_than_seventeen"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          label="Gov't  Processing for Main Applicant"
          name="govt_prc_fee_for_main_applicant"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          label="Gov't  Processing for Additional Dependents >16yrs"
          name="govt_prc_fee_for_add_dep_gt_than_sixteen"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          label="Gov't Passport & Oath of Allegiance Fee"
          name="govt_passport_and_oath_of_allegiance_fee"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          label="Local Agent Fee + VAT"
          name="local_agent_fee_and_vat"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
      </div>
      <div className="w-1/2">
        <Form.Item
          label="Gov't Spouseless Fee"
          name="govt_sposeless_fee"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          label="Gov't Fee for Additional Children"
          name="govt_fee_for_additional_children"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          label="Gov't  Fee for Parents > 55"
          name="govt_fee_for_parents_gt_than_fifty_five"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          label="Gov't  Application Fee "
          name="govt_application_fee"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          label="Due Diligence Fee for Spouse"
          name="due_dil_fee_for_spouse"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          label="Due Diligence Fee for Dependents >16yrs"
          name="due_dil_fee_for_add_depn_gt_than_sixteen"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          label="Gov't Processing for Spouse"
          name="govt_prc_fee_for_spouse"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>

        <Form.Item
          label={`Gov't Processing for Additional Dependents \u226416yrs`}
          name="govt_prc_fee_for_add_dep_ls_than_or_eq_sixteen"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          label="Bank Escrow Management Fees"
          name="bank_escrow_management_fee"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          label="Legal & Advisory Fee"
          name="legal_advisory_fee"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
      </div>
    </div>
  );
};

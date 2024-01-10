import { Form, InputNumber, } from "antd";
import { generalValidationRules } from "src/utils/formHelpers/validations";

export const StLuciaNefiRealEstate = () => {
  return (
    <div className="flex gap-8">
      <div className="w-1/2">
        <Form.Item
          label="NEFI Contribution for Main Applicant"
          name="nefi_bution_for_main_applicant"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          label="NEFI Contribution for Additional Dependents (if there's a spouse, maximum of 2)"
          name="nefiContributionAdditionalDependentSpouse"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          label="NEFI Contribution for Additional Dependents (if there's a spouse)"
          name="nefi_bution_for_add_depn"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          label="NEFI Contribution for Additional Dependents (if there's no spouse)"
          name="nefi_bution_for_add_depn_no_spouse"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          label="Gov't Processing Fee for Spouse"
          name="govt_prc_fee_for_spouse"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          label="Gov't Due Diligence Fee for Main Applicant"
          name="govt_due_dil_fee_for_main_applicant"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          label=" Gov't Due Diligence Fee for Dependents >16yrs"
          name="govt_due_dil_fee_for_depn_gt_than_sixteen"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item label="Legal & Advisory Fee" name="legal_and_advisory_fee"  rules={generalValidationRules}>
        <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item label="Passport Fee" name="passport_fee"  rules={generalValidationRules}>
        <InputNumber className="w-full" />
        </Form.Item>
      </div>
      <div className="w-1/2">
        <Form.Item
          label="NEFI Contribution for Spouse"
          name="nefi_bution_for_spouse"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          label="NEFI Contribution for More Dependents (if there's a spouse and 2 additonal dependents)"
          name="nefi_bution_for_more_depn"
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
          label="Gov't  Processing Fee for Additional Dependents"
          name="govt_prc_fee_for_add_depn"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>

        <Form.Item
          label="Gov't Due Diligence for Spouse"
          name="govt_due_dil_fee_for_spouse"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item
          label="Gov't Due Diligence for Dependents <16"
          name="govt_due_dil_fee_for_depn_ls_than_sixteen"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <Form.Item label="Local Agent + VAT Fee" name="local_agent_and_vat_fee"  rules={generalValidationRules}>
        <InputNumber className="w-full" />
        </Form.Item>
      </div>
    </div>
  );
};

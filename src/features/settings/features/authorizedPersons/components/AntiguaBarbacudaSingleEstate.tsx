import { Form, InputNumber } from "antd";
import { generalValidationRules } from "src/utils/formHelpers/validations";

export const AntiguaBarbacudaSingleEstate = () => {
  return (
    <div className="flex gap-8">
      <div className="w-1/2">
        <Form.Item
          label="Real Estate Investment Fee"
          name="real_estate_investment_fee"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Gov't Processing Fee For Family of 4"
          name="govt_prc_fee_for_family_of_four"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Gov't Processing Fee For Family Greater Than 4"
          name="govt_prc_fee_for_family_gt_than_four"
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
          label="Due Diligence Fee for Spouse"
          name="due_dil_for_spouse"
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
          label="Due Diligence Fee for Dependent 12-17 years "
          name="due_dil_for_depn_twelve_to_seventeen"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Due Diligence Fee for Dependent Greater Than 18 years "
          name="due_dil_for_depn_gt_than_eighteen"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Due Diligence Fee for Dependent >58 years "
          name="due_dil_for_depn_gt_than_fifty_eight"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
      </div>
      <div className="w-1/2">
        <Form.Item
          label="Gov't Passport & Oath of Allegiance Fee "
          name="goverment_passport_and_oath_of_allegiance_fee"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Land Transfer Tax"
          name="land_transfer_tax"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Bank & Escrow Fee "
          name="bank_and_escrow_fee"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
        <Form.Item
          label="Legal & AdvisoryFee "
          name="legal_and_advisory_fee"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$" />
        </Form.Item>
      </div>
    </div>
  );
};

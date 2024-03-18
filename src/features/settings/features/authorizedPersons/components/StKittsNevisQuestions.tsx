import { Form, InputNumber } from "antd";
import { generalValidationRules } from "src/utils/formHelpers/validations";

export const StKittsNevisQuestions = () => {


  return (
    <div className="flex gap-8">
      <div className="w-1/2">
        <Form.Item
          label="SGF Donation for Principal Applicant"
          name="sgf_dona_for_principal_applicant"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$"/>
        </Form.Item>
        <Form.Item
          label="SGF Donation for Family of 4 (PA + Spouse + 2 dependents OR PA + any 3 dependents)"
          name="sgf_dona_for_family_of_four"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$"/>
        </Form.Item>
        <Form.Item
          label="SGF Donation Application Fee (Per Individual)"
          name="sgf_dona_application_fee"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$"/>
        </Form.Item>
        <Form.Item
          label="Due Diligence & Processing Fees for Spouse"
          name="due_dil_and_prc_fee_for_spouse"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$"/>
        </Form.Item>
        <Form.Item
          label="Due Diligence Fee for Children 16-18"
          name="due_dil_and_prc_fee_for_children_sixteen_to_eighteen"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full"prefix="$"/>
        </Form.Item>
        <Form.Item
          label="Due Diligence Fee for Parents 65+"
          name="due_dil_and_prc_fee_for_parents_gt_than_or_eq_sixty_five"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$"/>
        </Form.Item>
        <Form.Item
          label="Due Diligence Fee for  Siblings 0-15"
          name="due_dil_and_prc_fee_for_siblings_zero_to_fifteen"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$"/>
        </Form.Item>
        <Form.Item
          label="Due Diligence Fee for  Siblings 15+"
          name="due_dil_and_prc_fee_for_siblings_gt_than_or_eq_fifteen"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$"/>
        </Form.Item>
        <Form.Item
          label="Gov't Passport & Oath of Allegiance Fee "
          name="govt_passport_and_oath_of_allegiance_fee"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$"/>
        </Form.Item>
        <Form.Item
          label="Bank Due Diligence & Processing Fees for Principal Applicant"
          name="bank_due_dil_fee_for_principal_applicant"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$"/>
        </Form.Item>
        <Form.Item
          label="Bank Due Diligence & Processing Fees for Dependents <15yrs old"
          name="bank_due_dil_fee_for_depn_ls_than_fifteen"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$"/>
        </Form.Item>
        <Form.Item
          label="Legal & Advisory Fees"
          name="legal_advisory_fee"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$"/>
        </Form.Item>
      </div>
      <div className="w-1/2">
        <Form.Item
          label="SGF Donation for Spouse/Other Dependent"
          name="sgf_dona_for_spouse_or_other_dependent"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$"/>
        </Form.Item>
        <Form.Item
          label="SGF Donation for Additional Dependents <18yrs (Per Individual)"
          name="sgf_dona_for_additional_dependents_ls_than_eighteen"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$"/>
        </Form.Item>
        <Form.Item
          label="SGF Donation for Additional Dependents >18yrs (Per Individual)"
          name="sgf_dona_for_additional_dependents_gt_than_eighteen"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$"/>
        </Form.Item> 
        <Form.Item
          label="Due Diligence & Processing Fees for Main Applicant"
          name="due_dil_and_prc_fee_for_main_applicant"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$"/>
        </Form.Item>
        <Form.Item
          label="Due Diligence & Processing Fees for Children 0-15"
          name="due_dil_and_prc_fee_for_children_zero_to_fifteen"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$"/>
        </Form.Item>
        <Form.Item
          label="Due Diligence & Processing Fees for Children 18+"
          name="due_dil_and_prc_fee_for_children_gt_than_eighteen"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$"/>
        </Form.Item>
        <Form.Item
          label="Due Diligence & Processing Fees for Grandparents 55+"
          name="due_dil_and_prc_fee_for_grand_parents_gt_than_or_eq_fifty_five"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$"/>
        </Form.Item>
        <Form.Item
          label="FedEx Courier + Bank Transfer Fee"
          name="courier_fee_and_bank_transfer_fee"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full"prefix="$"/>
        </Form.Item>
        <Form.Item
          label="Bank Due Diligence & Processing Fees for  Spouse"
          name="bank_due_dil_fee_for_spouse"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$"/>
        </Form.Item>
        <Form.Item
          label="Bank Due Diligence & Processing Fees for Dependents >15yrs old"
          name="bank_due_dil_fee_for_depn_gt_than_fifteen"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$"/>
        </Form.Item>
        <Form.Item
          label="Local Agent Fee + VAT"
          name="local_agent_fee_and_vat"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" prefix="$"/>
        </Form.Item>
      </div>
    </div>
  );
};

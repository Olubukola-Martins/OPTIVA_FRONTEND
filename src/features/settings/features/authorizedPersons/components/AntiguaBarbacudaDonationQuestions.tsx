import { Form, Input, Select } from "antd";

export const AntiguaBarbacudaDonationQuestions = () => {
  const currency = (
    <Select
      options={[
        { value: "USD", label: "USD" },
        { label: "Naira", value: "Naira" },
      ]}
      defaultValue="USD"
    />
  );
  return (
    <div className="flex gap-8">
      <div className="w-1/2">
        <Form.Item
          label="Contribution Fee for Applicants"
          name="contributionFeeApplicants"
          required
        >
          <Input  addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Gov't Processing Fee for Additional Dependents (For family > 4)"
          name="govtProcessingFeeMoreThanFour"
          required
        >
          <Input addonAfter={currency}  />
        </Form.Item>
        <Form.Item
          label="Due Diligence Fee for Spouse"
          name="spouseDueDiligence"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Due Diligence Fee for Dependent 12-17 years "
          name="dependentDueDiligenceTeen"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Due Diligence Fee for Parent >58 years "
          name="parentDueDiligence"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item label="Bank & Escrow Fee " name="bankEscrowFee " required>
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Legal & AdvisoryFee "
          name="legalAdvisoryFee "
          required
        >
          <Input  addonAfter={currency} />
        </Form.Item>
      </div>
      <div className="w-1/2">
        <Form.Item
          label="Gov't Processing Fee for Family of 4"
          name="govtProcessingFeeFour"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Due Diligence Fee for Main Applicant"
          name="dueDiligenceApplicant"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Due Diligence Fee for Dependent 0-11 years "
          name="dependentDueDiligenceChild"
          required
        >
          <Input  addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Due Diligence Fee for Dependent >18 years "
          name="dependentDueDiligenceAdult"
          required
        >
          <Input  addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Gov't Passport & Oath of Allegiance Fee "
          name="gov'tPassportOath"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        
      </div>
    </div>
  );
};

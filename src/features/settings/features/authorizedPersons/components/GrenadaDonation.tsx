import { Form, Input, Select } from "antd";

export const GrenadaDonation = () => {
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
          label="Gov't NTF Contribution for Family < 4"
          name="govtNTFFamilyFour"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Gov't NTF Contribution for Additional Dependents"
          name="govtNTFAdditionalDependent"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Gov't NTF Contribution for Parents < 55"
          name="govtNTFParents"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Gov't NTF Application Fee"
          name="govtNTFApplicationFee"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Gov't Due Diligence Fee for Spouse"
          name="govtDueDiligenceSpouse"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label=" Gov't Due Diligence Fee for Dependents 17yrs-25yrs"
          name="govtDependentDueDiligenceDependents"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Gov't  Processing for Spouse"
          name="govtProcessingSpouse"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Gov't  Processing for Additional Dependents >16yrs"
          name="govtProcessingDependentSixteen"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Gov't Passport & Oath of Allegiance Fee"
          name="govtPassportOath"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item label="Local Agent Fee + VAT" name="localAgentFee" required>
          <Input addonAfter={currency} />
        </Form.Item>
      </div>
      <div className="w-1/2">
        <Form.Item label="Gov't Spouseless Fee" name="govtSpouseless" required>
          <Input addonAfter={currency} />
        </Form.Item>

        <Form.Item
          label="Gov't  NTF Contribution for Parents < 55"
          name="govtNTFParent"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Gov't NTF Contribution for Unmarried Siblings"
          name="govtNTFUnmarriedSiblings"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Gov't Due Diligence for Main Applicant"
          name="govtDueDiligenceApplicant"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Gov't Due Diligence Fee for <16yrs"
          name="govttDueDiligenceSixteen"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Gov't Processing for Main Applicant"
          name="gov'tProcessingApplicant"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Gov't Processing forAdditional Dependent <16yrs"
          name="govtProcessingAdditionalDependentSixteen"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
      
        <Form.Item
          label="Grenada Bank Fees"
          name="grenadaBankFee"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Legal & Advisory Fee"
          name="localAdvisoryFee"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
      </div>
    </div>
  );
};

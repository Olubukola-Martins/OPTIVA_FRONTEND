import { Form, Input, Select } from "antd";

export const StLuciaNefiRealEstate = () => {
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
          label="NEFI Contribution for Main Applicant"
          name="nefiContributionApplicant"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="NEFI Contribution for Additional Dependents (if there's a spouse, maximum of 2)"
          name="nefiContributionAdditionalDependentSpouse"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="NEFI Contribution for Additional Dependents (if there's no spouse)"
          name="nefiContributionAdditionalDependent"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Gov't Processing Fee for Spouse"
          name="govtProcessingFeeSpouse"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Gov't Due Diligence Fee for Main Applicant"
          name="govtDueDiligenceApplicant"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label=" Gov't Due Diligence Fee for Dependents >16yrs"
          name="govtDependentDueDiligenceSixteen"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item label="Passport Fee" name="passportFee" required>
          <Input addonAfter={currency} />
        </Form.Item>
      </div>
      <div className="w-1/2">
        <Form.Item
          label="NEFI Contribution for Spouse"
          name="nefiContributionSpouse"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="NEFI Contribution for More Dependents (if there's a spouse and 2 additonal dependents)"
          name="nefiContributionMoreDependent"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Gov't  Processing for Main Applicant"
          name="govtProcessingApplicant"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Gov't  Processing Fee for Additional Dependents"
          name="govtProcessingFeeAdditionalDependents"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>

        <Form.Item
          label="Gov't Due Diligence for Spouse"
          name="govtDueDiligenceSpouse"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Gov't Due Diligence for Dependents <16"
          name="govtDueDiligenceDependentSixteen"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
      </div>
    </div>
  );
};

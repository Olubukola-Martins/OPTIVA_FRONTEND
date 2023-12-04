import { Form, Input, Select } from "antd";

export const GrenadaRealEstate = () => {
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
          label="Real Estate Investment for Family"
          name="realEstateInvestmentFamily"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Gov't Fee for Family of 4"
          name="govtFeeFamilyFour"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Gov't Fee for Parents < 55"
          name="govtFeeParents"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Gov't Fee for Unmarried Siblings"
          name="govtFeeUnmarriedSiblings"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Due Diligence Fee for Main Applicant"
          name="applicantDueDiligence"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Grenada Gov't Due Diligence Fee for Additional Dependents <16yrs"
          name="grenadaGovtDependentDueDiligence"
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
          label="Gov't Fee for Additional Children"
          name="govtFeeAdditionalChildren"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Gov't  Fee for Parents > 55"
          name="govtFeeParent"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Gov't  Application Fee "
          name="govtApplicationFee"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Due Diligence Fee for Spouse"
          name="dependentDueDiligenceSpouse"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Due Diligence Fee for Dependents >16yrs"
          name="dependentDueDiligenceDependentsSixteen"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Gov't Processing for Spouse"
          name="govtProcessingSpouse"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Gov't Processing for Additional Dependents <16yrs"
          name="govtProcessingAdditionalDependent"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Bank Escrow Management Fees"
          name="bankEscrowFee"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Local & Advisory Fee"
          name="localAdvisoryFee"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
      </div>
    </div>
  );
};

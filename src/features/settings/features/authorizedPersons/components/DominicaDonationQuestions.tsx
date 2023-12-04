import { Input, Form, Select } from "antd";

export const DominicaDonationQuestions = () => {
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
          label="EDF Contribution for Applicant"
          name="edfContributionFeeApplicants"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="EDF Contribution for Family of 4"
          name="edfContributionFeeFamilyFour"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="EDF Contribution for Additonal Dependents >18yrs"
          name="edfContributionFeeEighteen"
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
          label="Due Diligence Fee for Dependents <16yrs"
          name="dependentDueDiligence"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item label="Legal Fees (Flat Fee)" name="legalFlatFee" required>
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Gov't  Passport Issuance Fee"
          name="govtPassportIssuanceFee"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Bank + Courier Charges"
          name="bankCourierCharges"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
      </div>
      <div className="w-1/2">
        <Form.Item
          label="EDF Contribution for Spouse"
          name="edfContributionSpouse"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="EDF Contribution for Additional Dependents <18yrs"
          name="edfContributionAdditionalDependent"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Gov't Processing Fee (Per Individual)"
          name="govtProcessingFeeIndividual"
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
          label="Certificate of Naturalization Fee"
          name="certificateNaturalization"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Gov't Expedited Passport Issuance Fee "
          name="gov'tExpedietedPasspor"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item label="Local Agent Fee" name="localAgentFee" required>
          <Input addonAfter={currency} />
        </Form.Item>
      </div>
    </div>
  );
};

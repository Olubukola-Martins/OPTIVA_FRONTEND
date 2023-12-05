import { Form, Input, Select } from "antd";

export const StKittsNevisQuestions = () => {
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
          label="SGF Donation for Principal Applicant"
          name="sgfDonationApplicant"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="SGF Donation for Family of 4 (PA + Spouse + 2 dependents OR PA + any 3 dependents)"
          name="sgfDonationFamilyFour"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="SGF Donation Application Fee (Per Individual)"
          name="sgfDonationIndividual"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Due Diligence & Processing Fees for Spouse"
          name="dueDiligenceSpouse"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Due Diligence Fee for Children 16-18"
          name="childrenDueDiligence"
          required
        >
          <Input addonAfter={currency} />
          <Form.Item
            label="Due Diligence Fee for Parents 65+"
            name="parentDueDiligence"
            required
          >
            <Input addonAfter={currency} />
          </Form.Item>
        </Form.Item>
        <Form.Item
          label="Due Diligence Fee for  Siblings 0-15"
          name="siblingsDueDiligence"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Gov't Passport & Oath of Allegiance Fee "
          name="gov'tPassportOath"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Bank Due Diligence & Processing Fees for Principal Applicant"
          name="bankDueDiligenceApplicant"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Bank Due Diligence & Processing Fees for Dependents <15yrs old"
          name="bankDueDiligenceDependentFifteen"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Legal & Advisory Fees"
          name="legalAdvisoryFee"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
      </div>
      <div className="w-1/2">
        <Form.Item
          label="SGF Donation for Spouse/Other Dependent"
          name="sgfDonationSpouse"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="SGF Donation for Additional Dependents <18yrs (Per Individual)"
          name="sgfDonationAdditionalDependent"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Due Diligence & Processing Fees for Main Applicant"
          name="applicantDueDiligenceProcessing"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Due Diligence & Processing Fees for Children 0-15"
          name="childrenDueDiligenceProcessing"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Due Diligence & Processing Fees for Children 18+"
          name="childrenDueDiligenceProcessingEighteen"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Due Diligence & Processing Fees for Grandparents 55+"
          name="grandparentsDueDiligenceProcessing"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="FedEx Courier + Bank Transfer Fee"
          name="fedExCourierFee"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item
          label="Bank Due Diligence & Processing Fees for  Spouse"
          name="bankSpouseDueDiligenceProcessing"
          required
        >
          <Input addonAfter={currency} />
              </Form.Item>
              <Form.Item
          label="Bank Due Diligence & Processing Fees for Dependents >15yrs old"
          name="bankDependentDueDiligenceProcessing"
          required
        >
          <Input addonAfter={currency} />
        </Form.Item>
        <Form.Item label="Local Agent Fee + VAT" name="localAgentFee" required>
          <Input addonAfter={currency} />
        </Form.Item>
      </div>
    </div>
  );
};

import { Input, Select, Form } from "antd";
import React from "react";

export const ProgramFeesBreakdown = () => {
  const addOnAfter = (
    <Select options={[{ value: "%", label: "%" }]} defaultValue="%" />
  );
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
    <div className="border rounded-lg p-5">
      <Form layout="vertical">
        <div className="flex gap-8">
          <div className="w-1/2">
            <Form.Item
              label="Finance Fee for Applicants"
              name="FinanceFeeApplicants"
              required
            >
              <Input size="large" addonAfter={currency} />
            </Form.Item>
            <Form.Item
              label="Gov't Processing Fee for Additional Dependents (For family > 4)"
              name="govtProcessingFeeMoreThanFour"
              required
            >
              <Input addonAfter={currency} size="large" />
            </Form.Item>
            <Form.Item
              label="Due Diligence Fee for Spouse"
              name="spouseDueDiligence"
              required
            >
              <Input size="large" addonAfter={currency} />
            </Form.Item>
            <Form.Item
              label="Due Diligence Fee for Dependent 12-17 years "
              name="dependentDueDiligenceTeen"
              required
            >
              <Input size="large" addonAfter={currency} />
            </Form.Item>
            <Form.Item
              label="Due Diligence Fee for Parent >58 years "
              name="parentDueDiligence"
              required
            >
              <Input size="large" addonAfter={currency} />
            </Form.Item>
            <Form.Item
              label="Bank & Escrow Fee "
              name="bankEscrowFee "
              required
            >
              <Input size="large" addonAfter={currency} />
            </Form.Item>
            <Form.Item
              label="Legal & AdvisoryFee "
              name="legalAdvisoryFee "
              required
            >
              <Input size="large" addonAfter={currency} />
            </Form.Item>
          </div>
          <div className="w-1/2">
            <Form.Item
              label="Gov't Processing Fee for Family of 4"
              name="govtProcessingFeeFour"
              required
            >
              <Input size="large" addonAfter={currency} />
            </Form.Item>
            <Form.Item
              label="Due Diligence Fee for Main Applicant"
              name="dueDiligenceApplicant"
              required
            >
              <Input size="large" addonAfter={currency} />
            </Form.Item>
            <Form.Item
              label="Due Diligence Fee for Dependent 0-11 years "
              name="dependentDueDiligenceChild"
              required
            >
              <Input size="large" addonAfter={currency} />
            </Form.Item>
            <Form.Item
              label="Due Diligence Fee for Dependent >18 years "
              name="dependentDueDiligenceAdult"
              required
            >
              <Input size="large" addonAfter={currency} />
            </Form.Item>
            <Form.Item
              label="Gov't Passport & Oath of Allegiance Fee "
              name="gov'tPassportOath"
              required
            >
              <Input size="large" addonAfter={currency} />
            </Form.Item>
            <Form.Item
              label="Local Agent Fee + VAT "
              name="localAgentFee"
              required
            >
              <Input size="large" addonAfter={currency} />
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

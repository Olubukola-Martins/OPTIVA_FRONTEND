import { Form, Input, Select } from "antd";

export const NewImmigrationAndCourtProceedings = () => {
  return (
    <>
      <div className=" justify-center p-4 lg:gap-10 w-full">
        <div className="flex flex-col lg:flex-row lg:gap-10">
          <div className="lg:w-1/2">
            <div>
              <h2 className="p-1">
                Have you or your spouse ever been deported or subject to
                deportation from any country? If yes, please explain
              </h2>
              <Form.Item name="deported" className="w-full" required>
                <Input.TextArea rows={2} />
              </Form.Item>
            </div>
            <div>
              <h2 className="p-1">
                Have you or your spouse ever applied for an immigrant
                (citizenship) and been denied? If yes, please explain"
              </h2>
              <Form.Item name="appliedImmigration" className="w-full" required>
                <Input.TextArea rows={2} />
              </Form.Item>
            </div>
            <div>
              <h2 className="p-1">
                Have you or your spouse ever applied for a non-immigrant,
                non-tourist visa and been denied? If yes, please explain
              </h2>
              <Form.Item name="nonTouristDenied" className="w-full" required>
                <Input.TextArea rows={2} />
              </Form.Item>
            </div>
            <div>
              <h2 className="p-1">
                Have you ever been refused admission into a country at a port of
                entry? If “Yes”, please provide a detailed explanation
              </h2>
              <Form.Item name="refusedAdmission" className="w-full" required>
                <Input.TextArea rows={2} />
              </Form.Item>
            </div>
            <div>
              <h2 className="p-1">
                The Applicant has had a UK/US/Schengen/Canada Visa revoked
              </h2>
              <Form.Item name="revokedVisa" className="w-full" required>
                <Select
                  size="large"
                  options={[
                    {
                      value: "Yes",
                      label: "Yes",
                    },
                  ]}
                />
              </Form.Item>
            </div>
            <div>
              <h2 className="p-1">
                The Applicant has been unlawfully present in any country?
              </h2>
              <Form.Item name="unlawfullyPresent" className="w-full" required>
                <Select
                  size="large"
                  options={[
                    {
                      value: "Yes",
                      label: "Yes",
                    },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div>
              <h2 className="p-1">
                The Applicant has been banned from any country? If yes, name
                countries
              </h2>
              <Form.Item name="bannedCountry" className="w-full" required>
                <Input.TextArea rows={2} />
              </Form.Item>
            </div>
            <div>
              <h2 className="p-1">
                The Applicant has been the subject of a deportation or a
                deportation hearing?
              </h2>
              <Form.Item name="deportationSubject" className="w-full" required>
                <Select
                  size="large"
                  options={[
                    {
                      value: "Yes",
                      label: "Yes",
                    },
                  ]}
                />
              </Form.Item>
            </div>
            <div>
              <h2 className="p-1">
                The Applicant wants employer to know about their application
              </h2>

              <Form.Item name="employerKnow" className="w-full" required>
                <Select
                  size="large"
                  options={[
                    {
                      value: "Yes",
                      label: "Yes",
                    },
                  ]}
                />
              </Form.Item>
            </div>
            <div>
              <h2 className="p-1">
                The Applicant wants spouse to know about their application
              </h2>
              <Form.Item name="spouseKnow" className="w-full" required>
                <Select
                  size="large"
                  options={[
                    {
                      value: "Yes",
                      label: "Yes",
                    },
                  ]}
                />
              </Form.Item>
            </div>
            <div>
              <h2 className="p-1">The Applicant has BVN and NIN </h2>
              <Form.Item name="bvnAndNin" className="w-full" required>
                <Select
                  size="large"
                  options={[
                    {
                      value: "Yes",
                      label: "Yes",
                    },
                  ]}
                />
              </Form.Item>
            </div>
            <div>
              <h2 className="p-1">The Applicant has Tax ID number (TIN)</h2>
              <Form.Item name="tin" className="w-full" required>
                <Select
                  size="large"
                  options={[
                    {
                      value: "Yes",
                      label: "Yes",
                    },
                  ]}
                />
              </Form.Item>
            </div>
            <div>
              <h2 className="p-1">The Applicant has a current a passport</h2>
              <Form.Item name="currentPassport" className="w-full" required>
                <Select
                  size="large"
                  options={[
                    {
                      value: "Yes",
                      label: "Yes",
                    },
                  ]}
                />
              </Form.Item>
            </div>
            <div>
              <h2 className="p-1">The Applicant has a bank account </h2>
              <Form.Item name="bankAccount" className="w-full" required>
                <Select
                  size="large"
                  options={[
                    {
                      value: "Yes",
                      label: "Yes",
                    },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import { Input, Form } from "antd";

export const NewCriminalHistory = () => {
  return (
    <>
      <div className=" justify-center p-4 lg:gap-10 w-full">
        <div className="flex flex-col lg:flex-row lg:gap-10">
          <div className="lg:w-1/2">
            <div>
              <h2 className="p-1">
                The Applicant or spouse ever been convicted of a crime in any
                country? If yes, please explain
              </h2>
              <Form.Item name="convictedCrime" className="w-full" required>
                <Input.TextArea rows={2} />
              </Form.Item>
            </div>
            <div>
              <h2 className="p-1">
                The Applicant or spouse ever been charged with or arrested for a
                crime in any country? If yes, please explain
              </h2>

              <Form.Item name="arrested" className="w-full" required>
                <Input.TextArea rows={2} />
              </Form.Item>
            </div>
            <div>
              <h2 className="p-1">
                Has the Applicant, a family member or a business partner been
                tried or convicted of money laundering charges? If “Yes”, please
                explain
              </h2>
              <Form.Item name="moneyLaundering" className="w-full" required>
                <Input.TextArea rows={2} />
              </Form.Item>
            </div>
            <div>
              <h2 className="p-1">
                The Applicant or spouse ever committed a criminal or civil
                offence for which you were convicted and sentenced to detention,
                probation or a term of imprisonment? If “Yes”, please explain
              </h2>
              <Form.Item name="civilOffence" className="w-full" required>
                <Input.TextArea rows={2} />
              </Form.Item>
            </div>
            <div>
              <h2 className="p-1">
                The Applicant or spouse ever testified before a grand jury or
                investigative hearing or probe? If “Yes”, please explain
              </h2>{" "}
              <Form.Item name="testify" className="w-full" required>
                <Input.TextArea rows={2} />
              </Form.Item>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div>
              <h2 className="p-1">
                The Applicant or your spouse ever received a pardon for any
                criminal offence? If yes, please explain and include the date,
                city, county, state & country in which you received your pardon
              </h2>
              <Form.Item name="criminalPardon" className="w-full" required>
                <Input.TextArea rows={2} />
              </Form.Item>
            </div>
            <div>
              <h2 className="p-1">
                The Applicant or spouse ever been the subject of any criminal
                investigation? If “Yes”, please explain
              </h2>
              <Form.Item
                name="criminalInvestigation"
                className="w-full"
                required
              >
                <Input.TextArea rows={2} />
              </Form.Item>
            </div>
            <div>
              <h2 className="p-1">
                The Applicant Has been under investigation by a tax
                authority/professional regulatory body? If “Yes”, please explain
              </h2>
              <Form.Item name="underInvestigation" className="w-full" required>
                <Input.TextArea rows={2} />
              </Form.Item>
            </div>
            <div>
              <h2 className="p-1">
                Please explain any issues you feel are pertinent to your
                application
              </h2>
              <Form.Item name="pertinentIssue" className="w-full" required>
                <Input.TextArea rows={2} />
              </Form.Item>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

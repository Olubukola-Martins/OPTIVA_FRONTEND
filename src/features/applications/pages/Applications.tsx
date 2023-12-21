import { ApplicationsTab } from "../components/ApplicantDetails/ApplicationsTab";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { Form, Input, InputNumber, Modal, Select } from "antd";
import { Link } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";
import { ImportModal } from "src/components/modals/ImportModal";
import { ExportModal } from "src/components/modals/ExportModal";
import { useCreateApplication } from "../hooks/NewApplicationHooks/useCreateApplication";
import { useGetCountry } from "src/features/settings/features/program-types/hooks/useGetCountry";
import { useGetProgramType } from "src/features/settings/features/program-types/hooks/useGetProgramType";
import { useGetInvestmentRoute } from "src/features/settings/features/investment/hooks/useGetInvestmentRoute";
import { useFetchCurrentBranch } from "src/ExtraSettings/hooks/useFetchCurrentBranch";
import { QUERY_KEY_FOR_APPLICATIONS } from "../hooks/ApplicationHooks/useGetApplication";
import { openNotification } from "src/utils/notification";
import { useQueryClient } from "react-query";

const Applications = () => {
  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateApplication();
  const { data: countryData } = useGetCountry();
  const { data: programData } = useGetProgramType();
  const { data: investmentData } = useGetInvestmentRoute();
  const { data: branchData } = useFetchCurrentBranch();
  const queryClient = useQueryClient();

  console.log('current branch', branchData)

  const handleSubmit = (val: any) => {
    console.log("values", val);
    mutate(
      { branch_id: branchData?.id, ...val },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description: error.response.data.message,
            duration: 5,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICATIONS]);
          form.resetFields();
          // handleClose();
        },
      }
    );
  };
  // New Applications Modal
  const [openNewApplicationsModal, setOpenNewApplicationsModal] =
    useState(false);
  const showNewApplicationsModal = () => {
    setOpenNewApplicationsModal(true);
  };
  const handleNewApplicationsCancel = () => {
    setOpenNewApplicationsModal(false);
  };

  // Import Modal
  const [openImportModal, setOpenImportModal] = useState(false);
  const showImportModal = () => {
    setOpenImportModal(true);
  };
  const handleImportCancel = () => {
    setOpenImportModal(false);
  };

  // Upload Document
  const [exportModal, setExportModal] = useState(false);
  const showExportModal = () => {
    setExportModal(true);
  };
  const handleExportCancel = () => {
    setExportModal(false);
  };
  return (
    <>
      {/* New Applications Modal */}
      <Modal
        open={openNewApplicationsModal}
        onCancel={handleNewApplicationsCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleSubmit} form={form}>
          <div>
            <h1 className="p-4 font-bold text-center text-lg">
              Select Country/Program Type
            </h1>
            <div>
              <h2 className="py-1">
                Which country passport/residency is applicant applying for?
              </h2>
              <Form.Item required label="" name="country_id">
                <Select>
                  {countryData?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.country_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div>
              <h2 className="py-1">
                Which program is the applicant interested in?
              </h2>
              <Form.Item required name="programtype_id">
                <Select>
                  {programData?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.program_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div>
              <h2 className="py-1">
                Which investment route is the applicant interested in?
              </h2>
              <Form.Item required name="investmentroute_id">
                <Select>
                  {investmentData?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.investment_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div>
              <h2 className="py-1">Number of dependents</h2>
              <Form.Item required name="no_of_dependents" className="w-full">
                <InputNumber className="w-full" />
              </Form.Item>
            </div>
            <div>
              <h2>What is the applicant full name?</h2>
              <Form.Item name="full_name" required>
                <Input />
              </Form.Item>
            </div>
            <div>
              <h2>What is the applicant email?</h2>
              <Form.Item name="email_address" required>
                <Input />
              </Form.Item>
            </div>
            <div className="flex items-center justify-center gap-4 p-4">
               <AppButton
                type="reset"
                label="Cancel"
                variant="transparent"
                containerStyle="border border-secondary text-secondary"
              />
              {!isLoading ? (
                <Link to={appRoute.new_application}>
                  <AppButton label="Next" type="submit" />
                </Link>
              ) : (
                <AppButton label="Next" type="submit" isLoading={isLoading} />
              )}
              
            </div>
          </div>
        </Form>
      </Modal>
      {/* Import Modal */}
      <ImportModal
        open={openImportModal}
        onCancel={handleImportCancel}
        header="Application(s)"
      />
      {/* Export Modal */}
      <ExportModal
        header="Application(s)"
        open={exportModal}
        onCancel={handleExportCancel}
      />
      <div className=" flex flex-col md:flex-row justify-between p-3">
        <PageIntro
          title="Applicants (Operations) List"
          description="View & Edit Applicant Details"
          arrowBack={false}
        />
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Icon
              icon="uil:file-import"
              className="text-3xl cursor-pointer hover:text-primary"
              onClick={showImportModal}
            />
            <Icon
              icon="mingcute:file-import-line"
              className="text-3xl cursor-pointer hover:text-primary"
              onClick={showExportModal}
            />
          </div>
          <AppButton label="Add New" handleClick={showNewApplicationsModal} />
        </div>
      </div>

      <ApplicationsTab />
    </>
  );
};

export default Applications;

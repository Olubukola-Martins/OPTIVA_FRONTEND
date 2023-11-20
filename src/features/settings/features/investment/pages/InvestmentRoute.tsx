import { Icon } from "@iconify/react/dist/iconify.js";
import { Dropdown, Form, Input, Menu, Modal, Select } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { AddInvestment } from "../components/AddInvestment";
import { useState } from "react";
import { DeleteModal } from "src/components/modals/DeleteModal";
import { ImportModal } from "src/components/modals/ImportModal";
import { ExportModal } from "src/components/modals/ExportModal";

interface DataType {
  key: React.Key;
  sn: number;
  investmentName: string;
  country: string;
  fees: string;
  dateCreated: string;
  lastModified: string;
}

const InvestmentRoute = () => {
  const [addInvRoute, setAddInvRoute] = useState<boolean>(false);
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

  // Edit Dependent Modal
  const [openEditInvestmentModal, setOpenEditInvestmentModal] =
    useState<boolean>(false);
  const showEditInvestmentModal = () => {
    setOpenEditInvestmentModal(true);
  };
  const handleEditInvestmentModalCancel = () => {
    setOpenEditInvestmentModal(false);
  };
  const handleEditInvestmentSubmit = (val: any) => {};

  // Delete Modal
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const showDeleteModal = () => {
    setOpenDeleteModal(true);
  };
  const handleDeleteCancel = () => {
    setOpenDeleteModal(false);
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "SN",
      dataIndex: "sn",
    },
    {
      title: "Investment Name",
      dataIndex: "investmentName",
    },
    {
      title: "Country",
      dataIndex: "country",
    },
    {
      title: "Fees",
      dataIndex: "fees",
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
    },
    {
      title: "Last Modified",
      dataIndex: "lastModified",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, val) => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="1" onClick={showEditInvestmentModal}>
                  Edit
                </Menu.Item>
                <Menu.Item key="2" onClick={showDeleteModal}>
                  Delete
                </Menu.Item>
              </Menu>
            }
          >
            <i className="ri-more-2-fill text-lg cursor-pointer"></i>
          </Dropdown>
        </div>
      ),
    },
  ];
  const data: DataType[] = [];
  for (let i = 0; i < 6; i++) {
    data.push({
      key: i,
      sn: i + 1,
      investmentName: "Real Estate",
      country: "Grenada",
      fees: "fee",
      dateCreated: "dd/mm/yyyy",
      lastModified: "dd/mm/yyyy",
    });
  }
  return (
    <>
      <AddInvestment
        open={addInvRoute}
        handleClose={() => setAddInvRoute(false)}
      />
      <div className="flex justify-between flex-col md:flex-row md:items-center">
        <PageIntro
          title="Investment Routes"
          description="Create, View & edit investment routes on the system"
          linkBack={appRoute.settings}
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
          <AppButton label="Add New" handleClick={() => setAddInvRoute(true)} />
        </div>
      </div>

      <Table
        className="bg-white rounded-md shadow border mt-8"
        columns={columns}
        dataSource={data}
        scroll={{ x: 768 }}
      />

      {/* Import Modal */}
      <ImportModal
        header="Investment Routes"
        onCancel={handleImportCancel}
        open={openImportModal}
      />
      {/* Export Modal */}
      <ExportModal
        open={exportModal}
        onCancel={handleExportCancel}
        header="Investment Routes"
      />
      {/*EDIT DEPENDENT MODAL */}
      <Modal
        open={openEditInvestmentModal}
        footer={null}
        onCancel={handleEditInvestmentModalCancel}
      >
        <h2 className="text-center text-lg font-bold">Edit Dependent</h2>
        <Form layout="vertical" onFinish={handleEditInvestmentSubmit}>
          <Form.Item name="dependent" label="Dependent">
            <Input size="large" />
          </Form.Item>
          <Form.Item name="dependentAge" label="Dependent Age">
            <Select mode="multiple" size="large" />
          </Form.Item>
          <Form.Item name="otherConditions" label="Other Conditions">
            <Select
              size="large"
              options={[
                {
                  label: "",
                  value: "",
                },
              ]}
            />
          </Form.Item>
          <div className="flex items-center justify-center gap-5">
            <AppButton
              label="Cancel"
              type="reset"
              handleClick={handleEditInvestmentModalCancel}
              variant="transparent"
            />
            <AppButton label="Save" type="submit" />
          </div>
        </Form>
      </Modal>
      {/* Delete Modal */}
      <DeleteModal
        open={openDeleteModal}
        header="Investment Route"
        text="investment route"
        onCancel={handleDeleteCancel}
      />
    </>
  );
};

export default InvestmentRoute;

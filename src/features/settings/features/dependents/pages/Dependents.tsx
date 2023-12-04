import { ColumnsType } from "antd/es/table";
import { Dropdown, Menu, Table } from "antd/lib";
import React, { useState } from "react";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { Icon } from "@iconify/react";
import { appRoute } from "src/config/routeMgt/routePaths";
import { AddDependent } from "../components/AddDependent";
import { Form, Input, Modal, Select } from "antd";
import { ImportModal } from "src/components/modals/ImportModal";
import { ExportModal } from "src/components/modals/ExportModal";
import { DeleteModal } from "src/components/modals/DeleteModal";

interface DataType {
  key: React.Key;
  dependent: string;
  ageBracket: string;
  conditions: string;
}

const data: DataType[] = [];
for (let i = 0; i < 6; i++) {
  data.push({
    key: i,
    dependent: "Mother",
    ageBracket: "<20",
    conditions: "unmarried",
  });
}

const Dependents = () => {
  const [addNewD, setAddNewD] = useState(false);
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

  //Edit Dependent Modal
  const [openEditDependentModal, setOpenEditDependentModal] =
    useState<boolean>(false);
  const handleEditDependentModalCancel = () => {
    setOpenEditDependentModal(false);
  };
  const handleEditDependentSubmit = (val: any) => {console.log('values', val)};

const columns: ColumnsType<DataType> = [
  {
    title: "Dependents",
    dataIndex: "dependent",
  },

  {
    title: "Age Bracket",
    dataIndex: "ageBracket",
  },
  {
    title: "Conditions",
    dataIndex: "conditions",
  },
  {
    title: "Action",
    dataIndex: "action",

    render: () => (
      <div>
        <Dropdown
          trigger={["click"]}
          overlay={
            <Menu>
              <Menu.Item key="1">Edit</Menu.Item>
              <Menu.Item key="2">Delete</Menu.Item>
            </Menu>
          }
        >
          <i className="ri-more-2-fill text-lg cursor-pointer"></i>
        </Dropdown>
      </div>
    ),
  },
];

  // Delete Modal
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const handleDeleteCancel = () => {
    setOpenDeleteModal(false);
  };

  return (
    <>
      <AddDependent open={addNewD} handleClose={() => setAddNewD(false)} />
      <div className="flex justify-between flex-col md:flex-row  md:items-center">
        <PageIntro
          title="Eligible Dependents"
          description="Create, View & edit eligible dependents  routes on the system"
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
          <AppButton label="Add New" handleClick={() => setAddNewD(true)} />
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
        open={openImportModal}
        onCancel={handleImportCancel}
        header="Eligible Dependent(s)"
      />
      {/* Export Modal */}
      <ExportModal
        open={exportModal}
        onCancel={handleExportCancel}
        header="Eligible Dependent(s)"
      />
      {/*EDIT DEPENDENT MODAL */}
      <Modal
        open={openEditDependentModal}
        footer={null}
        onCancel={handleEditDependentModalCancel}
      >
        <h2 className="text-center text-lg font-bold">Edit Dependent</h2>
        <Form layout="vertical" onFinish={handleEditDependentSubmit}>
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
              handleClick={handleEditDependentModalCancel}
              variant="transparent"
            />
            <AppButton label="Save" type="submit" />
          </div>
        </Form>
      </Modal>
      {/* Delete Modal */}

      <DeleteModal
        open={openDeleteModal}
        onCancel={handleDeleteCancel}
        header="Dependent"
        text="dependent"
      />
    </>
  );
};

export default Dependents;

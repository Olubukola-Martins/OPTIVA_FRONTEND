import { Icon } from "@iconify/react/dist/iconify.js";
import { Dropdown, Form, Input, Menu, Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import DeleteIcon from "../assets/img/delete-icon.png";
import { ImportModal } from "src/components/modals/ImportModal";
import { ExportModal } from "src/components/modals/ExportModal";
import { DeleteModal } from "src/components/modals/DeleteModal";

interface DataSourceItem {
  key: React.Key;
  sn: number;
  templateName: string;
  datecreated: string;
  lastModified: string;
}

const ApplicationTemplate = () => {
  const columns: ColumnsType<DataSourceItem> = [
    {
      title: "Template Name",
      dataIndex: "templateName",
    },
    {
      title: "Date Created",
      dataIndex: "datecreated",
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
                <Menu.Item key="1">Edit</Menu.Item>

                <Menu.Item key="2">Duplicate</Menu.Item>
                <Menu.Item key="3" onClick={showDeleteModal}>
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

  const dataSource: DataSourceItem[] = [];
  for (let i = 0; i < 4; i++) {
    dataSource.push({
      key: i,
      sn: i + 1,
      templateName: "Template",
      datecreated: "dd/mm/yyyy",
      lastModified: "dd/mm/yyyy",
    });
  }

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

  // Delete Modal
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const showDeleteModal = () => {
    setOpenDeleteModal(true);
  };
  const handleDeleteCancel = () => {
    setOpenDeleteModal(false);
  };
  return (
    <>
      <div className="flex justify-between flex-col md:flex-row md:items-center">
        <PageIntro
          title="Application Templates"
          description="Create, View & edit assessment templates on the system"
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
          <Link to={appRoute.newApplicationTemplate}>
            <AppButton
              label="Add New"
              // handleClick={showNewApplicationsModal}
            />
          </Link>
        </div>
      </div>
      {/* Import Modal */}
      <ImportModal
        open={openImportModal}
        onCancel={handleImportCancel}
        header=" Application Template(s)"
      />
      {/* Export Modal */}

      <ExportModal
        open={exportModal}
        onCancel={handleExportCancel}
        header=" Application Template(s)"
      />
      {/* Delete Modal */}

      <DeleteModal
        open={openDeleteModal}
        onCancel={handleDeleteCancel}
        header="Application Template"
        text="template"
      />
      {/* TABLE */}
      <Table
        columns={columns}
        dataSource={dataSource}
        className="bg-white rounded-md shadow border mt-2"
        scroll={{ x: 600 }}
        rowSelection={{
          type: "checkbox",
          onChange: (
            selectedRowKeys: React.Key[],
            selectedRows: DataSourceItem[]
          ) => {
            console.log(
              `selectedRowKeys: ${selectedRowKeys}`,
              "selectedRows: ",
              selectedRows
            );
          },
        }}
      />
    </>
  );
};

export default ApplicationTemplate;

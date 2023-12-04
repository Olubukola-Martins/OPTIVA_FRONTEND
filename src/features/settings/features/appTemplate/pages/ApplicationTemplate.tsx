import { Icon } from "@iconify/react/dist/iconify.js";
import { Dropdown,  Menu,  Skeleton, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { ImportModal } from "src/components/modals/ImportModal";
import { ExportModal } from "src/components/modals/ExportModal";
import { DeleteModal } from "src/components/modals/DeleteModal";
import {
  QUERY_KEY_FOR_APPLICATION_TEMPLATE,
  useGetApplicationTemplate,
} from "../hooks/useGetApplicationTemplate";
import { formatDate } from "../../authorizedPersons/components/AuthorizedPersons";
import { useDeleteHandler } from "src/features/settings/hooks/handleDelete";

interface DataSourceItem {
  key: React.Key;
  sn: number;
  templateName: string;
  datecreated: string;
  lastModified: string;
}

const ApplicationTemplate = () => {
  const { data, isLoading } = useGetApplicationTemplate();
  const [dataArray, setDataArray] = useState<DataSourceItem[]>([]);
  const [templateId, setTemplateId] = useState<number>();

  const { removeData, deleteIsLoading } = useDeleteHandler({
    deleteEndPointUrl: "admin/templates",
    queryKey: QUERY_KEY_FOR_APPLICATION_TEMPLATE,
  });

  useEffect(() => {
    if (data) {
      const applicationTemplate: DataSourceItem[] = data.map((item, index) => {
        return {
          key: item.id,
          sn: index + 1,
          datecreated: formatDate(item.created_at),
          lastModified: formatDate(item.updated_at),
          templateName: item.template_name,
        };
      });
      setDataArray(applicationTemplate);
    }
  }, [data]);

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
                <Menu.Item
                  key="3"
                  onClick={() => {
                    setTemplateId(val.key as unknown as number);
                    showDeleteModal();
                  }}
                >
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
        onDelete={() => removeData(templateId as unknown as number)}
        isLoading={deleteIsLoading}
      />
      {/* TABLE */}
      <Skeleton active loading={isLoading}>
        <Table
          columns={columns}
          dataSource={dataArray}
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
      </Skeleton>
    </>
  );
};

export default ApplicationTemplate;

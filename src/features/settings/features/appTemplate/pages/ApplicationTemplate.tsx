import { Dropdown, Menu, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { DeleteModal } from "src/components/modals/DeleteModal";
import {
  QUERY_KEY_FOR_APPLICATION_TEMPLATE,
  useGetApplicationTemplate,
} from "../hooks/useGetApplicationTemplate";
import { formatDate } from "../../authorizedPersons/components/AuthorizedPersons";
import { useDelete } from "src/hooks/useDelete";

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
  const { removeData } = useDelete({
    queryKey: QUERY_KEY_FOR_APPLICATION_TEMPLATE,
    EndPointUrl: "admin/templates/",
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
      title: "SN",
      dataIndex: "sn",
    },
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
                <Menu.Item key="1">
                  <Link
                    to={
                      appRoute.applicationTemplateDetails(
                        val.key as unknown as number
                      ).path
                    }
                  >
                    View
                  </Link>
                </Menu.Item>

                {/* <Menu.Item key="2">Duplicate</Menu.Item> */}
                <Menu.Item
                  key="2"
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

        <div >
         
          <Link to={appRoute.newApplicationTemplate}>
            <AppButton
              label="Add New"
              // handleClick={showNewApplicationsModal}
            />
          </Link>
        </div>
      </div>
      {/* Import Modal */}
      
      {/* Delete Modal */}
      {templateId && (
        <DeleteModal
          open={openDeleteModal}
          onCancel={handleDeleteCancel}
          header="Application Template"
          text="template"
          onDelete={() => removeData(templateId)}
        />
      )}

      {/* TABLE */}
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={dataArray}
        className="bg-white rounded-md shadow border mt-2"
        scroll={{ x: 600 }}
     
      />
    </>
  );
};

export default ApplicationTemplate;

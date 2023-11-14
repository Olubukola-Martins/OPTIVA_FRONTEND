import { Icon } from "@iconify/react/dist/iconify.js";
import { Dropdown, Menu } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { AddDocument } from "../components/AddDocument";

interface DataType {
  key: React.Key;
  name: string;
  category: string;
  format: string[];
  size: string;
  requirements: string;
  type: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
  },

  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Format",
    dataIndex: "format",
  },

  {
    title: "Size",
    dataIndex: "size",
  },
  {
    title: "Type",
    dataIndex: "type",
  },
  {
    title: "Other Requirements",
    dataIndex: "requirements",
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

const data: DataType[] = [];
for (let i = 0; i < 6; i++) {
  data.push({
    key: i,
    name: "Passport",
    category: "Family & Education",
    format: ["pdf", ", png"],
    size: "10mb",
    requirements: "Has to include font",
    type: "Supporting",
  });
}

const DocumentRequirement = () => {
  const [newDocument, setNewDocument] = useState(false);
  return (
    <>
      <AddDocument
        open={newDocument}
        handleClose={() => setNewDocument(false)}
      />
      <div className="flex justify-between flex-col md:flex-row md:items-center">
        <PageIntro
          title="Document Requirements"
          description="Create, View & edit document requirements on the system"
          linkBack={appRoute.settings}
        />

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Icon
              icon="uil:file-import"
              className="text-3xl cursor-pointer hover:text-primary"
            />
            <Icon
              icon="mingcute:file-import-line"
              className="text-3xl cursor-pointer hover:text-primary"
            />
          </div>
          <AppButton label="Add New" handleClick={() => setNewDocument(true)} />
        </div>
      </div>

      <Table
        className="bg-white rounded-md shadow border mt-8"
        columns={columns}
        dataSource={data}
        scroll={{ x: 768 }}
      />
    </>
  );
};

export default DocumentRequirement;

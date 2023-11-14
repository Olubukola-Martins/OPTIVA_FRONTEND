import { Icon } from '@iconify/react/dist/iconify.js';
import { Dropdown, Menu } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React from 'react'
import { PageIntro } from 'src/components/PageIntro'
import { AppButton } from 'src/components/button/AppButton';
import { appRoute } from 'src/config/routeMgt/routePaths';

interface DataType {
    key: React.Key;
    name: string;
    createdDate: string;
    updatedDate: string;
  }
  
  const columns: ColumnsType<DataType> = [
    {
      title: "Template Name",
      dataIndex: "name",
    },
  
    {
      title: "Date Created",
      dataIndex: "dateCreated",
    },
    {
      title: "Updated Date",
      dataIndex: "format",
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
  

const ApplicationTemplate = () => {
  return (
    <div>

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
            />
            <Icon
              icon="mingcute:file-import-line"
              className="text-3xl cursor-pointer hover:text-primary"
            />
          </div>
          <AppButton label="Add New" />
        </div>
      </div>

      <Table
        className="bg-white rounded-md shadow border mt-8"
        columns={columns}
        dataSource={[]}
        // scroll={{ x: 768 }}
      />
    </div>
  )
}

export default ApplicationTemplate
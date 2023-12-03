import { Icon } from "@iconify/react/dist/iconify.js";
import { Dropdown, Menu } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { AddInvestment } from "../components/AddInvestment";
import { useState } from "react";

interface DataType {
  key: React.Key;
  name: string;
  createdDate: string;
  updatedDate: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Invest Name",
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

const InvestmentRoute = () => {
  const [addInvRoute, setAddInvRoute] = useState(false);
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
            />
            <Icon
              icon="mingcute:file-import-line"
              className="text-3xl cursor-pointer hover:text-primary"
            />
          </div>
          <AppButton label="Add New" handleClick={() => setAddInvRoute(true)} />
        </div>
      </div>

      <Table
        className="bg-white rounded-md shadow border mt-8"
        columns={columns}
        dataSource={[]}
        // scroll={{ x: 768 }}
      />
    </>
  );
};

export default InvestmentRoute;

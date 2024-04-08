import { Dropdown, Menu } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { AddInvestment } from "../components/AddInvestment";
import { useEffect, useState } from "react";
import { DeleteModal } from "src/components/modals/DeleteModal";
import {
  QUERY_KEY_FOR_INVESTMENT_ROUTE,
  useGetInvestmentRoute,
} from "../hooks/useGetInvestmentRoute";
import { formatDate } from "../../authorizedPersons/components/AuthorizedPersons";
import { EditInvestment } from "../components/EditInvestment";
import { useDelete } from "src/hooks/useDelete";

interface DataType {
  key: React.Key;
  sn: number;
  investmentName: string;
  country: string;
  dateCreated: string;
  lastModified: string;
}

const InvestmentRoute = () => {
  // Get Request
  const { data, isLoading } = useGetInvestmentRoute();
  const [dataArray, setDataArray] = useState<DataType[]>([]);
  const [id, setId] = useState<number>();
  const [addInvRoute, setAddInvRoute] = useState<boolean>(false);
  const [editInvRoute, setEditInvRoute] = useState<boolean>(false);
  const { removeData } = useDelete({
    EndPointUrl: "admin/investment-route/",
    queryKey: QUERY_KEY_FOR_INVESTMENT_ROUTE,
  });

  const [editId, setEditId] = useState<number>();

  useEffect(() => {
    if (data) {
      const investmentRoute: DataType[] = data.map((item, index) => {
        return {
          key: item.id,
          sn: index + 1,
          country: item.country.country_name,
          dateCreated: formatDate(item.created_at),
          investmentName: item.investment_name,
          lastModified: formatDate(item.updated_at),
        };
      });
      setDataArray(investmentRoute);
    }
  }, [data]);

  // Delete Modal
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const showDeleteModal = () => {
    setOpenDeleteModal(true);
  };


  const columns: ColumnsType<DataType> = [
    {
      title: "SN",
      dataIndex: "sn",
    },
    {
      title: "Route Name",
      dataIndex: "investmentName",
    },
    {
      title: "Country",
      dataIndex: "country",
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
                <Menu.Item
                  key="1"
                  onClick={() => {
                    setEditId(val.key as unknown as number);
                    setEditInvRoute(true);
                  }}
                >
                  Edit
                </Menu.Item>
                <Menu.Item
                  key="2"
                  onClick={() => {
                    setId(val.key as unknown as number);
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

  return (
    <>
      <AddInvestment
        open={addInvRoute}
        handleClose={() => setAddInvRoute(false)}
      />
      <EditInvestment
        investmentId={editId as unknown as number}
        open={editInvRoute}
        handleClose={() => setEditInvRoute(false)}
      />
      <div className="flex justify-between flex-col md:flex-row md:items-center">
        <PageIntro
          title="Route Name"
          description="Create, View & edit routes on the system"
          linkBack={appRoute.settings}
        />

        <div className="flex items-center gap-3">
          <AppButton label="Add New" handleClick={() => setAddInvRoute(true)} />
        </div>
      </div>

      {/* Table */}
      <Table
        className="bg-white rounded-md shadow border mt-8"
        columns={columns}
        dataSource={dataArray}
        scroll={{ x: 768 }}
        loading={isLoading}
      />

      {/* Delete Modal */}
      {id && (
        <DeleteModal
          open={openDeleteModal}
          header="Route"
          text="route"
          onCancel={() => setOpenDeleteModal(false)}
          onDelete={() => {
            removeData(id);
          }}
          // isLoading={deleteIsLoading}
        />
      )}
    </>
  );
};

export default InvestmentRoute;

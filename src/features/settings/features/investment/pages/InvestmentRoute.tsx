import { Icon } from "@iconify/react/dist/iconify.js";
import { Dropdown, Menu, Skeleton } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { AddInvestment } from "../components/AddInvestment";
import { useEffect, useState } from "react";
import { DeleteModal } from "src/components/modals/DeleteModal";
import { ImportModal } from "src/components/modals/ImportModal";
import { ExportModal } from "src/components/modals/ExportModal";
import {
  QUERY_KEY_FOR_INVESTMENT_ROUTE,
  useGetInvestmentRoute,
} from "../hooks/useGetInvestmentRoute";
import { formatDate } from "../../authorizedPersons/components/AuthorizedPersons";
import { EditInvestment } from "../components/EditInvestment";
import { useDeleteHandler } from "src/features/settings/hooks/handleDelete";

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

  const { removeData, deleteIsLoading } = useDeleteHandler({
    queryKey: QUERY_KEY_FOR_INVESTMENT_ROUTE,
    deleteEndPointUrl: "admin/investment-route",
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
  const handleDeleteCancel = () => {
    setOpenDeleteModal(false);
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

      <Skeleton loading={isLoading} active>
        <Table
          className="bg-white rounded-md shadow border mt-8"
          columns={columns}
          dataSource={dataArray}
          scroll={{ x: 768 }}
        />
      </Skeleton>

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

      {/* Delete Modal */}
      <DeleteModal
        open={openDeleteModal}
        header="Investment Route"
        text="investment route"
        onCancel={handleDeleteCancel}
        onDelete={() => removeData(id as unknown as number)}
        isLoading={deleteIsLoading}
      />
    </>
  );
};

export default InvestmentRoute;

import { Dropdown, Menu, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { QUERY_KEY_FOR_FEES, useGetFees } from "../hooks/useGetFees";
import { DeleteModal } from "src/components/modals/DeleteModal";
import { useDelete } from "src/hooks/useDelete";
import { Link } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";

type DataSourceItem = {
  key: React.Key;
  sn: number;
  country: string;
  programName: string;
  investmentRoute: string;
  localProcessingFee: string;
  thresholdPayment: string;
  balancePayment: string;
};


export const Fees = () => {
  const { data, isLoading } = useGetFees();
  const [dataArray, setDataArray] = useState<DataSourceItem[]>([]);
  const [feeId, setFeeId] = useState<number>();

  const { removeData } = useDelete({
    queryKey: QUERY_KEY_FOR_FEES,
    EndPointUrl: "admin/fee/",
  });

 
  useEffect(() => {
    if (data) {
      const feesArray: DataSourceItem[] = data.map((item, index) => {
        return {
          key: item.id,
          sn: index + 1,
          country: item.country.country_name,
          programName: item.fee_name,
          balancePayment: item.program_balance_payment,
          investmentRoute: item.investment_route.investment_name,
          localProcessingFee: item.local_processing_fee,
          thresholdPayment: item.program_threshold_payment,
        };
      });
      setDataArray(feesArray);
    }
  }, [data]);

  // DELETE MODAL
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const columns: ColumnsType<DataSourceItem> = [
    {
      key: "1",
      title: "SN",
      dataIndex: "sn",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "2",
    },
    {
      title: "Program Name",
      dataIndex: "programName",
      key: "3",
    },
    {
      title: "Investment Route",
      dataIndex: "investmentRoute",
      key: "4",
    },
    {
      title: "Local Processing Fee",
      dataIndex: "localProcessingFee",
      key: "5",
    },
    {
      title: "Threshold Payment",
      dataIndex: "thresholdPayment",
      key: "6",
    },
    {
      title: "Balance Payment",
      dataIndex: "balancePayment",
      key: "7",
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
                    setFeeId(val.key as unknown as number);
                  }}
                >
                  <Link
                    to={appRoute.editFees(val.key as number).path}
                  >
                    Edit
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="2"
                  onClick={() => {
                    setFeeId(val.key as unknown as number);
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
      {/* TABLE */}
      <Table
        loading={isLoading}
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

      {/* DELETE MODAL */}
      {feeId && (
        <DeleteModal
          header="Delete Fee"
          onCancel={handleDeleteModalCancel}
          open={isDeleteModalOpen}
          onDelete={() => removeData(feeId)}
          // isLoading={deleteIsLoading}
          text="fee"
        />
      )}
    </>
  );
};

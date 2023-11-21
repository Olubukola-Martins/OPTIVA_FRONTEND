import {
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  Select,
  Skeleton,
  Table,
} from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { AppButton } from "src/components/button/AppButton";
import Success from "../assets/img/success.png";
import DeleteIcon from "../assets/img/warning.png";
import { QUERY_KEY_FOR_COUNTRY, useGetCountry } from "../hooks/useGetCountry";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { formatDate } from "../../authorizedPersons/components/AuthorizedPersons";
import { handleDelete } from "src/utils/apiHelpers/handleDelete";
import { usePostCountry } from "../hooks/usePostCountry";
import { openNotification } from "src/utils/notification";
import { useQueryClient } from "react-query";
import { useGetSingleAuthorizedPerson } from "../../authorizedPersons/hooks/useGetSingleAuthorizedPerson";
import { useGetSingleCountry } from "../hooks/useGetSingleCountry";
import { useUpdateCountry } from "../hooks/useUpdateCountry";

type DataSourceItem = {
  key: React.Key;
  sn: number;
  country: string;
  dateCreated: string;
  lastModified: string;
};

export const Country = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  // GET REQUEST
  const { data, isLoading } = useGetCountry();
  const [dataArray, setDataArray] = useState<DataSourceItem[]>([]);
  const { token } = useGetUserInfo();
  const [id, setId] = useState<number>();
  useEffect(() => {
    if (data) {
      const country: DataSourceItem[] = data.map((item, index) => {
        return {
          key: item.id,
          sn: index + 1,
          country: item.country_name,
          dateCreated: formatDate(item.created_at),
          lastModified: formatDate(item.updated_at),
        };
      });
      setDataArray(country);
    }
  }, [data]);

  // UPDATE FORM
  // useUpdateCountry()

  // SINGLE COUNTRY
  const { data: singleCountryData } = useGetSingleCountry(
    id as unknown as number
  );
  useEffect(() => {
    if (singleCountryData) {
      form.setFieldsValue({
        country: singleCountryData?.country,
        programType: singleCountryData?.programType,
      });
    }
  }, [singleCountryData ]);

  // POST REQUEST
 

  // DELETE REQUEST

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
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "3",
    },
    {
      title: "Last Modified",
      dataIndex: "lastModified",
      key: "4",
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
                    setId(val.key as unknown as number);
                    showCountryModal();
                  }}
                >
                  Edit
                </Menu.Item>
                <Menu.Item
                  key="2"
                  onClick={() => {
                    showDeleteModal();
                    setId(val.key as unknown as number);
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

  const handleDeleteCheckbox = () => {
    showDeleteModal();
    handleDelete({
      id: id as unknown as number,
      deleteEndPointUrl: "/admin/countries",
      token,
    });

    setSelectedRowKeys([]);
  };

  const handleDeleteCountry = () => {
    handleDelete({
      id: id as unknown as number,
      deleteEndPointUrl: "/admin/countries",
      token,
    });
  };
  // Country Modal
  const [openCountryModal, setOpenCountryModal] = useState<boolean>(false);
  const showCountryModal = () => {
    setOpenCountryModal(true);
  };
  const handleCountryModalCancel = () => {
    setOpenCountryModal(false);
  };
  const handleEditCountrySubmit = (val: any) => {

    // mutate(
    //   {
    //     country_name: val.country,
    //     program_types: val.programType,
    //     token,
    //   },
    //   {
    //     onError: (error: any) => {
    //       openNotification({
    //         state: "error",
    //         title: "Error Occured",
    //         description: error,
    //         duration: 5,
    //       });
    //     },
    //     onSuccess: (res: any) => {
    //       openNotification({
    //         state: "success",
    //         title: "Success",
    //         description: res,
    //       });
    //       queryClient.invalidateQueries([QUERY_KEY_FOR_COUNTRY]);
    //     },
    //   }
    // );
  };

  // Add Success
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const renderSuccessModal = () => {
    setShowSuccessModal(true);
  };
  const cancelSuccessModal = () => {
    setShowSuccessModal(false);
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
      {/* DELETE CHECKBOX BUTTON */}
      {selectedRowKeys.length > 0 && (
        <div>
          <AppButton
            variant="transparent"
            label="Delete"
            handleClick={handleDeleteCheckbox}
          />
        </div>
      )}

      {/* TABLE */}

      <Skeleton loading={isLoading} active>
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

      {/* Country MODAL */}
      <Modal
        open={openCountryModal}
        footer={null}
        onCancel={handleCountryModalCancel}
      >
        <h2 className="text-center text-lg font-bold">Edit Country</h2>
        <Form layout="vertical" onFinish={handleEditCountrySubmit} form={form}>
          <Form.Item name="country" label="Country" required>
            <Input size="large" />
          </Form.Item>
          <Form.Item name="programType" label="Select Program Type" required>
            <Select
              size="large"
              options={[{ value: "Grenda,", label: "Grenada" }]}
            />
          </Form.Item>

          <div className="flex items-center justify-center gap-5">
            <AppButton
              label="Cancel"
              type="reset"
              handleClick={handleCountryModalCancel}
              variant="transparent"
            />
            <AppButton
              label="Save"
              type="submit"
              handleClick={() => {
                renderSuccessModal();
                handleCountryModalCancel();
              }}
            />
          </div>
        </Form>
      </Modal>

      {/* ADD SUCCESS MODAL */}
      <Modal
        open={showSuccessModal}
        footer={null}
        onCancel={cancelSuccessModal}
      >
        <div className="flex flex-col items-center gap-4 font-bold">
          <img src={Success} className="mx-auto" />
          <div className="text-center text-lg">
            <h2>Country</h2>
            <h2>Added Successfully</h2>
          </div>

          <AppButton label="Back" handleClick={cancelSuccessModal} />
        </div>
      </Modal>

      {/* DELETE MODAL */}
      <Modal open={openDeleteModal} onCancel={handleDeleteCancel} footer={null}>
        <img src={DeleteIcon} className="mx-auto" />
        <h2 className="text-center font-bold p-2">Delete Country</h2>
        <p className="text-center">
          Are you sure you would like to delete this country?
        </p>
        <div className="flex items-center justify-center gap-5 mt-5">
          <AppButton
            label="Cancel"
            handleClick={handleDeleteCancel}
            variant="transparent"
          />
          <AppButton
            label="Delete"
            type="submit"
            handleClick={handleDeleteCountry}
          />
        </div>
      </Modal>
    </>
  );
};

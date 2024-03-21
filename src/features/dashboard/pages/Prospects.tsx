import { Dropdown, Input, Menu } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { FormInstance } from "antd/lib";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { PageIntro } from "src/components/PageIntro";
import { END_POINT } from "src/config/environment";
import {
  IAllProspectsData,
  IProspectDatum,
} from "src/features/meetings/types/types";
import UploadPaymentProofModal from "src/features/payment/components/UploadPaymentProofModal";
import useUploadFile from "src/features/payment/hooks/useUploadFile";
import { useFetchAllItems } from "src/features/settings/hooks/useFetchAllItems";
import { usePagination } from "src/hooks/usePagination";
import { openNotification } from "src/utils/notification";


export const QUERY_KEY_FOR_PROSPECTS = "AllProspects";
export const prospectsURL = `${END_POINT.BASE_URL}/admin/prospect-list/applicants`;

const Prospects = () => {
  const {onChange,pagination} = usePagination();
  const {
    data,
    isLoading,
  }: { data: IAllProspectsData | undefined; isLoading: boolean } =
    useFetchAllItems({
      pagination,
      queryKey: QUERY_KEY_FOR_PROSPECTS,
      urlEndPoint: prospectsURL,
    });
  const [dataSource, setDataSource] = useState<IProspectDatum[]>();
  const [openUploadModal, setOpenUploadModal] = useState<boolean>(false);
  const [currentApplicationId, seturrentApplicationId] = useState<number | undefined>();
  const [uploadForm, setUploadForm] = useState<FormInstance<any> >();
  
  const queryClient = useQueryClient();

  const handleSetFormInstance = (form:FormInstance<any>) => {setUploadForm(form)}

  const onCancelUploadModal = () => {
    setOpenUploadModal(false)
  }
  
    const { fileData, fileMutate, fileUploading } = useUploadFile();

  const handleProofOfPaymentUpload = (val:any) => {
          console.log("form values", val);
      console.log("file data", fileData);
      fileMutate(
        {
          url: `${END_POINT.BASE_URL}/admin/upload-proof-of-payment/${
            currentApplicationId as number
          }`,
          newData: val.uploadFile[0],
        },
        {
          onError: (error: any) => {
            openNotification({
              state: "error",
              title: "Error Occurred",
              description: error.response.data.message,
              duration: 5,
            });
            uploadForm?.resetFields();
          },
          onSuccess: (res: any) => {
            console.log("success", res);
            openNotification({
              state: "success",
              title: "Success",
              description: res.data.message,
            });
            queryClient.invalidateQueries([QUERY_KEY_FOR_PROSPECTS]);
            uploadForm?.resetFields();
            onCancelUploadModal();
          },
        }
      );

  };
  const columns: ColumnsType<IProspectDatum> = [
    {
      title: "SN",
      dataIndex: "sn",
      key: "sn",
      width: 20,
      render: (_, __, index) => {
        return index + 1;
      },
    },
    {
      title: "Applicant ID",
      dataIndex: "applicant_id",
      key: "applicant_id",
    },
    {
      title: "Applicant Name",
      dataIndex: "applicant_name",
      key: "applicant_name",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Program Type",
      dataIndex: "program_type",
      key: "program_type",
    },
    {
      title: "Number of Dependents",
      dataIndex: "no_of_dependents",
      key: "no_of_dependents",
      width: 35,
    },
    {
      title: "Added By",
      dataIndex: "added_by",
      key: "added_by",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_,row) => (
        <Dropdown
          trigger={["click"]}
          overlay={
            <Menu>
              <Menu.Item key="1" onClick={() => {setOpenUploadModal(true); seturrentApplicationId(row.id)}}>
                Update Proof of Payment
              </Menu.Item>
            </Menu>
          }
        >
          <i className="ri-more-2-fill text-lg cursor-pointer"></i>
        </Dropdown>
      ),
    },
  ];

  useEffect(() => {
    if (data?.data) {
      setDataSource(data.data);
    }
  }, [isLoading, data]);

  return (
    <>
      <PageIntro
        title="Prospects"
        description="View, Approve or Reject Applicant."
      />
      <UploadPaymentProofModal open={openUploadModal} onCancel={onCancelUploadModal} fileUploading={fileUploading} handleUploadSubmit={handleProofOfPaymentUpload} onSetUploadForm={handleSetFormInstance}/>

      <div className="mt-6 py-4 border rounded-md border-[rgba(229, 231, 235, 1)]">
        <div className="flex gap-2 sm:gap-4 flex-col sm:flex-row sm:items-start items-center sm:pl-5">
          <Input.Search placeholder="Search" className=" w-52 hidden" />
        </div>

        <Table
          dataSource={dataSource}
          columns={columns}
          loading={isLoading}
          bordered={true}
          onChange={onChange}
          pagination={{...pagination,total:data?.meta.total}}
          scroll={{ x: 900 }}
          className="mt-4"
        />
      </div>
    </>
  );
};

export default Prospects;

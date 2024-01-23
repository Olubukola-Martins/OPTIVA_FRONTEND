import { Dropdown, Menu, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  QUERY_KEY_FOR_APPLICANT_DOCUMENT,
  useGetApplicantDocumentCategory,
} from "../../hooks/useGetApplicantDocumentCategory";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApproveorRejectDoc } from "../../hooks/useApproveorRejectDoc";
import { useQueryClient } from "react-query";
import { openNotification } from "src/utils/notification";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { END_POINT } from "src/config/environment";
import { useUpdateApplicantDoc } from "../../hooks/useUpdateApplicantDoc";
import { UploadModal } from "src/components/modals/UploadModal";

export type DataSourceItem = {
  key: React.Key;
  sn: number;
  documentName: string;
  documentRequirements: string;
  uploadedBy: string;
  documentStatus: string;
  handoverStatus: string;
  comments: number;
};

export interface IDocumentProps {
  filterValue: string;
  onNext?: () => void;
  onPrev?: () => void;
}

export const IdentityDocument: React.FC<IDocumentProps> = ({
  filterValue,
  onNext,
}) => {
  const { data, isLoading } = useGetApplicantDocumentCategory(1);
  const [dataArray, setDataArray] = useState<DataSourceItem[] | []>([]);
  const [docUrl, setDocUrl] = useState<string>();
  const [docId, setDocId] = useState<number>();
  const queryClient = useQueryClient();
  const { mutate } = useApproveorRejectDoc();

  useEffect(() => {
    if (data) {
      const identityDocument: DataSourceItem[] = data
        .filter((item) => {
          if (filterValue === "required") {
            return item.requirement.document_type === "required";
          } else {
            return item.requirement.document_type !== "required";
          }
        })
        .map((item, index) => {
          setDocUrl(item.path);

          return {
            key: item.id,
            sn: index + 1,
            comments: item.comments.length,
            documentName: item.name.charAt(0) + item.name.slice(1),
            documentRequirements:
              item.requirement.document_type.charAt(0).toUpperCase() +
              item.requirement.document_type.slice(1),
            documentStatus:
              item.status.charAt(0).toUpperCase() + item.status.slice(1),
            handoverStatus:
              item.handover_status.charAt(0).toUpperCase() +
              item.status.slice(1),
            uploadedBy:
              item.uploader.name.charAt(0).toUpperCase() +
              item.uploader.name.slice(1),
          };
        });
      setDataArray(identityDocument);
    }
    // refetch()
  }, [data, filterValue]);

  const { mutate: updateApplicantDocMutate } = useUpdateApplicantDoc();

  const approveDoc = () => {
    mutate(
      { approve: "accepted", document_id: docId as unknown as number },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description: error.response.data.message,
            duration: 5,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICANT_DOCUMENT]);
        },
      }
    );
  };

  const rejectDoc = () => {
    mutate(
      { decline: "declined", document_id: docId as unknown as number },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description: error.response.data.message,
            duration: 5,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICANT_DOCUMENT]);
        },
      }
    );
  };

  const updateApplicantDoc = (val: any) => {
    updateApplicantDocMutate(
      {
        _method: "PUT",
        file: "",
        id: docId as unknown as number,
      },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description: error.response.data.message,
            duration: 5,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICANT_DOCUMENT]);
        },
      }
    );
  };

  // Upload Document
  const [importModal, setImportModal] = useState<boolean>(false);

  const handleImportCancel = () => {
    setImportModal(false);
  };

  const columns: ColumnsType<DataSourceItem> = [
    {
      key: "1",
      title: "SN",
      dataIndex: "sn",
    },
    {
      key: "2",
      title: "Document Name",
      dataIndex: "documentName",
    },
    {
      key: "3",
      title: "Document Requirements",
      dataIndex: "documentRequirements",
    },
    {
      key: "4",
      title: "Uploaded By",
      dataIndex: "uploadedBy",
    },
    {
      key: "5",
      title: " Document Status",
      dataIndex: "documentStatus",
    },
    {
      key: "6",
      title: "Handover Status",
      dataIndex: "handoverStatus",
    },
    {
      key: "7",
      title: "Comments",
      dataIndex: "comments",
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
                  <a href={docUrl} target="_blank" rel="noopener noreferrer">
                    View Document
                  </a>
                </Menu.Item>
                <Menu.Item
                  key="2"
                  onClick={() => {
                    setDocId(val.key as unknown as number);
                    approveDoc();
                  }}
                >
                  Accept Document
                </Menu.Item>
                <Menu.Item
                  key="3"
                  onClick={() => {
                    setDocId(val.key as unknown as number);
                    rejectDoc();
                  }}
                >
                  Decline Document
                </Menu.Item>
                <Menu.Item key="4">
                  {" "}
                  <Link
                    to={
                      appRoute.applicant_documents_comments(
                        val.key as unknown as number
                      ).path
                    }
                  >
                    Comments
                  </Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <a
                    href={`${
                      END_POINT.BASE_URL
                    }/admin/download-applicant-document/${
                      val.key as unknown as number
                    }`}
                    target="_blank"
                  >
                    Download
                  </a>
                </Menu.Item>
                <Menu.Item key="6">Replace</Menu.Item>
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
      <Table
        columns={columns}
        dataSource={dataArray}
        loading={isLoading}
        className="bg-white rounded-md shadow border mt-2"
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
      <UploadModal
        header="document"
        onCancel={handleImportCancel}
        open={importModal}
        onUpload={updateApplicantDoc}
      />

      <div className="flex justify-end gap-3 my-5 py-2">
        <AppButton
          label="Next"
          type="button"
          handleClick={() => {
            onNext && onNext();
          }}
        />
      </div>
    </>
  );
};

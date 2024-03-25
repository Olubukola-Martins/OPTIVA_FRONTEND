import { Dropdown, Menu, Popconfirm, Table } from "antd";
import { DataSourceItem, IDocumentProps } from "./IdentityDocument";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "react-query";
import { openNotification } from "src/utils/notification";
import {  useHandoverDoc } from "../../hooks/Documet hooks/useHandoverDoc";
import {
  useGetApplicantDocumentCategory,
  QUERY_KEY_FOR_APPLICANT_DOCUMENT,
} from "../../hooks/Documet hooks/useGetApplicantDocumentCategory";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { useAuditApproveOrRejectDoc } from "../../hooks/Documet hooks/useAuditApproveOrRejectDoc";

export const Reports: React.FC<IDocumentProps> = ({
  filterValue,
  onPrev,
  onNext,
}) => {
  const { data, isLoading } = useGetApplicantDocumentCategory(5);

  const [dataArray, setDataArray] = useState<DataSourceItem[] | []>([]);
  const [docUrl, setDocUrl] = useState<string>();
  const [docId, setDocId] = useState<number>();
  const queryClient = useQueryClient();
  const { mutate } = useHandoverDoc();
  const {mutate:auditMutate}= useAuditApproveOrRejectDoc()

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
  }, [data, filterValue]);

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
  const auditApprove = () => {
    auditMutate(
      { approved: "approved", document_id: docId as unknown as number },
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
  const auditReject = () => {
    auditMutate(
      { rejected: "rejected", document_id: docId as unknown as number },
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
                  }}
                >
                  <Popconfirm
                    title="Approve document"
                    description={`Are you sure to accept this document?`}
                    onConfirm={auditApprove}
                    okType="default"
                  >
                    Accept Document
                  </Popconfirm>
                </Menu.Item>
                <Menu.Item
                  key="3"
                  onClick={() => {
                    setDocId(val.key as unknown as number);
                  }}
                >
                  <Popconfirm
                    title="Decline document"
                    description={`Are you sure to decline this document?`}
                    onConfirm={auditReject}
                    okType="default"
                  >
                    Decline Document
                  </Popconfirm>
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
                <Menu.Item key="5">Download</Menu.Item>
                <Menu.Item key="6">Replace</Menu.Item>
                <Menu.Item
                  key="7"
                  onClick={() => {
                    setDocId(val.key as unknown as number);
                  }}
                >
                  <Popconfirm
                    title="Confirm handover"
                    description={`Are you sure to confirm handover of this document?`}
                    onConfirm={approveDoc}
                    okType="default"
                  >
                    Confirm Handover by DMS
                  </Popconfirm>
                </Menu.Item>
                <Menu.Item
                  key="8"
                  onClick={() => {
                    setDocId(val.key as unknown as number);
                  }}
                >
                  <Popconfirm
                    title="Decline handover"
                    description={`Are you sure to decline handover of this document?`}
                    onConfirm={rejectDoc}
                    okType="default"
                  >
                    Decline Handover by DMS
                  </Popconfirm>
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
      <Table
        columns={columns}
        dataSource={dataArray}
        loading={isLoading}
        className="bg-white rounded-md shadow border mt-2"
      />

      <div className="flex justify-end gap-3 my-5 py-2">
        <AppButton
          label="Previous"
          variant="transparent"
          type="button"
          handleClick={() => {
            onPrev && onPrev();
          }}
        />

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

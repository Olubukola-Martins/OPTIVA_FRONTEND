import {
  Button,
  Dropdown,
  Form,
  Menu,
  Modal,
  Popconfirm,
  Table,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { DataSourceItem, IDocumentProps } from "./IdentityDocument";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  QUERY_KEY_FOR_APPLICANT_DOCUMENT,
  useGetApplicantDocumentCategory,
} from "../../hooks/Documet hooks/useGetApplicantDocumentCategory";
import { useQueryClient } from "react-query";
import { openNotification } from "src/utils/notification";
import { useHandoverDoc } from "../../hooks/Documet hooks/useHandoverDoc";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { useAuditApproveOrRejectDoc } from "../../hooks/Documet hooks/useAuditApproveOrRejectDoc";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";
import { END_POINT } from "src/config/environment";
import { fileRuleOptions } from "src/features/settings/features/authorizedPersons/types";
import { createFileValidationRule } from "src/utils/formHelpers/validations";
import { useApproveOrRejectExternal } from "../../hooks/Documet hooks/useApproveOrRejectExternal";
import { useApproveOrRejectInternal } from "../../hooks/Documet hooks/useApproveOrRejectInternal";
import { useUpdateApplicantDoc } from "../../hooks/Documet hooks/useUpdateApplicantDoc";
import useUploadApplicantFile from "../../hooks/Documet hooks/useUploadApplicantFile";

export const TravelHistory: React.FC<IDocumentProps> = ({
  filterValue,
  onNext,
  onPrev,
}) => {
  const { data, isLoading } = useGetApplicantDocumentCategory(2);
  const [dataArray, setDataArray] = useState<DataSourceItem[] | []>([]);
  const [docUrl, setDocUrl] = useState<string>();
  const [docId, setDocId] = useState<number>();
  const queryClient = useQueryClient();
  const { mutate } = useHandoverDoc();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { fileData, fileUploading } = useUploadApplicantFile();
  const { mutate: auditMutate } = useAuditApproveOrRejectDoc();
  const { mutate: internalMutate } = useApproveOrRejectInternal();
  const { mutate: externalMutate } = useApproveOrRejectExternal();

  const notifs = {
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
  };

  const auditApprove = () => {
    auditMutate({ approved: "approved", document_id: docId as number }, notifs);
  };

  const auditReject = () => {
    auditMutate({ rejected: "rejected", document_id: docId as number }, notifs);
  };

  const internalApprove = () => {
    internalMutate(
      { approved: "approved", document_id: docId as number },
      notifs
    );
  };
  const internalReject = () => {
    internalMutate(
      { rejected: "rejected", document_id: docId as number },
      notifs
    );
  };

  const externalApprove = () => {
    externalMutate(
      { approved: "approved", document_id: docId as number },
      notifs
    );
  };
  const externalReject = () => {
    externalMutate(
      { rejected: "rejected", document_id: docId as number },
      notifs
    );
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

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
            path: item.path,
          };
        });
      setDataArray(identityDocument);
    }
    // refetch()
  }, [data, filterValue]);

  const {
    mutate: updateApplicantDocMutate,
    isLoading: updateApplicantDocLoading,
  } = useUpdateApplicantDoc();

  const approveDoc = () => {
    mutate({ approve: "accepted", document_id: docId as number }, notifs);
  };

  const rejectDoc = () => {
    mutate({ decline: "declined", document_id: docId as number }, notifs);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const updateApplicantDoc = async (val: any) => {
    const fileUploadData = new FormData();
    fileList.forEach((file) => {
      fileUploadData.append("files[]", file as RcFile);
    });
    console.log("form vals", val);
    console.log("id", docId);
    console.log("file", val.chooseFile[0].originFileObj);

    if (fileData?.data) {
      updateApplicantDocMutate(
        {
          _method: "PUT",
          file: val.chooseFile[0].originFileObj,
          id: docId as number,
        },
        notifs
      );
    }
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
                {/* DR cant see any of these actions, on handover */}
                <Menu.Item
                  key="1"
                  onClick={() => {
                    setDocUrl(val.path);
                    console.log(docUrl);
                  }}
                >
                  <a href={docUrl} target="_blank" rel="noopener noreferrer">
                    View Document
                  </a>
                </Menu.Item>
                {/* {userData?.id === 3 && ( */}
                <Menu.Item
                  key="2"
                  onClick={() => {
                    setDocId(val.key as number);
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
                    setDocId(val.key as number);
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
                {/* )} */}
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
                <Menu.Item
                  key="6"
                  onClick={() => {
                    setDocId(val.key as unknown as number);
                    setImportModal(true);
                  }}
                >
                  Replace
                </Menu.Item>
                <Menu.Item
                  key="7"
                  onClick={() => {
                    setDocId(val.key as number);
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
                    setDocId(val.key as number);
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
                <Menu.Item
                  key="9"
                  onClick={() => {
                    setDocId(val.key as number);
                  }}
                >
                  <Popconfirm
                    title="Accept document"
                    description={`Are you sure to accept this document?`}
                    onConfirm={internalApprove}
                    okType="default"
                  >
                    Accept document (internal reviewer)
                  </Popconfirm>
                </Menu.Item>
                <Menu.Item
                  key="10"
                  onClick={() => {
                    setDocId(val.key as number);
                  }}
                >
                  <Popconfirm
                    title="Decline document"
                    description={`Are you sure to decline this document?`}
                    onConfirm={internalReject}
                    okType="default"
                  >
                    Decline document (internal reviewer)
                  </Popconfirm>
                </Menu.Item>
                <Menu.Item
                  key="11"
                  onClick={() => {
                    setDocId(val.key as number);
                  }}
                >
                  <Popconfirm
                    title="Accept document"
                    description={`Are you sure to accept this document?`}
                    onConfirm={externalApprove}
                    okType="default"
                  >
                    Accept document (external reviewer)
                  </Popconfirm>
                </Menu.Item>
                <Menu.Item
                  key="12"
                  onClick={() => {
                    setDocId(val.key as number);
                  }}
                >
                  <Popconfirm
                    title="Decline document"
                    description={`Are you sure to decline this document?`}
                    onConfirm={externalReject}
                    okType="default"
                  >
                    Decline document (external reviewer)
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
      <Modal open={importModal} onCancel={handleImportCancel} footer={null}>
        <div className="p-3">
          <svg
            width="62"
            height="62"
            viewBox="0 0 62 62"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-1/5 mx-auto"
          >
            <rect
              width="62"
              height="62"
              rx="31"
              fill="#28A745"
              fill-opacity="0.5"
            />
            <path
              d="M29.6667 41.6667H23C22.6464 41.6667 22.3072 41.5263 22.0572 41.2762C21.8071 41.0262 21.6667 40.687 21.6667 40.3334V21.6667C21.6667 21.3131 21.8071 20.974 22.0572 20.7239C22.3072 20.4739 22.6464 20.3334 23 20.3334H29.6667V24.3334C29.6667 25.3943 30.0881 26.4117 30.8382 27.1618C31.5884 27.912 32.6058 28.3334 33.6667 28.3334H37.6667V31.0001C37.6667 31.3537 37.8071 31.6928 38.0572 31.9429C38.3072 32.1929 38.6464 32.3334 39 32.3334C39.3536 32.3334 39.6928 32.1929 39.9428 31.9429C40.1929 31.6928 40.3333 31.3537 40.3333 31.0001V26.9201C40.3194 26.7976 40.2926 26.6769 40.2533 26.5601V26.4401C40.1863 26.3006 40.1011 26.1706 40 26.0534L32 18.0534C31.8828 17.9523 31.7528 17.8672 31.6133 17.8001C31.5735 17.7944 31.5331 17.7944 31.4933 17.8001L31.08 17.6667H23C21.9391 17.6667 20.9217 18.0882 20.1716 18.8383C19.4214 19.5885 19 20.6059 19 21.6667V40.3334C19 41.3943 19.4214 42.4117 20.1716 43.1618C20.9217 43.912 21.9391 44.3334 23 44.3334H29.6667C30.0203 44.3334 30.3594 44.1929 30.6095 43.9429C30.8595 43.6928 31 43.3537 31 43.0001C31 42.6465 30.8595 42.3073 30.6095 42.0573C30.3594 41.8072 30.0203 41.6667 29.6667 41.6667ZM32.3333 22.2134L35.7867 25.6667H33.6667C33.313 25.6667 32.9739 25.5263 32.7239 25.2762C32.4738 25.0262 32.3333 24.687 32.3333 24.3334V22.2134ZM40.3333 35.0001H32.88L34.6133 33.2801C34.8644 33.029 35.0055 32.6885 35.0055 32.3334C35.0055 31.9783 34.8644 31.6378 34.6133 31.3867C34.3623 31.1357 34.0217 30.9946 33.6667 30.9946C33.3116 30.9946 32.9711 31.1357 32.72 31.3867L28.72 35.3867C28.6022 35.5163 28.5075 35.6652 28.44 35.8267C28.3066 36.1514 28.3066 36.5155 28.44 36.8401C28.5011 37.0049 28.5965 37.1549 28.72 37.2801L32.72 41.2801C32.8439 41.4051 32.9914 41.5042 33.1539 41.5719C33.3164 41.6396 33.4907 41.6745 33.6667 41.6745C33.8427 41.6745 34.017 41.6396 34.1794 41.5719C34.3419 41.5042 34.4894 41.4051 34.6133 41.2801C34.7383 41.1561 34.8375 41.0087 34.9052 40.8462C34.9729 40.6837 35.0077 40.5094 35.0077 40.3334C35.0077 40.1574 34.9729 39.9831 34.9052 39.8206C34.8375 39.6582 34.7383 39.5107 34.6133 39.3867L32.88 37.6667H40.3333C40.687 37.6667 41.0261 37.5263 41.2761 37.2762C41.5262 37.0262 41.6667 36.687 41.6667 36.3334C41.6667 35.9798 41.5262 35.6407 41.2761 35.3906C41.0261 35.1406 40.687 35.0001 40.3333 35.0001Z"
              fill="white"
            />
            <rect
              x="3.5"
              y="3.5"
              width="55"
              height="55"
              rx="27.5"
              stroke="#28A745"
              stroke-opacity="0.05"
              stroke-width="7"
            />
          </svg>
        </div>
        <h1 className="p-4 font-bold text-center text-lg">Upload document</h1>
        <Form
          layout="vertical"
          onFinish={updateApplicantDoc}
          requiredMark={false}
        >
          <Form.Item
            name="chooseFile"
            label="Choose file to upload"
            rules={[createFileValidationRule(fileRuleOptions)]}
            getValueFromEvent={normFile}
          >
            <Upload {...props} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload File</Button>
            </Upload>
          </Form.Item>
          <p className="mt-2 text-center text-lg">
            [Only png, jpeg and pdf formats are supported]
          </p>
          <p className="text-center">Maximum upload file size is 5 MB.</p>

          <div className="flex items-center justify-center gap-4 p-4 mt-2">
            <AppButton
              label="Cancel"
              variant="transparent"
              containerStyle="border border-secondary text-secondary"
              type="reset"
              handleClick={handleImportCancel}
            />
            <AppButton
              label="Save"
              type="submit"
              isLoading={fileUploading || updateApplicantDocLoading}
              // handleClick={props.onUpload}
            />
          </div>
        </Form>
      </Modal>
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

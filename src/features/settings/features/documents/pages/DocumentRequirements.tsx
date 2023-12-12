import { PageIntro } from "src/components/PageIntro";
import { Icon } from "@iconify/react";
import { AppButton } from "src/components/button/AppButton";
import { useEffect, useState } from "react";
import { Select, Dropdown, Menu, Tabs, Tag } from "antd";
import type { MenuProps, TabsProps } from "antd";
import { appRoute } from "src/config/routeMgt/routePaths";
import { DownOutlined } from "@ant-design/icons";
import Table, { ColumnsType } from "antd/es/table";
import Search from "antd/es/input/Search";
import ImportModal from "src/features/settings/components/ImportModal";
import { useFetchAllItems } from "src/features/settings/hooks/useFetchAllItems";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { IAllDocRequirementData } from "src/features/settings/types/settingsType";
import {
  QUERY_KEY_DOC_REQUIREMENT,
  documentRequirementURL,
  useCreateDocumentRequirement,
} from "../hooks/useCreateDocumentRequirement";
import { useDeleteItem } from "src/features/settings/hooks/useDeleteItem";
import { AddDocument } from "../components/AddDocument";
import { EditDocument } from "../components/EditDocument";
import useUpdateDocumentRequirement from "../hooks/useUpdateDocumentRequirement";
import { DeleteModal } from "src/components/modals/DeleteModal";
import { useDelete } from "src/hooks/useDelete";

interface DataType {
  key: React.Key;
  sn: number;
  documentName: string;
  documentCategory: string;
  documentFormat: JSX.Element;
  documentSize: string;
}

interface IQueryDataType<TPageData> {
  data: TPageData | undefined;
  isLoading: boolean;
  refetch: (
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, any>>;
}
const deleteEndpointUrl = "admin/document-requirement/";
const queryKey = QUERY_KEY_DOC_REQUIREMENT;

const DocumentRequirements = () => {
  const {
    data: allDocRequirementData,
    isLoading: allDocRequirementLoading,
    refetch,
  }: IQueryDataType<IAllDocRequirementData> = useFetchAllItems({
    queryKey,
    urlEndPoint: documentRequirementURL,
  });
  const { removeData } = useDelete({
    EndPointUrl: deleteEndpointUrl,
    queryKey,
  });

  // const { deleteData } = useDeleteItem({ deleteEndpointUrl, queryKey });
  const [docType, setDocType] = useState("required");
  const [currentId, setCurrentId] = useState<number>();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [hideDeleteBtn, setHideDeleteBtn] = useState<boolean>(true);
  const [dataRequiredDoc, setDataRecuiredDoc] = useState<DataType[]>([]);
  const [dataSupportDoc, setDataSupportDoc] = useState<DataType[]>([]);
  const [openImportModal, setOpenImportModal] = useState(false);
  const showImportModal = () => {
    setOpenImportModal(true);
  };
  const handleImportCancel = () => {
    setOpenImportModal(false);
  };
  const { editDocumentRequirement, isLoading: editLoading } =
    useUpdateDocumentRequirement();
  const { addDocumentRequirement, postDocLoading } =
    useCreateDocumentRequirement();

  // Handle add new document
  const handleAddNewDocument = (val: any) => {
    addDocumentRequirement({
      name: val.name,
      document_category_id: val.category,
      document_format: val.format,
      document_size: val.size,
      document_type: docType,
      eligible_dependants: val.dependents,
      other_requirement: "None",
    });
    handleNewDocumentCancel();
  };
  // Handle edit document
  const handleEditNewDocument = (val: any) => {
    currentId &&
      editDocumentRequirement(currentId, {
        name: val.name,
        document_category_id: val.category,
        document_format: val.format,
        document_size: val.size,
        document_type: docType,
        eligible_dependants: val.dependents,
        other_requirement: "None",
      });
    handleNewDocumentCancel();
    setSubmitted(true);
  };

  const operations = (
    <div className="gap-4 flex">
      <Search placeholder="Search" allowClear style={{ width: 150 }} />
      <Select
        className="w-[150px]"
        placeholder="Filter"
        options={[
          { label: "jpeg", value: "jpeg" },
          { label: "pdf", value: "pdf" },
          { label: "png", value: "png" },
        ]}
      />
    </div>
  );

  // Required Documents table
  const columnsRequiredDoc: ColumnsType<DataType> = [
    {
      title: "SN",
      dataIndex: "sn",
      key: "sn",
    },
    {
      title: "Document Name",
      dataIndex: "documentName",
      key: "documentName",
    },
    {
      title: "Document Category",
      dataIndex: "documentCategory",
      key: "documentCategory",
    },
    {
      title: "Document Format",
      dataIndex: "documentFormat",
      key: "documentFormat",
    },
    {
      title: "Document Size",
      dataIndex: "documentSize",
      key: "documentSize",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record: DataType) => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item
                  key="1"
                  onClick={() => {
                    showEditgDocumentModal();
                    setDocType("required");
                    setCurrentId(record.key as number);
                  }}
                >
                  Edit
                </Menu.Item>
                <Menu.Item
                  key="2"
                  onClick={() => {
                    setShowDeleteModal(true);
                    setCurrentId(record.key as number);
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
  useEffect(() => {
    setSubmitted(false);
    if (
      allDocRequirementData?.data &&
      Array.isArray(allDocRequirementData?.data)
    ) {
      const responseData = allDocRequirementData.data;
      // Required Doc Data
      const newDataRequi: DataType[] = responseData
        .filter((item) => item.document_type === "required")
        .map((item, index) => ({
          key: item.id,
          sn: index + 1,
          documentName: item.name,
          documentCategory: item.document_category.name,
          documentFormat: (
            <>
              {item.document_format.map((item) => {
                return <Tag>{item}</Tag>;
              })}
            </>
          ),
          documentSize: `${item.document_size} mb`,
        }));
      setDataRecuiredDoc(newDataRequi);
      // Supporting Doc Data
      const newDataSupport: DataType[] = responseData
        .filter((item) => item.document_type === "supporting")
        .map((item, index) => ({
          key: item.id,
          sn: index + 1,
          documentName: item.name,
          documentCategory: item.document_category.name,
          documentFormat: (
            <>
              {item.document_format.map((item) => {
                return <Tag>{item}</Tag>;
              })}
            </>
          ),
          documentSize: `${item.document_size} mb`,
        }));
      setDataSupportDoc(newDataSupport);
    }
  }, [allDocRequirementData, allDocRequirementLoading]);
  useEffect(() => {
    refetch();
  }, [submitted, editLoading]);
  const rowSelectionRequiredDoc = {
    onChange: (_: React.Key[], selectedRows: DataType[]) => {
      selectedRows.length === 0 || !selectedRows
        ? setHideDeleteBtn(true)
        : setHideDeleteBtn(false);
    },
    getCheckboxProps: (_: DataType) => ({}),
  };

  // Supporting Documents table
  const columnsSupportDoc: ColumnsType<DataType> = [
    {
      title: "SN",
      dataIndex: "sn",
      key: "sn",
    },
    {
      title: "Document Name",
      dataIndex: "documentName",
      key: "documentName",
    },
    {
      title: "Document Category",
      dataIndex: "documentCategory",
      key: "documentCategory",
    },
    {
      title: "Document Format",
      dataIndex: "documentFormat",
      key: "documentFormat",
    },
    {
      title: "Document Size",
      dataIndex: "documentSize",
      key: "documentSize",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record: DataType) => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item
                  key="1"
                  onClick={() => {
                    showEditgDocumentModal();
                    setDocType("supporting");
                    setCurrentId(record.key as number);
                  }}
                >
                  Edit
                </Menu.Item>
                <Menu.Item
                  key="2"
                  onClick={() => {
                    setShowDeleteModal(true);
                    setCurrentId(record.key as number);
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
  const rowSelectionSupportDoc = {
    onChange: (_: React.Key[], selectedRows: DataType[]) => {
      selectedRows.length === 0 || !selectedRows
        ? setHideDeleteBtn(true)
        : setHideDeleteBtn(false);
    },
    getCheckboxProps: (_: DataType) => ({}),
  };

  // Tab items
  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Required Documents",
      children: (
        <>
          <div className={`${hideDeleteBtn ? "hidden" : ""}`}>
            <AppButton
              type="button"
              variant="transparent"
              label="Delete"
              handleClick={() => {
                setShowDeleteModal(true);
              }}
            />
          </div>
          <Table
            loading={allDocRequirementLoading}
            rowSelection={{
              type: "checkbox",
              ...rowSelectionRequiredDoc,
            }}
            className="bg-white rounded-md shadow border mt-8"
            columns={columnsRequiredDoc}
            dataSource={dataRequiredDoc}
            scroll={{ x: 768 }}
          />
        </>
      ),
    },
    {
      key: "2",
      label: "Supporting Documents",
      children: (
        <>
          <div className={`${hideDeleteBtn ? "hidden" : ""}`}>
            <AppButton
              type="button"
              variant="transparent"
              label="Delete"
              handleClick={() => {
                setShowDeleteModal(true);
              }}
            />
          </div>
          <Table
            loading={allDocRequirementLoading}
            rowSelection={{
              type: "checkbox",
              ...rowSelectionSupportDoc,
            }}
            className="bg-white rounded-md shadow border mt-8"
            columns={columnsSupportDoc}
            dataSource={dataSupportDoc}
            scroll={{ x: 768 }}
          />
        </>
      ),
    },
  ];

  // Edit Document Modat
  const [openEditDocumentModal, setEditDocumentModal] = useState(false);
  const showEditgDocumentModal = () => {
    setEditDocumentModal(true);
  };
  const handleEditDocumentCancel = () => {
    setEditDocumentModal(false);
  };

  //Add New Document Modal
  const [openNewDocumentModal, setNewDocumentModal] = useState(false);
  const showNewgDocumentModal = () => {
    setNewDocumentModal(true);
  };
  const handleNewDocumentCancel = () => {
    setNewDocumentModal(false);
  };
  const onMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
    if (e.key === "required") {
      showNewgDocumentModal();
      setDocType("required");
    } else {
      showNewgDocumentModal();
      setDocType("supporting");
    }
  };
  const items = [
    {
      key: "required",
      label: "Required Document",
    },
    {
      key: "supporting",
      label: "Supporting Document",
    },
  ];

  return (
    <>
      <DeleteModal
        open={showDeleteModal}
        header="Document"
        text="document"
        onCancel={() => {
          setShowDeleteModal(false);
        }}
        onDelete={() => {
          removeData(currentId as number);
          setShowDeleteModal(false)
        }}
      />

      <ImportModal
        heading="Document(s)"
        open={openImportModal}
        handleClose={handleImportCancel}
      />
      {/* New Document Modal */}
      <AddDocument
        open={openNewDocumentModal}
        handleClose={handleNewDocumentCancel}
        docType={docType}
        handleAddNewDocument={handleAddNewDocument}
        postDocLoading={postDocLoading}
      />
      {currentId && (
        <EditDocument
          open={openEditDocumentModal}
          editLoading={editLoading}
          handleClose={handleEditDocumentCancel}
          docType={docType}
          handleEditNewDocument={handleEditNewDocument}
          id={currentId}
        />
      )}
      <div className=" flex flex-col md:flex-row justify-between p-3">
        <PageIntro
          title="Document Requirements"
          description="Create, View & edit document requirements on the system"
          linkBack={appRoute.settings}
        />
        <div className="flex items-center gap-3 justify-between">
          <div className="flex items-center gap-2">
            <Icon
              icon="uil:file-import"
              className="text-3xl cursor-pointer hover:text-primary"
              onClick={showImportModal}
            />
            <Icon
              icon="mingcute:file-import-line"
              className="text-3xl cursor-pointer hover:text-primary"
            />
          </div>
          <Dropdown.Button
            className="bg-secondary rounded-lg w-fit "
            arrow={true}
            icon={
              <DownOutlined className="text-white font-medium hover:text-white" />
            }
            menu={{
              className: "text-white",
              color: "white",
              items,
              onClick: onMenuClick,
            }}
          >
            <span className="text-white font-medium hover:text-white">
              Add New
            </span>
          </Dropdown.Button>
        </div>
      </div>
      <Tabs
        defaultActiveKey="1"
        items={tabItems}
        tabBarExtraContent={operations}
      />
    </>
  );
};

export default DocumentRequirements;

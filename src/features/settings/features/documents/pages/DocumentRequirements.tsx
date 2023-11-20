import { PageIntro } from "src/components/PageIntro";
import { Icon } from "@iconify/react";
import { AppButton } from "src/components/button/AppButton";
import { useState } from "react";
import { Modal, Select, Form, Dropdown, Menu, Tabs, Tag } from "antd";
import type { MenuProps, TabsProps } from "antd";
import { Link } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";
import { DownOutlined } from "@ant-design/icons";
import Table, { ColumnsType } from "antd/es/table";
import Search from "antd/es/input/Search";
import ImportModal from "src/features/settings/components/ImportModal";

interface DataType {
  key: React.Key;
  sn: number;
  documentName: string;
  documentCategory: string;
  documentFormat: JSX.Element;
  documentSize: string;
}

const DocumentRequirements = () => {
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
                <Menu.Item key="1">
                  <Link
                    to={
                      appRoute.editEscalation(record.key as unknown as number)
                        .path
                    }
                  >
                    Edit
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="2"
                  onClick={() => {
                    setShowDeleteModal(true);
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
  for (let i = 1; i <= 4; i++) {
    dataRequiredDoc.push({
      key: i,
      sn: i,
      documentName: "Passport",
      documentCategory: "Family & Education Document",
      documentFormat: (
        <>
          <Tag>png</Tag>
          <Tag>pdf</Tag>
          <Tag>jpeg</Tag>
        </>
      ),
      documentSize: "10 mb",
    });
  }
  const rowSelectionRequiredDoc = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      selectedRows.length === 0 || !selectedRows
        ? setHideDeleteBtn(true)
        : setHideDeleteBtn(false);
    },
    getCheckboxProps: (record: DataType) => ({}),
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
                <Menu.Item key="1">
                  <Link
                    to={
                      appRoute.editEscalation(record.key as unknown as number)
                        .path
                    }
                  >
                    Edit
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="2"
                  onClick={() => {
                    setShowDeleteModal(true);
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
  for (let i = 1; i <= 4; i++) {
    dataSupportDoc.push({
      key: i,
      sn: i,
      documentName: "Passport",
      documentCategory: "Family & Education Document",
      documentFormat: (
        <>
          <Tag>png</Tag>
          <Tag>pdf</Tag>
          <Tag>jpeg</Tag>
        </>
      ),
      documentSize: "10 mb",
    });
  }
  const rowSelectionSupportDoc = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      selectedRows.length === 0 || !selectedRows
        ? setHideDeleteBtn(true)
        : setHideDeleteBtn(false);
    },
    getCheckboxProps: (record: DataType) => ({}),
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

  // New Applications Modal
  const [openSupportingDocumentModal, setSupportingDocumentModal] =
    useState(false);
  const showSupportingDocumentModal = () => {
    setSupportingDocumentModal(true);
  };
  const handleSupportingDocumentCancel = () => {
    setSupportingDocumentModal(false);
  };
  const onMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
  };
  const items = [
    {
      key: "1",
      label: "Required Document",
    },
    {
      key: "2",
      label: "Supporting Document",
    },
  ];

  return (
    <>
      <ImportModal heading="Document(s)" open={openImportModal} handleClose={handleImportCancel} />
      {/* New Applications Modal */}
      <Modal
        open={openSupportingDocumentModal}
        onCancel={handleSupportingDocumentCancel}
        footer={null}
      >
        <div className="flex flex-col items-center">
          <h1 className="p-4 font-bold text-center text-lg">
            Select Country/Program Type
          </h1>
          <Form.Item
            required
            label="Which country passport/residency is applicant applying for?"
            name="passportCountry"
            className="md:w-96"
          >
            <Select
              className="w-full"
              defaultValue={1}
              options={[
                {
                  value: 1,
                  label: "Grenada",
                },
              ]}
              size="large"
            />
          </Form.Item>
          <Form.Item
            required
            label="Which program is the applicant interested in?"
            name="interestedProgram"
            className="md:w-96"
          >
            <Select
              size="large"
              defaultValue={1}
              options={[
                {
                  value: 1,
                  label: "Grenada",
                },
              ]}
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            required
            label="Which investment route is the applicant interested in?"
            name="investmentRoute"
            className="md:w-96"
          >
            <Select
              size="large"
              defaultValue={1}
              options={[
                {
                  value: 1,
                  label: "Grenada",
                },
              ]}
              className="w-full"
            />
          </Form.Item>
          <div className="flex items-center justify-center gap-4 p-4">
            <Form.Item>
              <AppButton
                type="reset"
                label="Cancel"
                variant="transparent"
                containerStyle="border border-secondary text-secondary"
              />
            </Form.Item>
          </div>
        </div>
      </Modal>
      <div className=" flex flex-col md:flex-row justify-between p-3">
        <PageIntro
          title="Document Requirements"
          description="Create, View & edit document requirements on the system"
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
            />
          </div>
          <Dropdown.Button
            className="bg-secondary rounded-lg "
            // onClick={()=>{console.log("clicked ")}}
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

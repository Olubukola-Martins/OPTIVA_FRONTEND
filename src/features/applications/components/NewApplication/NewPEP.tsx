import { Form, Input, Modal, Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { AppButton } from "src/components/button/AppButton";

interface DataSourceItem {
  key: number;
  relatedMilitaryYourself: string;
  relatedPoliticalYourself: string;
  relatedGovernmentYourself: string;
  relatedMilitarySpouse: string;
  relatedPoliticalSpouse: string;
  relatedGovernmentSpouse: string;
  relatedMilitaryFamily: string;
  relatedPoliticalFamily: string;
  relatedGovernmentFamily: string;
  relatedMilitaryAssociate: string;
  relatedPoliticalAssociate: string;
  relatedGovernmentAssociate: string;
}

export const NewPEP = () => {
  const [dataSource, setDataSource] = useState<DataSourceItem[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editApplicantData, setEditApplicantData] = useState<any | null>(null);

  const onAddNewDetail = () => {
    setIsEditing(true)
    const randomNumber = Math.random() * 1000;
    const newDetails = {
      key: randomNumber,
      relatedMilitaryYourself: "",
      relatedPoliticalYourself: "",
      relatedGovernmentYourself: "",
      relatedMilitarySpouse: "",
      relatedPoliticalSpouse: "",
      relatedGovernmentSpouse: "",
      relatedMilitaryFamily: "",
      relatedPoliticalFamily: "",
      relatedGovernmentFamily: "",
      relatedMilitaryAssociate: "",
      relatedPoliticalAssociate: "",
      relatedGovernmentAssociate: "",
    };
    setDataSource((pre) => {
      return [...pre, newDetails];
    });
  };

  const onDeleteDetail = (record: any) => {
    Modal.confirm({
      title: "Are you sure you want to delete?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((prev) => {
          return prev.filter((details) => details.key !== record.key);
        });
      },
    });
  };

  const editApplicant = (record: any) => {
    setIsEditing(true);
    setEditApplicantData({ ...record });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditApplicantData(null);
  };

  const columns: ColumnsType<DataSourceItem> = [
    {
      title: "Dependent's Name (First, Middle & Last Name) ",
      dataIndex: "relatedMilitaryYourself",
      key: "1",
    },
    {
      title: "Relationship with Applicant",
      dataIndex: "relatedGovermentYourself",
      key: "2",
    },
    {
      title: "Gender",
      dataIndex: "relatedPolitcalYourself",
      key: "3",
    },
    {
      title: "Marital Status",
      dataIndex: "relatedMilitarySpouse",
      key: "4",
    },
    {
      title: "Date of Birth",
      dataIndex: "relatedGovernmentSpouse",
      key: "5",
    },
    {
      title: "City of Birth",
      dataIndex: "relatedPoliticalSpouse",
      key: "6",
    },
    {
      title: "Country of Birth",
      dataIndex: "relatedMilitaryFamily",
      key: "7",
    },
    {
      title: "Date of Death   (Leave blank if the   dependent is still alive)",
      dataIndex: "relatedGovernmentFamily",
      key: "8",
    },
    {
      title: "City of Death (Leave blank if the dependent is still alive)",
      dataIndex: "relatedPoliticalFamily",
      key: "9",
    },
    {
      title: "Country of Death (Leave blank if the dependent is still alive)",
      dataIndex: "relatedMilitaryAssociate",
      key: "10",
    },
    {
      title: "State of Origin (Applies to only parents)",
      dataIndex: "relatedGovernmentAssociate",
      key: "11",
    },
    {
      title: "LGA of Origin   (Applies to only parents)",
      dataIndex: "relatedMilitaryAssociate",
      key: "12",
    },
    {
      title: "Action",
      render: (record: any) => {
        return (
          <div className="flex gap-5">
            <AppButton
              label="Edit"
              handleClick={() => editApplicant(record)}
              variant="transparent"
            />
            <AppButton
              label="Delete"
              handleClick={() => onDeleteDetail(record)}
              variant="transparent"
            />
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className="p-2 my-4">
        <p>
          A PEP may be past or current government office holders, or individuals
          who are or were formerly entrusted with high-level public functions.
          For example, senior officials, heads of state government, senior
          judicial or military officials, officials of political parties and
          senior executives of stateowned enterprises (SOE). PEP definition
          included family members and close associates of
        </p>
      </div>
      <div className="py-2">
        <AppButton label="Add PEP details" handleClick={onAddNewDetail} />
      </div>

      <div className="p-2 lg:w-[1200px] mx-auto">
        <Table
          columns={columns}
          dataSource={dataSource}
          className="bg-white rounded-md shadow border mt-2"
          scroll={{ x: 200 }}
        />
      </div>
      <>
        <Modal
          open={isEditing}
          footer={null}
          onCancel={() => setIsEditing(false)}
        >
          <h2 className="text-center font-bold text-lg p-2">
            Edit Other Dependent Details
          </h2>
          <div>
            <h2 className="py-1">
              Are you related/closely associated to someone in the military?
            </h2>
            <Form.Item name="relatedMilitaryYourself">
              <Select
                size="large"
                options={[
                  {
                    value: "Yes",
                    label: "Yes",
                  },
                  {
                    value: "No",
                    label: "No",
                  },
                ]}
              />
            </Form.Item>
          </div>
          <div>
            <h2 className="py-1">
              Are you related/closely associated to someone in government?
            </h2>
            <Form.Item name="relatedGovernmentYourself">
              <Select
                size="large"
                options={[
                  {
                    value: "Yes",
                    label: "Yes",
                  },
                  {
                    value: "No",
                    label: "No",
                  },
                ]}
              />
            </Form.Item>
          </div>
          <div>
            <h2 className="py-1">
              Are you related/closely associated to a political figure?
            </h2>
            <Form.Item name="relatedPoliticalYourself">
              <Select
                size="large"
                options={[
                  {
                    value: "Yes",
                    label: "Yes",
                  },
                  {
                    value: "No",
                    label: "No",
                  },
                ]}
              />
            </Form.Item>
          </div>
          <div>
            <h2 className="py-1">
              Is your spouse related/closely associated to someone in the
              military?
            </h2>
            <Form.Item name="relatedGovernmentYourself">
              <Select
                size="large"
                options={[
                  {
                    value: "Yes",
                    label: "Yes",
                  },
                  {
                    value: "No",
                    label: "No",
                  },
                ]}
              />
            </Form.Item>
          </div>
          <div>
            <h2 className="py-1">
              Is your spouse related/closely associated with someone in the
              government?
            </h2>
            <Form.Item name="relatedGovernmentSpouse">
              <Select
                size="large"
                options={[
                  {
                    value: "Yes",
                    label: "Yes",
                  },
                  {
                    value: "No",
                    label: "No",
                  },
                ]}
              />
            </Form.Item>
          </div>
          <div>
            <h2 className="py-1">
              Is your spouse related/closely associated to a political figure?
            </h2>
            <Form.Item name="relatedGovernmentSpouse">
              <Select
                size="large"
                options={[
                  {
                    value: "Yes",
                    label: "Yes",
                  },
                  {
                    value: "No",
                    label: "No",
                  },
                ]}
              />
            </Form.Item>
          </div>
          <div>
            <h2 className="py-1">
              Is your family member related/closely associated to someone in the
              military?
            </h2>
            <Form.Item name="relatedMilitaryFamily">
              <Select
                size="large"
                options={[
                  {
                    value: "Yes",
                    label: "Yes",
                  },
                  {
                    value: "No",
                    label: "No",
                  },
                ]}
              />
            </Form.Item>
          </div>
          <div>
            <h2 className="py-1">
              Is your family member related/closely associated with someone in
              the government?
            </h2>
            <Form.Item name="relatedGovernmentFamily">
              <Select
                size="large"
                options={[
                  {
                    value: "Yes",
                    label: "Yes",
                  },
                  {
                    value: "No",
                    label: "No",
                  },
                ]}
              />
            </Form.Item>
          </div>
          <div>
            <h2 className="py-1">
              Is your family member related/closely associated with someone a
              political figure?
            </h2>
            <Form.Item name="relatedPoliticalFamily">
              <Select
                size="large"
                options={[
                  {
                    value: "Yes",
                    label: "Yes",
                  },
                  {
                    value: "No",
                    label: "No",
                  },
                ]}
              />
            </Form.Item>
          </div>
          <div>
            <h2 className="py-1">
              Is a close associate of yours related/closely associated to
              someone in the military?
            </h2>
            <Form.Item name="relatedMilitaryAssociate">
              <Select
                size="large"
                options={[
                  {
                    value: "Yes",
                    label: "Yes",
                  },
                  {
                    value: "No",
                    label: "No",
                  },
                ]}
              />
            </Form.Item>
          </div>
          <div>
            <h2 className="py-1">
              Is a close associate of yours related/closely associated to
              someone in the government?
            </h2>
            <Form.Item name="relatedGovernmentAssociate">
              <Select
                size="large"
                options={[
                  {
                    value: "Yes",
                    label: "Yes",
                  },
                  {
                    value: "No",
                    label: "No",
                  },
                ]}
              />
            </Form.Item>
          </div>
          <div>
            <h2 className="py-1">
              Is a close associate of yours related/closely associated to a
              political figure?
            </h2>
            <Form.Item name="relatedPoliticalAssociate">
              <Select
                size="large"
                options={[
                  {
                    value: "Yes",
                    label: "Yes",
                  },
                  {
                    value: "No",
                    label: "No",
                  },
                ]}
              />
            </Form.Item>
          </div>
          <div className="flex justify-end">
            <div className="flex gap-5">
              <AppButton
                label="Cancel"
                variant="transparent"
                type="reset"
                handleClick={() => {
                  resetEditing();
                  setIsEditing(false);
                }}
              />
              <AppButton
                label="Save"
                handleClick={() => {
                  setDataSource((pre) => {
                    return pre.map((applicant) => {
                      if (applicant.key === editApplicantData.key) {
                        return editApplicantData;
                      } else {
                        return applicant;
                      }
                    });
                  });
                  resetEditing();
                }}
              />
            </div>
          </div>
        </Modal>
        <div className="py-4 mt-5">
          <h2 className="py-1">
            If “Yes” to any of the above, please explain:
          </h2>
          <Form.Item name="explainPEP">
            <Input.TextArea rows={5} />
          </Form.Item>
        </div>
      </>
    </>
  );
};

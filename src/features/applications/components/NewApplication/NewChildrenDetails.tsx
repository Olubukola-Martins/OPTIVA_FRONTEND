import { Input, Select, Form, Table, Checkbox, Modal } from "antd";
import { DataSourceItem } from "../ApplicantDetails/ChildrenDetails";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { AppButton } from "src/components/button/AppButton";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

export const NewChildrenDetails = () => {
  const [dataSource, setDataSource] = useState<DataSourceItem[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editApplicantData, setEditApplicantData] = useState<any | null>(null);
  const onSelectCheckbox = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const handleSelectChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const columns: ColumnsType<DataSourceItem> = [
    {
      title: "Child's Name (First, Middle & Last Name) ",
      dataIndex: "childName",
      key: "1",
    },
    {
      title: " Gender",
      dataIndex: "gender",
      key: "2",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "3",
    },
    {
      title: "City of Birth",
      dataIndex: "cityOfBirth",
      key: "4",
    },
    {
      title: "Country of Birth",
      dataIndex: "countryOfBirth",
      key: "5",
    },
    {
      title: "Height (cm)",
      dataIndex: "height",
      key: "6",
    },
    {
      title: "Eye Color",
      dataIndex: "eyeColor",
      key: "7",
    },
    {
      title: "Hair Color",
      dataIndex: "hairColor",
      key: "8",
    },
    {
      title: "Dual Citizen?",
      dataIndex: "dualCitizen",
      key: "9",
    },
    {
      title:
        "Countries of  Citizenship (Leave blank if the  child is not a citizen  of another country)",
      dataIndex: "countriesOfCitizenship",
      key: "10",
    },
    {
      title: "Passport No.",
      dataIndex: "passportNo",
      key: "11",
    },
    {
      title: "Occupation",
      dataIndex: "occupation",
      key: "12",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "13",
    },
    {
      title: "Email Address",
      dataIndex: "emailAddress",
      key: "14",
    },
    {
      title:
        "Residential Address - Apt/Floor/Suite (if different from your residential address)",
      dataIndex: "residentialAddressApt",
      key: "15",
    },
    {
      title: "Residential Address - Street",
      dataIndex: "residentialAddressStreet",
      key: "16",
    },
    {
      title: "Residential Address - City",
      dataIndex: "residentialAddressCity",
      key: "17",
    },
    {
      title: "Residential Address - State",
      dataIndex: "residentialAddressState",
      key: "18",
    },
    {
      title: "Residential Address - Country",
      dataIndex: "residentialAddressCountry",
      key: "19",
    },
    {
      title: "Residential Address - Zip/Postcode",
      dataIndex: "residentialAddressCode",
      key: "20",
    },
    {
      title: "Residential Address - Date they moved in",
      dataIndex: "residentialAddressDate",
      key: "21",
    },
    {
      title: "On Application?",
      dataIndex: "onApplication",
      key: "22",
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

  const onAddNewDetail = () => {
    setIsEditing(true)
    const randomNumber = Math.random() * 1000;
    const newDetails = {
      key: randomNumber,
      childName: "",
      gender: "",
      dateOfBirth: "",
      cityOfBirth: "",
      countryOfBirth: "",
      height: "",
      eyeColor: "",
      hairColor: "",
      dualCitizen: "",
      countriesOfCitizenship: "",
      passportNo: 0,
      occupation: "",
      phoneNumber: 0,
      emailAddress: "",
      residentialAddressApt: "",
      residentialAddressCity: "",
      residentialAddressStreet: "",
      residentialAddressState: "",
      residentialAddressCountry: "",
      residentialAddressCode: "",
      residentialAddressDate: "",
      onApplication: "",
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

  const handleCountryChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className=" justify-center p-4 lg:gap-10 w-full">
      <div className="flex flex-col lg:flex-row lg:gap-10">
        <div className="lg:w-1/2">
          <div>
            <h2 className="p-2">"How many children do you have?</h2>
            <Form.Item name="children" className="w-full" required>
              <Input size="large" />
            </Form.Item>
          </div>
          <div>
            <h2 className="p-2">Any Adopted Children?</h2>
            <Form.Item name="adoptedChildren" className="w-full" required>
              <Select
                onChange={handleSelectChange}
                size="large"
                options={[
                  {
                    value: "Yes",
                    label: "Yes",
                  },
                ]}
              />
            </Form.Item>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div>
            <h2 className="p-2">Will you be adopting?</h2>
            <Form.Item name="adopting" className="w-full" required>
              <Select
                onChange={handleSelectChange}
                size="large"
                options={[
                  {
                    value: "Yes",
                    label: "Yes",
                  },
                ]}
              />
            </Form.Item>
          </div>
          <div>
            <h2 className="p-2">
              Will all your children be dependents on your application?
            </h2>
            <Form.Item name="childrenDependent" className="w-full" required>
              <Select
                onChange={handleSelectChange}
                size="large"
                options={[
                  {
                    value: "Yes",
                    label: "Yes",
                  },
                ]}
              />
            </Form.Item>
          </div>
        </div>
      </div>
      <div className="p-4">
        <AppButton
          label="Add children details"
          handleClick={onAddNewDetail}
          type="button"
        />
      </div>

      <div className="p-2 lg:w-[1200px] mx-auto">
        <Table columns={columns} dataSource={dataSource} scroll={{ x: 200 }} />
      </div>
      <Modal
        title="Edit Children Details"
        open={isEditing}
        okText="Save"
        onCancel={resetEditing}
        onOk={() => {
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
      >
        <div>
          <h2 className="p-1">Child's Name (First, Middle & Last Name)</h2>
          <Form.Item name="childName">
            <Input
              size="large"
              value={editApplicantData?.childName}
              onChange={(e) => {
                setEditApplicantData((prev: any) => ({
                  ...prev,
                  childName: e.target.value,
                }));
              }}
            />
          </Form.Item>
        </div>

        <div>
          <h2 className="p-1">Gender</h2>{" "}
          <Form.Item name="gender">
            <Input
              size="large"
              value={editApplicantData?.gender}
              onChange={(e) => {
                setEditApplicantData((prev: any) => ({
                  ...prev,
                  gender: e.target.value,
                }));
              }}
            />
          </Form.Item>
        </div>

        <div>
          <h2 className="p-1">Date of Birth</h2>{" "}
          <Form.Item name="dateOfBirth">
            <Input
              size="large"
              placeholder="dd/mm/yyyy"
              value={editApplicantData?.dateOfBirth}
              onChange={(e) => {
                setEditApplicantData((prev: any) => ({
                  ...prev,
                  dateOfBirth: e.target.value,
                }));
              }}
            />
          </Form.Item>
        </div>

        <div>
          <h2 className="p-1">City of Birth</h2>
          <Form.Item name="cityOfBirth">
            <Input
              size="large"
              value={editApplicantData?.cityOfBirth}
              onChange={(e) => {
                setEditApplicantData((prev: any) => ({
                  ...prev,
                  cityOfBirth: e.target.value,
                }));
              }}
            />
          </Form.Item>
        </div>

        <div>
          <h2 className="p-1">Country of Birth</h2>{" "}
          <Form.Item name="countryOfBirth">
            <Input
              size="large"
              value={editApplicantData?.countryOfBirth}
              onChange={(e) => {
                setEditApplicantData((prev: any) => ({
                  ...prev,
                  countryOfBirth: e.target.value,
                }));
              }}
            />
          </Form.Item>
        </div>

        <div>
          <h2 className="p-1">Height (cm)</h2>{" "}
          <Form.Item name="height">
            <Input
              size="large"
              value={editApplicantData?.height}
              onChange={(e) => {
                setEditApplicantData((prev: any) => ({
                  ...prev,
                  height: e.target.value,
                }));
              }}
            />
          </Form.Item>
        </div>

        <div>
          <h2 className="p-1">Eye Color</h2>{" "}
          <Form.Item name="eyeColor">
            <Input
              size="large"
              value={editApplicantData?.eyeColor}
              onChange={(e) => {
                setEditApplicantData((prev: any) => ({
                  ...prev,
                  eyeColor: e.target.value,
                }));
              }}
            />
          </Form.Item>
        </div>

        <div>
          <h2 className="p-1">Hair Color</h2>
          <Form.Item name="hairColor">
            <Input
              size="large"
              value={editApplicantData?.hairColor}
              onChange={(e) => {
                setEditApplicantData((prev: any) => ({
                  ...prev,
                  hairColor: e.target.value,
                }));
              }}
            />
          </Form.Item>
        </div>

        <div>
          <h2>Dual Citizen? </h2>
          <Form.Item name="dualCitizen">
            <Select
              options={[
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" },
              ]}
            />
          </Form.Item>
        </div>

        <div>
          <h2 className="p-1">
            Countries of Citizenship (Leave blank if the child is not a citizen
            of another country)
          </h2>
          <Form.Item name="countryOfCitizenship">
            <Select
              className="mt-3"
              size="large"
              mode="multiple"
              allowClear
              onChange={handleCountryChange}
            />
          </Form.Item>
        </div>

        <div>
          <h2 className="p-1">Passport No</h2>
          <Form.Item name="passportNo">
            <Input
              size="large"
              value={editApplicantData?.passportNo}
              onChange={(e) => {
                setEditApplicantData((prev: any) => ({
                  ...prev,
                  passportNo: e.target.value,
                }));
              }}
            />
          </Form.Item>
        </div>

        <div>
          <h2 className="p-1">Occupation</h2>
          <Form.Item name="occupation">
            <Input
              size="large"
              value={editApplicantData?.occupation}
              onChange={(e) => {
                setEditApplicantData((prev: any) => ({
                  ...prev,
                  occupation: e.target.value,
                }));
              }}
            />
          </Form.Item>
        </div>

        <div>
          <h2 className="p-1">Phone Number</h2>
          <Form.Item name="phoneNumber">
            <Input
              size="large"
              value={editApplicantData?.phoneNumber}
              onChange={(e) => {
                setEditApplicantData((prev: any) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }));
              }}
            />
          </Form.Item>
        </div>

        <div>
          <h2 className="p-1">Email Address</h2>
          <Form.Item name="emailAddress">
            <Input
              size="large"
              value={editApplicantData?.emailAddress}
              onChange={(e) => {
                setEditApplicantData((prev: any) => ({
                  ...prev,
                  emailAddress: e.target.value,
                }));
              }}
            />
          </Form.Item>
        </div>

        <div>
          <h2 className="p-1">
            Residential Address - Apt/Floor/Suite (if different from your
            residential address)
          </h2>

          <Form.Item name="residentialAddressApt">
            <Input
              size="large"
              value={editApplicantData?.residentialAddressApt}
              onChange={(e) => {
                setEditApplicantData((prev: any) => ({
                  ...prev,
                  residentialAddressApt: e.target.value,
                }));
              }}
            />
          </Form.Item>
        </div>

        <div>
          <h2 className="p-1">Residential Address - Street</h2>
          <Form.Item name="residentialAddressStreet">
            <Input
              size="large"
              value={editApplicantData?.residentialAddressStreet}
              onChange={(e) => {
                setEditApplicantData((prev: any) => ({
                  ...prev,
                  residentialAddressStreet: e.target.value,
                }));
              }}
            />
          </Form.Item>
        </div>

        <div>
          <h2 className="p-1">Residential Address - City</h2>
          <Form.Item name="residentialAddressCity">
            <Input
              size="large"
              value={editApplicantData?.residentialAddressCity}
              onChange={(e) => {
                setEditApplicantData((prev: any) => ({
                  ...prev,
                  residentialAddressCity: e.target.value,
                }));
              }}
            />
          </Form.Item>
        </div>

        <div>
          <h2 className="p-1">Residential Address - State</h2>
          <Form.Item name="residentialAddressState">
            <Input
              size="large"
              value={editApplicantData?.residentialAddressState}
              onChange={(e) => {
                setEditApplicantData((prev: any) => ({
                  ...prev,
                  residentialAddressState: e.target.value,
                }));
              }}
            />
          </Form.Item>
        </div>

        <div>
          <h2 className="p-1">Residential Address - Country</h2>
          <Form.Item name="residentialAddressCountry">
            <Input
              size="large"
              value={editApplicantData?.residentialAddressCountry}
              onChange={(e) => {
                setEditApplicantData((prev: any) => ({
                  ...prev,
                  residentialAddressCountry: e.target.value,
                }));
              }}
            />
          </Form.Item>
        </div>

        <div>
          <h2 className="p-1">Residential Address - Zip/Postcode</h2>
          <Form.Item name="residentialAddressCode">
            <Input
              size="large"
              value={editApplicantData?.residentialAddressCode}
              onChange={(e) => {
                setEditApplicantData((prev: any) => ({
                  ...prev,
                  residentialAddressCode: e.target.value,
                }));
              }}
            />
          </Form.Item>
        </div>

        <div>
          <h2 className="p-1">Residential Address - Date they moved in</h2>
          <Form.Item name="residentialAddressDate">
            <Input
              size="large"
              value={editApplicantData?.residentialAddressDate}
              onChange={(e) => {
                setEditApplicantData((prev: any) => ({
                  ...prev,
                  residentialAddressCode: e.target.value,
                }));
              }}
            />
          </Form.Item>
        </div>

        <div>
          <h2>On Application? </h2>
          <Form.Item name="onApplication">
            <Select
              options={[
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" },
              ]}
            />
          </Form.Item>
        </div>
      </Modal>
    </div>
  );
};

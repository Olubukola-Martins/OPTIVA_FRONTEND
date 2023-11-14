import { Input, Select, Form, Table, Modal } from "antd";
import { DataSourceItem } from "../ApplicantDetails/ChildrenDetails";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { AppButton } from "src/components/button/AppButton";

export const NewOtherDependentDetails = () => {
  const [dataSource, setDataSource] = useState<DataSourceItem[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editApplicantData, setEditApplicantData] = useState<any | null>(null);

 

  const handleCountryChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };
  const onAddNewDetail = () => {
    setIsEditing(true)
    const randomNumber = Math.random() * 1000;
    const newDetails = {
      key: randomNumber,
      dependentName: "",
      gender: "",
      maritalStatus: "",
      dateOfBirth: "",
      cityOfBirth: "",
      countryOfBirth: "",
      dateOfDeath: "",
      cityOfDeath: "",
      countryOfDeath: "",
      stateOfOrigin: "",
      lgaOfOrigin: "",
      hometown: "",
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

  const columns: ColumnsType<DataSourceItem> = [
    {
      title: "Dependent's Name (First, Middle & Last Name) ",
      dataIndex: "dependentName",
      key: "1",
    },
    {
      title: "Relationship with Applicant",
      dataIndex: "relationshipApplicant",
      key: "2",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "3",
    },
    {
      title: "Marital Status",
      dataIndex: "maritalStatus",
      key: "4",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "5",
    },
    {
      title: "City of Birth",
      dataIndex: "cityOfBirth",
      key: "6",
    },
    {
      title: "Country of Birth",
      dataIndex: "countryOfBirth",
      key: "7",
    },
    {
      title: "Date of Death   (Leave blank if the   dependent is still alive)",
      dataIndex: "dateOfDeath",
      key: "8",
    },
    {
      title: "City of Death (Leave blank if the dependent is still alive)",
      dataIndex: "cityOfDeath",
      key: "9",
    },
    {
      title: "Country of Death (Leave blank if the dependent is still alive)",
      dataIndex: "countryOfDeath",
      key: "10",
    },
    {
      title: "State of Origin (Applies to only parents)",
      dataIndex: "stateOfOrigin",
      key: "11",
    },
    {
      title: "LGA of Origin   (Applies to only parents)",
      dataIndex: "lgaOfOrigin",
      key: "12",
    },
    {
      title: "Hometown (Applies for only parents)",
      dataIndex: "hometown",
      key: "13",
    },
    {
      title: "Height (cm)",
      dataIndex: "height",
      key: "14",
    },
    {
      title: "Eye Color",
      dataIndex: "eyeColor",
      key: "15",
    },
    {
      title: "Hair Color",
      dataIndex: "hairColor",
      key: "16",
    },
    {
      title: "Dual Citizen?",
      dataIndex: "dualCitizen",
      key: "17",
    },
    {
      title:
        "Countries of Citizenship (Leave blank if the child is not a citizen of another country)",
      dataIndex: "countriesOfCitizenship",
      key: "18",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "19",
    },
    {
      title: "Occupation",
      dataIndex: "occupation",
      key: "20",
    },
    {
      title: "Email Address",
      dataIndex: "emailAddress",
      key: "21",
    },
    {
      title:
        "Residential Address  - Apt/Floor/Suite  (if different from your   residential address)",
      dataIndex: "residentialAddressApt",
      key: "22",
    },
    {
      title: "Residential Address - Street",
      dataIndex: "residentialAddressStreet",
      key: "23",
    },
    {
      title: "Residential Address - City",
      dataIndex: "residentialAddressCity",
      key: "24",
    },
    {
      title: "Residential Address - State",
      dataIndex: "residentialAddressState",
      key: "25",
    },
    {
      title: "Residential Address - Country",
      dataIndex: "residentialAddressCountry",
      key: "26",
    },
    {
      title: "Residential Address - Zip/Postcode",
      dataIndex: "residentialAddressCode",
      key: "27",
    },
    {
      title: "Residential Address - Date they moved in",
      dataIndex: "residentialAddressDate",
      key: "28",
    },
    {
      title: "On Application?",
      dataIndex: "onApplication",
      key: "29",
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
    <div>
      <div className="p-4">
        <AppButton
          label="Add other dependent details"
          handleClick={onAddNewDetail}
        />
      </div>
      <div className="p-2 lg:w-[1200px] mx-auto">
        <Table
          columns={columns}
          dataSource={dataSource}
          className="bg-white rounded-md shadow border mt-2"
          scroll={{ x: 200 }}
        />
      </div>

      <Modal
        title="Edit Other Dependent Details"
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
          <h2 className="p-1">Dependent's Name (First, Middle & Last Name)</h2>
          <Form.Item name="dependentName">
            <Input
              size="large"
              value={editApplicantData?.dependentName}
              onChange={(e) => {
                setEditApplicantData((prev: any) => ({
                  ...prev,
                  dependentName: e.target.value,
                }));
              }}
            />
          </Form.Item>
        </div>

        <div>
          <h2 className="p-1">Relationship with Applicant</h2>

          <Form.Item name="relationshipApplicant">
            <Input
              size="large"
              value={editApplicantData?.relationshipApplicant}
              onChange={(e) => {
                setEditApplicantData((prev: any) => ({
                  ...prev,
                  relationshipApplicant: e.target.value,
                }));
              }}
            />
          </Form.Item>
        </div>
        <div>
          <h2 className="p-1">Gender</h2>
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
          <h2 className="p-1">Marital Status</h2>
          <Form.Item name="maritalStatus">
            <Input
              size="large"
              value={editApplicantData?.maritalStatus}
              onChange={(e) => {
                setEditApplicantData((prev: any) => ({
                  ...prev,
                  maritalStatus: e.target.value,
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
          <h2 className="p-1">Country of Birth</h2>
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
          <h2 className="p-1">
            Date of Death (Leave blank if the dependent is still alive)
          </h2>
          <Form.Item name="dateOfDeath">
            <Input
              size="large"
              placeholder="dd/mm/yyyy"
              value={editApplicantData?.dateOfDeath}
              onChange={(e) => {
                setEditApplicantData((prev: any) => ({
                  ...prev,
                  dateOfDeath: e.target.value,
                }));
              }}
            />
          </Form.Item>
        </div>
        <div>
          <h2 className="p-1">
            City of Death (Leave blank if the dependent is still alive)
          </h2>
          <Form.Item name="cityOfDeath">
            <Input
              size="large"
              value={editApplicantData?.cityOfDeath}
              onChange={(e) => {
                setEditApplicantData((prev: any) => ({
                  ...prev,
                  cityOfDeath: e.target.value,
                }));
              }}
            />
          </Form.Item>
        </div>
        <div>
          <h2 className="p-1">
            Country of Death (Leave blank if the dependent is still alive)
          </h2>

          <Form.Item name="countryOfDeath">
            <Input
              size="large"
              value={editApplicantData?.countryOfDeath}
              onChange={(e) => {
                setEditApplicantData((prev: any) => ({
                  ...prev,
                  countryOfDeath: e.target.value,
                }));
              }}
            />
          </Form.Item>
        </div>
        <div>
          <h2 className="p-1">State of Origin (Applies to only parents)</h2>
          <Form.Item name="stateOfOrigin">
            <Input
              size="large"
              placeholder="dd/mm/yyyy"
              value={editApplicantData?.stateOfOrigin}
              onChange={(e) => {
                setEditApplicantData((prev: any) => ({
                  ...prev,
                  stateOfOrigin: e.target.value,
                }));
              }}
            />
          </Form.Item>
        </div>
        <div>
          <h2 className="p-1">LGA of Origin (Applies to only parents)</h2>
          <Form.Item name="lgaOfOrigin">
            <Input
              size="large"
              value={editApplicantData?.lgaOfOrigin}
              onChange={(e) => {
                setEditApplicantData((prev: any) => ({
                  ...prev,
                  lgaOfOrigin: e.target.value,
                }));
              }}
            />
          </Form.Item>
        </div>
        <div>
          <h2 className="p-1">Hometown (Applies for only parents)</h2>
          <Form.Item name="hometown">
            <Input
              size="large"
              value={editApplicantData?.hometown}
              onChange={(e) => {
                setEditApplicantData((prev: any) => ({
                  ...prev,
                  hometown: e.target.value,
                }));
              }}
            />
          </Form.Item>
        </div>
        <div>
          <h2 className="p-1">Height (cm)</h2>
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
          <h2 className="p-1">Eye Color</h2>
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
          <h2 className="p-1">Dual Citizen? </h2>
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
          <Form.Item name="onApplicationYes">
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

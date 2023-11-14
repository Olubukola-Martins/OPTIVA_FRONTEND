import { Checkbox, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { DataSourceItem } from "./ChildrenDetails";

export const OtherDependentDetails = () => {
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
      key: "4",
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
      render: () => {
        return (
          <div className="flex gap-5">
            <Checkbox disabled>Yes</Checkbox>
            <Checkbox disabled>No</Checkbox>
          </div>
        );
      },
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
        "Residential Address - Apt/Floor/Suite (if different from your residential address)",
      dataIndex: "residentialAddressStreet",
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
  ];
  const dataSource: DataSourceItem[] = [];
  for (let i = 0; i < 8; i++) {
    dataSource.push({
      key: i,
      dependentName: "John Brown",
      gender: "Male",
      relationshipApplicant: "Sibling",
      maritalStatus: "Single",
      dateOfBirth: "dd/mm/yy",
      cityOfBirth: "Lagos",
      countryOfBirth: "Nigeria",
      dateOfDeath: "dd/mm/yy",
      cityOfDeath: "Lagos",
      countryOfDeath: "Lagos",
      stateOfOrgin: "Lagos",
      lgaOfOrigin: "-",
      hometown: "-",
      height: "15cm",
      eyeColor: "Brown",
      hairColor: "Brown",
      dualCitizen: "No",
      countriesOfCitizenship: "Grenada",
      passportNo: 12345,
      occupation: "-",
      phoneNumber: 12345,
      emailAddress: "-",
      residentialAddressApt: "-",
      residentialAddressStreet: "-",
      residentialAddressCity: "-",
      residentialAddressState: "-",
      residentialAddressCountry: "-",
      residentialAddressCode: "-",
      residentialAddressDate: "-",
      onApplication: "No",
    });
  }
  return (
    <div className="p-4 lg:w-[1150px]">
      <Table
        columns={columns}
        dataSource={dataSource}
        className="bg-white rounded-md shadow border mt-2"
        scroll={{ x: 200 }}
      />
    </div>
  );
};

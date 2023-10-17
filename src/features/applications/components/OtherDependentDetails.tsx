import { Table } from "antd";
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
      title: "Marital Status",
      dataIndex: "maritalStatus",
      key: "3",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "4",
    },
    {
      title: "City of Birth",
      dataIndex: "cityOfBirth",
      key: "5",
    },
    {
      title: "Country of Birth",
      dataIndex: "countryOfBirth",
      key: "6",
    },
    {
      title: "Date of Death   (Leave blank if the   dependent is still alive)",
      dataIndex: "dateOfDeath",
      key: "7",
    },
    {
      title: "City of Death (Leave blank if the dependent is still alive)",
      dataIndex: "deathOfDeath",
      key: "8",
    },
    {
      title: "Country of Death (Leave blank if the dependent is still alive)",
      dataIndex: "countryOfDeath",
      key: "9",
    },
    {
      title: "State of Origin (Applies to only parents)",
      dataIndex: "stateOfOrigin",
      key: "10",
    },
    {
      title: "LGA of Origin   (Applies to only parents)",
      dataIndex: "lgaOfOrigin",
      key: "11",
    },
    {
      title: "Hometown (Applies for only parents)",
      dataIndex: "hometown",
      key: "12",
    },
    {
      title: "Height (cm)",
      dataIndex: "height",
      key: "13",
    },
    {
      title: "Eye Color",
      dataIndex: "eyeColor",
      key: "14",
    },
    {
      title: "Hair Color",
      dataIndex: "hairColor",
      key: "15",
    },
    {
      title: "Dual Citizen?",
      dataIndex: "dualCitizen",
      key: "16",
    },
    {
      title:
        "Countries of Citizenship (Leave blank if the child is not a citizen of another country)",
      dataIndex: "countriesOfCitizenship",
      key: "17",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "18",
    },
    {
      title: "Occupation",
      dataIndex: "occupation",
      key: "19",
    },
    {
      title: "Email Address",
      dataIndex: "emailAddress",
      key: "20",
    },
    {
      title: "Residential Address - Street",
      dataIndex: "residentialAddressStreet",
      key: "21",
    },
    {
      title: "Residential Address - City",
      dataIndex: "residentialAddressCity",
      key: "22",
    },
    {
      title: "Residential Address - State",
      dataIndex: "residentialAddressState",
      key: "23",
    },
    {
      title: "Residential Address - Country",
      dataIndex: "residentialAddressCountry",
      key: "24",
    },
    {
      title: "Residential Address - Zip/Postcode",
      dataIndex: "residentialAddressCode",
      key: "25",
    },
    {
      title: "Residential Address - Date they moved in",
      dataIndex: "residentialAddressDate",
      key: "26",
    },
    {
      title: "On Application?",
      dataIndex: "onApplication",
      key: "27",
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
      stateOfOrgin: 'Lagos',
      lgaOfOrigin: '-',
      hometown: '-',
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
    <Table
      columns={columns}
      dataSource={dataSource}
      className="bg-white rounded-md shadow border mt-2"
      scroll={{ x: 1300 }}
    />
  );
};
